import CategoryButton from "./CategoryButton";
import billData from "../mockData/billData";
import styled from "styled-components";
import { useState } from "react";

const LeftPaneUpperWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 600px) {
    flex-direction: row;
  }
`;

const Spacer = styled.div`
  margin: 0 0 8px 0;
  @media (max-width: 600px) {
    margin: 0 8px 0 0;
  }
`;

export default function LeftPaneUpper() {
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const filterUniqueCategories = (data) => {
    data.forEach((bill) => {
      const billTypeLowerCase = bill.billType.toLowerCase();
      if (!uniqueCategories.includes(billTypeLowerCase)) {
        setUniqueCategories([...uniqueCategories, billTypeLowerCase]);
      }
    });
  };

  filterUniqueCategories(billData);

  return (
    <LeftPaneUpperWrapper>
      {uniqueCategories.map((name) => (
        //TODO: change this to be styled correctly
        <div key={name}>
          <CategoryButton>{name.split("")[0].toUpperCase()}</CategoryButton>
          <Spacer />
        </div>
      ))}
    </LeftPaneUpperWrapper>
  );
}
