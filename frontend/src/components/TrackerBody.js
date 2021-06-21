import React from "react";
import {
  TrackerHabitInfo,
  GoogleIcon,
  Paragraph,
  HabitInnerWrapper,
} from "../styled/StyledComponents";

const TrackerBody = ({ iconUrl, name, onClicK}) => {
  return (
    <TrackerHabitInfo
      onClick={onClicK}
      style={{ justifyContent: "space-between", padding: "0px 15px" }}
    >
      <HabitInnerWrapper>
        <GoogleIcon src={iconUrl} style={{ padding: "0px" }} />
        <Paragraph style={{ marginLeft: "10px" }}>{name}</Paragraph>
      </HabitInnerWrapper>
    </TrackerHabitInfo>
  );
};
export default TrackerBody;
