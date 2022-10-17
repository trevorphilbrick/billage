import { collection, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { firestoreContext, UpdatedBillListContext } from "../screens/Dashboard";

const BillCell = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #00293d;
  margin-bottom: 8px;
  padding: 12px 16px;
  border-radius: 4px;
`;

export default function BillList() {
  const db = useContext(firestoreContext);
  const { updatedBills } = useContext(UpdatedBillListContext);
  const q = query(collection(db, "bills"));

  const [fetchedBillData, setFetchedBillData] = useState([]);

  useEffect(() => {
    getDocs(q).then((snapshot) => {
      setFetchedBillData(snapshot.docs.map((snap) => snap.data()));
    });
  }, []);

  useEffect(() => {
    setFetchedBillData(updatedBills);
  }, [updatedBills]);

  return (
    <div style={{ marginTop: 36 }}>
      {fetchedBillData &&
        fetchedBillData.map((bill) => {
          return (
            <BillCell key={bill.billId}>
              {bill.data.name}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "120px",
                }}
              >
                <div>{bill.data.monthlyAmt}</div>
                <div>{bill.data.billType}</div>
              </div>
            </BillCell>
          );
        })}
    </div>
  );
}
