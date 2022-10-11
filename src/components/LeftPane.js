import styled from "styled-components";
import CategoryButton from "./CategoryButton";
import LeftPaneUpper from "./LeftPaneUpper";

const LeftPaneContainer = styled.div`
  height: 100vh;
  width: 72px;
  padding: 16px 0;
  position: absolute;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #003652, #00293d);
  box-shadow: 1px 0 4px 0px #0f0f0f;
  @media (max-width: 600px) {
    padding: 0 16px;
    flex-direction: row;
    height: 64px;
    width: 100vw;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

export default function LeftPane() {
  return (
    <LeftPaneContainer>
      <LeftPaneUpper />
    </LeftPaneContainer>
  );
}
