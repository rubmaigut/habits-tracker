import React from "react";
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
}) => {
  
  return (
    <HabitCard
      onClick={onClicK}
      style={{ justifyContent: "space-between", padding: "0px 15px" }}
    >
      <HabitInnerWrapper>
        <GoogleIcon src={iconUrl} style={{width:"30px", height:"30px", padding: "0px" }} />
        <Paragraph style={{ marginLeft: "10px" }}>{name}</Paragraph>
      </HabitInnerWrapper>
      {count && goal && (
        <HabitInnerWrapper>
          <HabitInnerWrapper style={{ margin: "10px", textAlign: "start" }}>
            <Paragraph>{`${count} ${goal}`}</Paragraph>
          </HabitInnerWrapper>
          
        </HabitInnerWrapper>
      )}
    </HabitCard>
  );
};
export default DefaultHabit;
