import styled from "styled-components";
import { useFormik } from "formik";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useContext } from "react";
import { firestoreContext, UpdatedBillListContext } from "../screens/Dashboard";
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
  const { setUpdatedBills } = useContext(UpdatedBillListContext);
  const q = query(collection(db, "bills"));

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
        await addDoc(collection(db, "bills"), {
          billId: uuidv4(),
          data: values,
        });
        resetForm();
        console.log("Document updated");
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        getDocs(q).then((snapshot) => {
          setUpdatedBills(snapshot.docs.map((snap) => snap.data()));
        });
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
