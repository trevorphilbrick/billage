import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  getDocs,
  query,
  collection,
  where,
  deleteDoc,
} from "firebase/firestore";
import { firestoreContext, UserContext } from "../App";
import { UpdatedBillListContext } from "../screens/Dashboard";
import { FiXCircle } from "react-icons/fi";

const BillCellWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isPaid }) => (isPaid ? "#52b788" : "#00293d")};
  color: ${({ isPaid }) => (isPaid ? "#333" : "#ccc")};
  margin-bottom: 8px;
  padding: 12px 16px;
  border-radius: 4px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
`;

export default function BillCell({ bill }) {
  const db = useContext(firestoreContext);
  const { user } = useContext(UserContext);
  const q = query(collection(db, "bills"), where("uid", "==", user.uid));
  const { setUpdatedBills } = useContext(UpdatedBillListContext);
  const { billId, data } = bill;
  const billRef = doc(db, "bills", billId);
  const [billPaid, setBillPaid] = useState(data.paid);

  const deleteSelectedBill = async () => {
    await deleteDoc(billRef);
    getDocs(q).then((snapshot) => {
      setUpdatedBills(snapshot.docs.map((snap) => snap.data()));
    });
    console.log(`request made in BillCell line 91`);
  };

  useEffect(() => {
    // TODO: simplify the updateDoc calls
    if (billPaid) {
      try {
        updateDoc(billRef, {
          data: {
            ...data,
            paid: true,
          },
        });
        console.log(`request made in BillCell line 60`);
      } catch (error) {
        console.log(error);
      } finally {
        getDocs(q).then((snapshot) => {
          setUpdatedBills(snapshot.docs.map((snap) => snap.data()));
        });
      }
    } else {
      try {
        updateDoc(billRef, {
          data: {
            ...data,
            paid: false,
          },
        });
        console.log(`request made in BillCell line 76`);
      } catch (error) {
        console.log(error);
      } finally {
        getDocs(q).then((snapshot) => {
          setUpdatedBills(snapshot.docs.map((snap) => snap.data()));
        });
      }
    }
  }, [billPaid]);

  return (
    <BillCellWrapper key={billId} isPaid={billPaid}>
      <div
        style={{
          display: "flex",
          width: "160px",
          marginRight: "16px",
        }}
      >
        <input
          type="checkbox"
          value={billPaid}
          checked={billPaid}
          onChange={() => (billPaid ? setBillPaid(false) : setBillPaid(true))}
          style={{ marginRight: 16 }}
        />
        <div>{data.name}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "120px",
        }}
      >
        <div style={{ marginRight: "8px" }}>{data.monthlyAmt}</div>
        <div style={{ marginRight: "8px" }}>{data.billType}</div>
        <DeleteButton onClick={() => deleteSelectedBill()}>
          <FiXCircle size={16} />
        </DeleteButton>
      </div>
    </BillCellWrapper>
  );
}
