import React from "react";
import {
  HeaderWrapper,
  HeaderBox1,
  HeaderBox2,
  Subtitle,
  HeaderIconButton,
} from "../styled/StyledComponents";

import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import StorefrontRoundedIcon from "@material-ui/icons/StorefrontRounded";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const iconSelector = (icon) => {
  switch (icon) {
    case "addCircleIcon":
      return <AddCircleOutlineRoundedIcon style={{color:"#e13351"}} />;
    case "storefrontRoundedIcon":
      return <StorefrontRoundedIcon  style={{color:"#e13351"}}/>;

    default:
      return null;
  }
};

const ScreenHeader = ({ title, leftOnClick, rightOnClick, icon }) => {
  return (
    <HeaderWrapper>
      <HeaderBox1>
        {leftOnClick && (
          <HeaderIconButton onClick={leftOnClick}>
            <ArrowBackIosRoundedIcon/>
          </HeaderIconButton>
        )}
      </HeaderBox1>
      <HeaderBox2>
        <Subtitle>{title}</Subtitle>
      </HeaderBox2>
      <HeaderBox1>
        <HeaderIconButton onClick={rightOnClick}>
          {icon && iconSelector(icon)}
        </HeaderIconButton>
      </HeaderBox1>
    </HeaderWrapper>
  );
};
export default ScreenHeader;
