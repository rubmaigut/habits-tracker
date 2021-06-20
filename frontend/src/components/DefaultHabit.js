import React from "react";
import {
  HabitCard,
  GoogleIcon,
  Paragraph,
  HabitInnerWrapper,
} from "../styled/StyledComponents";

const DefaultHabit = ({ iconUrl, name, onClicK, count, goal }) => {
  return (
    <HabitCard
      onClick={onClicK}
      style={{ justifyContent: "space-between", padding: "0px 15px" }}
    >
      <HabitInnerWrapper>
        <GoogleIcon src={iconUrl} style={{ padding: "0px" }} />
        <Paragraph style={{ marginLeft: "10px" }}>{name}</Paragraph>
      </HabitInnerWrapper>
      {count && goal && (
        <HabitInnerWrapper>
          <Paragraph>{`${count} / ${goal}`}</Paragraph>
        </HabitInnerWrapper>
      )}
    </HabitCard>
  );
};
export default DefaultHabit;
