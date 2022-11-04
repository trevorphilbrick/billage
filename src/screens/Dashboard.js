<script src="http://localhost:8097"></script>;
import styled from "styled-components";
import MainContainer from "../components/MainContainer";
import { createContext, useContext, useEffect, useState } from "react";
import { LoadingContext, UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const DashboardContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UpdatedBillListContext = createContext({
  updatedBills: [],
  setUpdatedBills: () => {},
});

export const ModalContext = createContext({
  isVisible: [],
  setIsVisible: () => {},
  modalContent: null,
  setModalContent: () => {},
});

export default function Dashboard() {
  const navigate = useNavigate();
  const [updatedBills, setUpdatedBills] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [modalContent, setModalContent] = useState();
  const billContext = { updatedBills, setUpdatedBills };
  const modalContext = {
    isVisible,
    setIsVisible,
    modalContent,
    setModalContent,
  };
  const { user, setUser } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const fetchSessionStorageData = async () => {
    if (!user) {
      const savedUserObject = sessionStorage.getItem(
        "firebase:authUser:AIzaSyB6cb75lr1v5_oqwT3nv0VrUcJCOHvdeBc:[DEFAULT]"
      );

      const parsedUserObject = JSON.parse(savedUserObject);
      console.log(parsedUserObject);

      setUser(parsedUserObject);

      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    fetchSessionStorageData();
    if (!user) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <UpdatedBillListContext.Provider value={billContext}>
      <ModalContext.Provider value={modalContext}>
        <Modal />
        {user ? (
          <DashboardContainer>
            <MainContainer />
          </DashboardContainer>
        ) : null}
      </ModalContext.Provider>
    </UpdatedBillListContext.Provider>
  );
}
