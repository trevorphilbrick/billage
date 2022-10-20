import "./App.css";
import { createContext, useEffect, useState } from "react";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import { Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6cb75lr1v5_oqwT3nv0VrUcJCOHvdeBc",
  authDomain: "billage-1c0fc.firebaseapp.com",
  projectId: "billage-1c0fc",
  storageBucket: "billage-1c0fc.appspot.com",
  messagingSenderId: "325715596891",
  appId: "1:325715596891:web:f608315dd5831270cf917e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export const firestoreContext = createContext(db);
export const authContext = createContext(auth);
export const UserContext = createContext({ user: {}, setUser: () => {} });

function App() {
  const [user, setUser] = useState();
  const userProvider = { user, setUser };
  return (
    <UserContext.Provider value={userProvider}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
