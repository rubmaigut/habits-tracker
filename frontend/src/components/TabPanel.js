import React from "react";
import { MainWrapper} from "../styled/StyledComponents";

export const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <MainWrapper
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <MainWrapper>{children}</MainWrapper>}
    </MainWrapper>
  );
};
