import styled from "styled-components";
import { Circle } from "rc-progress";

const StatsContainerWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    width: auto;
    margin: 24px 16px;
    max-width: 600px;
  }
`;

const CircleContainer = styled.div`
  margin-top: 16px;
  width: 200px;
`;

export default function StatsContainer() {
  return (
    <StatsContainerWrapper>
      <CircleContainer>
        <Circle
          percent={10}
          strokeWidth={6}
          trailWidth={6}
          strokeColor="#008ED5"
        />
      </CircleContainer>
    </StatsContainerWrapper>
  );
}
