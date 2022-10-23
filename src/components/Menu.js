import { useContext, useState } from "react";
import { FiMenu, FiChevronRight } from "react-icons/fi";
import styled from "styled-components";
import { UserContext } from "../App";

const MenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  padding-top: 16px;
`;

const AnimatedContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: yellow;
  position: fixed;
  top: 0;
  right: -300;
  border-radius: 100%;
  transition: clip-path 1s, right 1s, border-radius 1s;
  clip-path: circle(0%);
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  &.visible {
    clip-path: circle(100%);
    right: 0;
    border-radius: 0 0 0 100%;
  }
  &.hidden {
    clip-path: circle(0%);
    border-radius: 100%;
    right: -300px;
  }
`;

export default function Menu() {
  const [isMinimized, setIsMinimized] = useState(true);
  const { setUser } = useContext(UserContext);
  return (
    <MenuWrapper>
      <FiMenu onClick={() => setIsMinimized(false)} />
      <AnimatedContainer className={isMinimized ? "hidden" : "visible"}>
        <div
          style={{
            paddingTop: 16,
            paddingRight: 16,
            width: 300,
            height: 300,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <FiChevronRight onClick={() => setIsMinimized(true)} />
          <h4 onClick={() => setUser(undefined)}>Log out</h4>
        </div>
      </AnimatedContainer>
    </MenuWrapper>
  );
}
