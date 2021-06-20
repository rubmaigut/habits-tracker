import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainWrapper } from "../styled/StyledComponents";
import Header from "../components/Header";
import { getUserHabits } from "../helpers/Fetch-API";
import { useSelector } from "react-redux";
import DefaultHabit from "../components/DefaultHabit";

const YourHabits = () => {
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken);

  const [habistList, setHabitsList] = useState([]);

  const getYourHabits = async () => {
    const habitsData = await getUserHabits({ accessToken });
    console.log(habitsData)
    if (habitsData.length) {
      setHabitsList(habitsData);
    }
  };

  useEffect(() => {
    getYourHabits();
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
              onClicK={() => history.push(`/habits/update/${habit._id}`)}
            />
          )): null}
    </MainWrapper>
  );
};

export default YourHabits;
