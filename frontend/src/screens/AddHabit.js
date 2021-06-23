import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import DefaultHabit from "../components/DefaultHabit";
import button from "../assets/button.png";

import {
MainWrapper,
CustomHabit,
GoogleIcon,
} from "../styled/StyledComponents";

import { defaultHabits } from "../helpers/Fetch-API";

const AddHabits = () => {
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken);

  const [habits, sethabits] = useState([]);

  const fetchDefaultHabits = async () => {
    const preloadHabits = await defaultHabits(accessToken);
    sethabits(preloadHabits);
  };

  useEffect(() => {
    fetchDefaultHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      <Header
        leftOnClick={history.goBack}
        title="Default Habits"
        icon="storefrontRoundedIcon"
      />
      <CustomHabit onClick={() => history.push("/custom-habits")}>
        <GoogleIcon src={button} />
        Custom Habit
      </CustomHabit>
      {habits.length &&
        habits.map((habit) => (
          <DefaultHabit
            key={habit._id}
            iconUrl={habit.icon.url}
            name={habit.name}
            onClicK={() => history.push(`/custom-habits/edit/${habit._id}`)}
          />
        ))}
    </MainWrapper>
  );
};
export default AddHabits;
