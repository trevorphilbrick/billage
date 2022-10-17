import styled from "styled-components";
import BillList from "./BillList";
import DashBoardHeader from "./DashBoardHeader";

const MainContainerWrapper = styled.div`
  padding: 24px;
  @media (max-width: 600px) {
    padding: 24px;
  }
`;

export default function MainContainer() {
  return (
    <MainContainerWrapper>
      <DashBoardHeader />
      <BillList />
    </MainContainerWrapper>
  );
}
