import styled from "styled-components";
import MainContainer from "../components/MainContainer";
import { createContext, useContext, useEffect, useState } from "react";
import { LoadingContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const DashboardContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UpdatedBillListContext = createContext({
  updatedBills: [],
  setUpdatedBills: () => {},
});

export default function Dashboard() {
  const navigate = useNavigate();
  const [updatedBills, setUpdatedBills] = useState([]);
  const billContext = { updatedBills, setUpdatedBills };
  const { user, setUser } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const fetchSessionStorageData = async () => {
    if (!user) {
      const savedUserObject = sessionStorage.getItem(
        "firebase:authUser:AIzaSyB6cb75lr1v5_oqwT3nv0VrUcJCOHvdeBc:[DEFAULT]"
      );

      const parsedUserObject = JSON.parse(savedUserObject);
      console.log(parsedUserObject);

      setUser(parsedUserObject);

      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchSessionStorageData();
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <UpdatedBillListContext.Provider value={billContext}>
      {user ? (
        <DashboardContainer>
          <MainContainer />
        </DashboardContainer>
      ) : null}
    </UpdatedBillListContext.Provider>
  );
}
