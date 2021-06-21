import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { getUserHabits } from "../helpers/Fetch-API";

import { MainWrapper } from "../styled/StyledComponents";
import TrackerBody from "../components/TrackerBody";
import HabitScreenHeader from "../components/TrackerHeader"

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
  }, []);

  return (
    <MainWrapper>
      <HabitScreenHeader
        title1="Weekly"
        title2="Monthly"
        title3="Yearly"
      />
        {habistList.length ?
          habistList.map((habit) => (
            <TrackerBody
              key={habit._id}
              iconUrl={habit.icon?.url || null}
              name={habit.name}
              onClicK={() => null}
            />
          )): null}
    </MainWrapper>
  );
};

export default YourHabits;
