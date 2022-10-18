import { collection, getDocs, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { firestoreContext, UpdatedBillListContext } from "../screens/Dashboard";
import BillCell from "./BillCell";

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
          return <BillCell bill={bill} key={bill.billId} />;
        })}
    </div>
  );
}
