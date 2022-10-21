import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { UpdatedBillListContext } from "../screens/Dashboard";
import { firestoreContext, UserContext } from "../App";
import BillCell from "./BillCell";

export default function BillList() {
  const db = useContext(firestoreContext);
  const { updatedBills } = useContext(UpdatedBillListContext);
  const { user } = useContext(UserContext);
  const q = query(collection(db, "bills"), where("uid", "==", user.uid));

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
