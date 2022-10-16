import styled from "styled-components";
import { Circle } from "rc-progress";

const StatsContainerWrapper = styled.div`
  width: 100%;
  max-width: 280px;
  @media (max-width: 600px) {
    width: auto;
    margin: 24px 16px;
    max-width: 600px;
  }
`;

export default function StatsContainer() {
  return (
    <StatsContainerWrapper>
      <Circle
        percent={10}
        strokeWidth={6}
        trailWidth={6}
        strokeColor="#008ED5"
      />
    </StatsContainerWrapper>
  );
}
