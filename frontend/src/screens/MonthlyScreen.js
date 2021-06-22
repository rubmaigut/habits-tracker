import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getUserHabits } from "../helpers/Fetch-API";
import { MainWrapper } from "../styled/StyledComponents";
import DefaultHabit from "../components/DefaultHabit";

const Monthly = ({label}) => {
  const [habistList, setHabitsList] = useState([]);
  const accessToken = useSelector((store) => store.user.accessToken);

  const getYourHabits = async () => {
    const habitsData = await getUserHabits({ accessToken });
    if (habitsData.length) {
      setHabitsList(habitsData);
    }
  };
  const habitsByFrequency = habistList.filter((frequency)=>{
      return frequency.frequency === `${label}`
  })

  useEffect(() => {
    getYourHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      {habitsByFrequency.length
        ? habitsByFrequency.map((habit) => (
            <DefaultHabit
              key={habit._id}
              iconUrl={habit.icon?.url || null}
              name={habit.name}
              count={habit.count}
              goal={habit.goal}
              onClicK={() =>null}
            />
          ))
        : null}
    </MainWrapper>
  );
};
export default Monthly;
