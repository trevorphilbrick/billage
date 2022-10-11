import styled from "styled-components";
import { useFormik } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { useContext } from "react";
import { firestoreContext } from "../screens/Dashboard";

const AddNewContainerWrapper = styled.div`
  width: 100%;
  background-color: blue;
`;

export default function AddNewContainer() {
  const db = useContext(firestoreContext);
  const formikAddNewBill = useFormik({
    initialValues: {
      name: "",
      monthlyAmt: 0,
      billType: "",
      paid: false,
    },
    onSubmit: async (values) => {
      try {
        const docRef = await addDoc(collection(db, "bills"), {
          values,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  });
  return (
    <AddNewContainerWrapper>
      <button onClick={() => formikAddNewBill.submitForm()}>Submit</button>
    </AddNewContainerWrapper>
  );
}

// TODO: create form to submit data
