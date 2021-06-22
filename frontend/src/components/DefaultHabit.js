import React, { useEffect, useState } from "react";
import {
  HabitCard,
  GoogleIcon,
  Paragraph,
  HabitInnerWrapper,
} from "../styled/StyledComponents";

const DefaultHabit = ({
  iconUrl,
  name,
  onClicK,
  count,
  goal,
  showProgress
}) => {
  const [progress, setProgress] = useState(0);

  const renderProgressPercent = () => {
    setProgress(showProgress);
  };

  useEffect(() => {
    renderProgressPercent();
  }, []);

  return (
    <HabitCard
      onClick={onClicK}
      style={{ justifyContent: "space-between", padding: "0px 15px" }}
    >
      <HabitInnerWrapper >
        <GoogleIcon src={iconUrl} style={{ padding: "0px" }} />
        <Paragraph style={{ marginLeft: "10px" }}>{name}</Paragraph>
      </HabitInnerWrapper>
      {count && goal && (
        <HabitInnerWrapper  >
          <HabitInnerWrapper style={{margin:"10px", textAlign: "start"}}>
            <Paragraph>{`${count} ${goal}`}</Paragraph>
          </HabitInnerWrapper>
        </HabitInnerWrapper>
      )}
    </HabitCard>
  );
};
export default DefaultHabit;
