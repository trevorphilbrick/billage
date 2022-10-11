import styled from "styled-components";

const CategoryButtonContainer = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 24px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CategoryButton({ children }) {
  return <CategoryButtonContainer>{children}</CategoryButtonContainer>;
}
