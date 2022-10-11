import styled from "styled-components";
import LeftPane from "../components/LeftPane";
import MainContainer from "../components/MainContainer";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const DashboardContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const firebaseConfig = {
  apiKey: "AIzaSyB6cb75lr1v5_oqwT3nv0VrUcJCOHvdeBc",
  authDomain: "billage-1c0fc.firebaseapp.com",
  projectId: "billage-1c0fc",
  storageBucket: "billage-1c0fc.appspot.com",
  messagingSenderId: "325715596891",
  appId: "1:325715596891:web:f608315dd5831270cf917e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const firestoreContext = createContext(db);

export default function Dashboard() {
  return (
    <DashboardContainer>
      <LeftPane />
      <MainContainer />
    </DashboardContainer>
  );
}
