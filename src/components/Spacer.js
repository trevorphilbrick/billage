import styled from "styled-components";

const Spacer = styled.div`
  margin: ${({ vertical }) => (vertical ? vertical : 0)}px
    ${({ horizontal }) => (horizontal ? horizontal : 0)}px 0px 0px;
`;

export default Spacer;
