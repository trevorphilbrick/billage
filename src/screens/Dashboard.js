import styled from "styled-components";
import MainContainer from "../components/MainContainer";
import { createContext, useState } from "react";

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

  return (
    <UpdatedBillListContext.Provider value={billContext}>
      <DashboardContainer>
        <MainContainer />
      </DashboardContainer>
    </UpdatedBillListContext.Provider>
  );
}
