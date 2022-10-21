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
  useEffect(() => {
    setIsLoading(true);
    if (!user) {
      const savedUserObject = localStorage.getItem(
        "firebase:authUser:AIzaSyB6cb75lr1v5_oqwT3nv0VrUcJCOHvdeBc:[DEFAULT]"
      );
      console.log(JSON.parse(savedUserObject));
      setUser(JSON.parse(savedUserObject));
    }
    console.log({ user });
    setIsLoading(false);
  }, []);

  return (
    <UpdatedBillListContext.Provider value={billContext}>
      {isLoading ? (
        <div>LOADING</div>
      ) : user ? (
        <DashboardContainer>
          <MainContainer />
        </DashboardContainer>
      ) : null}
    </UpdatedBillListContext.Provider>
  );
}
