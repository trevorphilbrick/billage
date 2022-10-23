import styled from "styled-components";
import BillList from "./BillList";
import DashBoardHeader from "./DashBoardHeader";
import Menu from "./Menu";

const MainContainerWrapper = styled.div`
  padding: 16px 24px;
  width: 95vw;
  max-width: 1128px;
  @media (max-width: 600px) {
    padding: 24px;
  }
`;

export default function MainContainer() {
  return (
    <MainContainerWrapper>
      <Menu />

      <DashBoardHeader />
      <BillList />
    </MainContainerWrapper>
  );
}
