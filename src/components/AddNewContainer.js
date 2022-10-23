import styled from "styled-components";
import { useFormik } from "formik";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UpdatedBillListContext } from "../screens/Dashboard";
import { firestoreContext, UserContext } from "../App";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

const AddNewContainerWrapper = styled.div`
  flex: 1;
`;

const AddNewForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-right: 16px;
`;
const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 16px 0 0 0;
`;
const StyledInput = styled.input`
  margin-top: 8px;
  border-top-style: hidden;
  border-right-style: hidden;
  border-left-style: hidden;
  border-bottom-style: hidden;
  background-color: #002233;
  padding: 8px;
  color: #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #52b788;
  padding: 8px;
  margin: 15px 0 0 0;
  color: #333;
  font-weight: bolder;
  border-radius: 4px;
  border: none;
  &:active {
    background-color: #899971;
  }
`;

const AddNewBillSchema = Yup.object().shape({
  name: Yup.string().required("name cannot be blank."),
  monthlyAmt: Yup.number()
    .required("monthly amount is required")
    .moreThan(0, "amount cannot be less than 0."),
  billType: Yup.string().required("bill type cannot be blank."),
});

export default function AddNewContainer() {
  const db = useContext(firestoreContext);
  const { user } = useContext(UserContext);
  // TODO: submit user.user.uid with setDoc payload
  // update getDoc query to user.where to search for uid
  const { setUpdatedBills } = useContext(UpdatedBillListContext);
  const [billId, setBillId] = useState();
  const q = query(collection(db, "bills"), where("uid", "==", user.uid));
  const generateNewBillId = () => {
    return setBillId(uuidv4());
  };

  useEffect(() => generateNewBillId(), []);

  const formikAddNewBill = useFormik({
    initialValues: {
      name: "",
      monthlyAmt: 0,
      billType: "",
      paid: false,
    },
    validationSchema: AddNewBillSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await setDoc(doc(db, "bills", billId.toString()), {
          uid: user.uid,
          billId,
          data: values,
        });
        resetForm();
        generateNewBillId();
        console.log("Document updated");
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        getDocs(q).then((snapshot) => {
          setUpdatedBills(snapshot.docs.map((snap) => snap.data()));
        });
        console.log(`request made in AddNewContainer line 102`);
      }
    },
  });

  return (
    <AddNewContainerWrapper>
      <AddNewForm onSubmit={formikAddNewBill.handleSubmit}>
        <InputLabel>
          Bill name
          <StyledInput
            type="text"
            name="name"
            id="name"
            onChange={formikAddNewBill.handleChange}
            value={formikAddNewBill.values.name}
          />
        </InputLabel>
        {formikAddNewBill.errors.name && formikAddNewBill.touched.name ? (
          <div>{formikAddNewBill.errors.name}</div>
        ) : null}
        <InputLabel>
          Bill amount
          <StyledInput
            type="number"
            name="monthlyAmt"
            id="monthlyAmt"
            onChange={formikAddNewBill.handleChange}
            value={formikAddNewBill.values.monthlyAmt}
          />
        </InputLabel>
        {formikAddNewBill.errors.monthlyAmt &&
        formikAddNewBill.touched.monthlyAmt ? (
          <div>{formikAddNewBill.errors.monthlyAmt}</div>
        ) : null}
        <InputLabel>
          Bill type
          <StyledInput
            type="text"
            name="billType"
            id="billType"
            onChange={formikAddNewBill.handleChange}
            value={formikAddNewBill.values.billType}
          />
        </InputLabel>
        {formikAddNewBill.errors.billType &&
        formikAddNewBill.touched.billType ? (
          <div>{formikAddNewBill.errors.billType}</div>
        ) : null}
        <SubmitButton type="submit" onKeyDown={(e) => console.log(e)}>
          Submit
        </SubmitButton>
      </AddNewForm>
    </AddNewContainerWrapper>
  );
}
