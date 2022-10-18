import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { doc, updateDoc, getDocs, query, collection } from "firebase/firestore";
import { firestoreContext } from "../screens/Dashboard";
import { UpdatedBillListContext } from "../screens/Dashboard";

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

export default function BillCell({ bill }) {
  const db = useContext(firestoreContext);
  const q = query(collection(db, "bills"));
  const { setUpdatedBills } = useContext(UpdatedBillListContext);
  const { billId, data } = bill;
  const billRef = doc(db, "bills", billId);
  const [billPaid, setBillPaid] = useState(data.paid);

  useEffect(() => {
    if (billPaid) {
      try {
        updateDoc(billRef, {
          data: {
            ...data,
            paid: true,
          },
        }).then(() => console.log("bill updated!", { bill }));
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
      <div>
        <input
          type="checkbox"
          value={billPaid}
          checked={billPaid}
          onChange={() => (billPaid ? setBillPaid(false) : setBillPaid(true))}
          style={{ marginRight: 16 }}
        />
        {data.name}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "120px",
        }}
      >
        <div>{data.monthlyAmt}</div>
        <div>{data.billType}</div>
      </div>
    </BillCellWrapper>
  );
}
