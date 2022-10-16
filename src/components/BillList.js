import { collection, onSnapshot, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { firestoreContext } from "../screens/Dashboard";

export default function BillList() {
  const db = useContext(firestoreContext);
  const q = query(collection(db, "bills"));
  const [fetchedBillData, setFetchedBillData] = useState();

  onSnapshot(q, (querySnapshot) => {
    // querySnapshot.forEach((snap) => console.log(snap.data()));
    setFetchedBillData(querySnapshot.docs.map((snap) => snap.data()));
  });

  return (
    <div>
      {fetchedBillData &&
        fetchedBillData.map((bill) => {
          return <div key={bill.billId}>{bill.data.name}</div>;
        })}
    </div>
  );
}
