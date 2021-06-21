import React from "react";
import {
  HeaderWrapper,
  HeaderBox2,
  Subtitle,
} from "../styled/StyledComponents";

const HabitScreenHeader = ({ title1, title2, title3, }) => {
  return (
    <HeaderWrapper>
      <HeaderBox2 style={{width:"33%"}}>
        <Subtitle>{title1}</Subtitle>
      </HeaderBox2>
      <HeaderBox2 style={{width:"33%"}}>
        <Subtitle>{title2}</Subtitle>
      </HeaderBox2>
      <HeaderBox2 style={{width:"33%"}}>
        <Subtitle>{title3}</Subtitle>
      </HeaderBox2>
    </HeaderWrapper>
  );
};
export default HabitScreenHeader;
