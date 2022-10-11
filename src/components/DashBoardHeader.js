import styled from "styled-components";
import AddNewContainer from "./AddNewContainer";
import StatsContainer from "./StatsContainer";

const DashBoardHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export default function DashBoardHeader() {
  return (
    <DashBoardHeaderContainer>
      <AddNewContainer />
      <StatsContainer />
    </DashBoardHeaderContainer>
  );
}
