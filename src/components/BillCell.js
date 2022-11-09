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
import { ModalContext, UpdatedBillListContext } from "../screens/Dashboard";
import { FiXCircle } from "react-icons/fi";
import Modal from "./Modal";
import EditBillModal from "./EditBillModal";

const BillCellWrapper = styled.div`
  background-color: ${({ isPaid }) => (isPaid ? "#52b788" : "#00293d")};
  color: ${({ isPaid }) => (isPaid ? "#333" : "#ccc")};
  margin-bottom: 8px;
  padding: 12px 16px;
  border-radius: 4px;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;

const MinimizedContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MaximizedContentWrapper = styled.div`
  margin-top: 8px;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditButton = styled.button`
  background-color: #ffbe0b;
  padding: 8px;
  margin: 15px 0 0 0;
  color: #333;
  font-weight: bolder;
  border-radius: 4px;
  border: none;
  &:active {
    background-color: #ff850b;
  }
`;

export default function BillCell({ bill }) {
  const db = useContext(firestoreContext);
  const { user } = useContext(UserContext);
  const { setUpdatedBills } = useContext(UpdatedBillListContext);
  const { setIsVisible, setModalContent } = useContext(ModalContext);
  const { billId, data } = bill;
  const q = query(collection(db, "bills"), where("uid", "==", user.uid));
  const billRef = doc(db, "bills", billId);
  const [billPaid, setBillPaid] = useState(data.paid);
  const [isActive, setIsActive] = useState(false);

  const createDate = () => {
    const day = data.dueDate;

    let dayOfWeek;

    const currentDate = new Date();

    const month = currentDate.getMonth();

    const parsedDate = currentDate.toDateString().split(" ");

    const billDueDay = new Date(
      `${parsedDate[0]} ${parsedDate[1]} ${data.dueDate} ${parsedDate[3]}`
    ).getDay();

    switch (billDueDay) {
      case 1:
        dayOfWeek = "Monday";
        break;
      case 2:
        dayOfWeek = "Tuesday";
        break;
      case 3:
        dayOfWeek = "Wednesday";
        break;
      case 4:
        dayOfWeek = "Thursday";
        break;
      case 5:
        dayOfWeek = "Friday";
        break;
      case 6:
        dayOfWeek = "Saturday";
        break;
      case 0:
        dayOfWeek = "Sunday";
        break;
    }

    return `${dayOfWeek} ${day}/${
      day > parseInt(parsedDate[2]) ? month : month === 12 ? 1 : month + 1
    }`;
  };

  const deleteSelectedBill = async () => {
    await deleteDoc(billRef);
    getDocs(q).then((snapshot) => {
      setUpdatedBills(snapshot.docs.map((snap) => snap.data()));
    });
    console.log(`request made in BillCell line 91`);
  };

  const handleEditPress = () => {
    setIsVisible(true);
    setModalContent(<EditBillModal data={data} billId={billId} />);
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

  const handleBillPaidToggle = () => {
    setBillPaid(!billPaid);
    setIsActive(isActive);
  };

  return (
    <BillCellWrapper
      key={billId}
      isPaid={billPaid}
      onClick={() => setIsActive(!isActive)}
    >
      {isActive && <Modal />}
      <MinimizedContentWrapper>
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
            onChange={() => handleBillPaidToggle()}
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
      </MinimizedContentWrapper>
      {isActive && (
        <MaximizedContentWrapper>
          {!data.dueDate && <p>No addtional information provided.</p>}
          {data.dueDate && (
            <DateContainer>
              <p>Estimated Due Date:</p>
              <p>{createDate()}</p>
            </DateContainer>
          )}
          <EditButtonContainer>
            <EditButton onClick={() => handleEditPress()}>Edit</EditButton>
          </EditButtonContainer>
        </MaximizedContentWrapper>
      )}
    </BillCellWrapper>
  );
}
