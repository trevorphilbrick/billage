import styled from "styled-components";
import MainContainer from "../components/MainContainer";
import { createContext, useContext, useEffect, useState } from "react";
import { LoadingContext, UserContext } from "../App";

const DashboardContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const UpdatedBillListContext = createContext({
  updatedBills: [],
  setUpdatedBills: () => {},
});

export default function Dashboard() {
  const [updatedBills, setUpdatedBills] = useState([]);
  const billContext = { updatedBills, setUpdatedBills };
  const { user, setUser } = useContext(UserContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
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
    console.log(user);
    setIsLoading(true);
    fetchSessionStorageData();
  }, []);

  return (
    <UpdatedBillListContext.Provider value={billContext}>
      {isLoading ? (
        <div>LOADING</div>
      ) : (
        <DashboardContainer>
          <MainContainer />
        </DashboardContainer>
      )}
    </UpdatedBillListContext.Provider>
  );
}
