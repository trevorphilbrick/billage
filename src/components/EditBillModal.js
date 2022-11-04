import styled from "styled-components";
import AddNewContainer from "./AddNewContainer";
import {
  doc,
  updateDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { useContext } from "react";
import { firestoreContext, UserContext } from "../App";
import { ModalContext, UpdatedBillListContext } from "../screens/Dashboard";

const ModalWrapper = styled.div`
  background-color: #00293d;
  max-width: 400px;
  width: 90%;
  padding: 24px;
  border-radius: 4px;
`;

const EditBillModal = ({ data, billId }) => {
  const { name, monthlyAmt, paid, dueDate, billType } = data;
  const db = useContext(firestoreContext);
  const { user } = useContext(UserContext);
  const { setUpdatedBills } = useContext(UpdatedBillListContext);
  const { setIsVisible } = useContext(ModalContext);
  const updateQ = doc(db, "bills", billId.toString());
  const q = query(collection(db, "bills"), where("uid", "==", user.uid));

  const onSubmit = async (newName, newMonthlyAmt, NewDueDate, newBillType) => {
    try {
      updateDoc(updateQ, {
        billId,
        data: {
          name: newName,
          monthlyAmt: newMonthlyAmt,
          billType: newBillType,
          paid,
          dueDate: NewDueDate,
        },
      });
    } catch (error) {
      () => console.log(error);
    } finally {
      await getDocs(q).then((snapshot) => {
        setUpdatedBills(snapshot.docs.map((snap) => snap.data()));
      });
      setIsVisible(false);
    }
  };

  return (
    <ModalWrapper>
      <AddNewContainer
        title="Edit A Bill"
        name={name}
        monthlyAmt={monthlyAmt}
        paid={paid}
        dueDate={dueDate}
        billType={billType}
        onSubmit={onSubmit}
      />
    </ModalWrapper>
  );
};

export default EditBillModal;
