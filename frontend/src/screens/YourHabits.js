import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import DefaultHabit from "../components/DefaultHabit";

import { MainWrapper } from "../styled/StyledComponents";

import { getUserHabits } from "../helpers/Fetch-API";

const YourHabits = () => {
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken);

  const [habistList, setHabitsList] = useState([]);

  const getYourHabits = async () => {
    const habitsData = await getUserHabits({ accessToken });
    if (habitsData.length) {
      setHabitsList(habitsData);
    }
  };

  useEffect(() => {
    getYourHabits();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      <Header
        title="Your Habits"
        rightOnClick={() => history.push("/add-habits")}
        icon="addCircleIcon"
      />
        {habistList.length ?
          habistList.map((habit) => (
            <DefaultHabit
              key={habit._id}
              iconUrl={habit.icon?.url || null}
              name={habit.name}
              count={habit.count}
              goal={habit.goal}
              onClicK={() => history.push(`/habit/update/${habit._id}`)}
            />
          )): null}
    </MainWrapper>
  );
};

export default YourHabits;
