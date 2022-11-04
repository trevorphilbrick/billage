import { useContext } from "react";
import styled from "styled-components";
import { ModalContext } from "../screens/Dashboard";
const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function Modal() {
  const { isVisible, setIsVisible, modalContent } = useContext(ModalContext);
  return (
    <>
      {isVisible && (
        <Backdrop
          onClick={(event) =>
            event.currentTarget === event.target && setIsVisible(false)
          }
        >
          {modalContent}
        </Backdrop>
      )}
    </>
  );
}
