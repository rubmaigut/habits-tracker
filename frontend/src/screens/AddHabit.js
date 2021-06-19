import React from "react";
import { useHistory } from "react-router-dom";
import {
  MainWrapper,
  CustomHabit,
  GoogleIcon,
} from "../styled/StyledComponents";

import Header from "../components/Header";
import button from "../assets/button.png";

const AddHabits = () => {
  const history = useHistory();

  return (
    <MainWrapper>
      <Header
        leftOnClick={history.goBack}
        title="New Habits"
        icon="storefrontRoundedIcon"
      />
      <CustomHabit onClick={() => history.push("/custom-habits")}>
        <GoogleIcon src={button} />
        Custom Habit
      </CustomHabit>
    </MainWrapper>
  );
};
export default AddHabits;
