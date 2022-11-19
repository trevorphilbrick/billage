import styled from "styled-components";
import { Circle } from "rc-progress";
import { useContext, useEffect, useState } from "react";
import { UpdatedBillListContext } from "../screens/Dashboard";

const StatsContainerWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 600px) {
    width: auto;
    margin: 24px 16px;
    max-width: 600px;
  }
`;

const CircleContainer = styled.div`
  margin-top: 16px;
  width: 200px;
  position: relative;
`;

const PercentageNumber = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
`;

export default function StatsContainer() {
  const { updatedBills } = useContext(UpdatedBillListContext);
  const [paidBills, setPaidBills] = useState();
  const [amounts, setAmounts] = useState({ paid: 0, total: 0 });
  const paidPercentage = (paidBills / updatedBills.length) * 100;

  const checkPaidBills = () => {
    const filteredBills = updatedBills.filter((bill) => {
      return bill.data.paid === true;
    });

    setPaidBills(filteredBills.length);
  };

  const createPaidAmount = () => {
    let paidAmount = 0;
    let totalAmount = 0;
    updatedBills.forEach((bill) => {
      if (bill.data.paid) {
        paidAmount += bill.data.monthlyAmt;
      }
      totalAmount += bill.data.monthlyAmt;
    });
    setAmounts({ paid: paidAmount, total: totalAmount });
  };

  useEffect(() => {
    checkPaidBills();
    createPaidAmount();
  }, [updatedBills]);

  useEffect(() => createPaidAmount(), [paidBills]);

  return (
    <StatsContainerWrapper>
      <h3>Completed This Month</h3>
      <CircleContainer>
        <PercentageNumber>{Math.round(paidPercentage) || 0}%</PercentageNumber>
        <Circle
          percent={paidPercentage || 1}
          strokeWidth={6}
          trailWidth={6}
          strokeColor={paidPercentage === 100 ? "#52b788" : "#008ED5"}
        />
      </CircleContainer>
      <p style={{ marginTop: 16 }}>
        You{"'"}ve paid{" "}
        <strong> {` $${amounts.paid} / $${amounts.total}`} </strong>
      </p>
    </StatsContainerWrapper>
  );
}
