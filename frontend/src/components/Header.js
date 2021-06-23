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

const iconSelector = (icon) => {
  switch (icon) {
    case "addCircleIcon":
      return <AddCircleOutlineRoundedIcon />;
    case "storefrontRoundedIcon":
      return <StorefrontRoundedIcon />;

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
            Back
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
