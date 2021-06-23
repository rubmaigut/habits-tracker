import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import DefaultHabit from "../components/DefaultHabit";
import AddIcon from '@material-ui/icons/Add';

import {
MainWrapper,
CustomHabit,
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
      <AddIcon style={{color:"#e13351"}}/>
        Create Custom Habit
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
