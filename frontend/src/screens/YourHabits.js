import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import DefaultHabit from "../components/DefaultHabit";

import { HomeWrapper } from "../styled/StyledComponents";

import { getUserHabits, deleteHabits } from "../helpers/Fetch-API";
import {
  SwipeableList,
  SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

const YourHabits = () => {
  const history = useHistory();
  const accessToken = useSelector((store) => store.user.accessToken);

  const [habistList, setHabitsList] = useState([]);

  const getYourHabits = async () => {
    const habitsData = await getUserHabits({ accessToken });
    setHabitsList(habitsData);
   
  };

  const deleteHabit= async (id)=>{
    const deleteData= await deleteHabits({accessToken, id})
    if (deleteData) {
      getYourHabits()
    }
  }
  
  useEffect(() => {
    if(accessToken){
      getYourHabits();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <HomeWrapper>
      <Header
        title="Your Habits"
        rightOnClick={() => history.push("/add-habits")}
        icon="addCircleIcon"
      />
      <SwipeableList>
        {habistList.length
          ? habistList.map((habit) => (
              <SwipeableListItem  key={habit._id}
                swipeLeft={{
                  content: <div style={{width:"95%", height:"50px", backgroundColor:"red"}}> Delete</div>,
                  action: () => deleteHabit(habit._id)
                }}
                onSwipeProgress={(progress) =>
                  console.info(`Swipe progress: ${progress}%`)
                }
              >
                <DefaultHabit
                  iconUrl={habit.icon?.url || null}
                  name={habit.name}
                  count={habit.count}
                  goal={habit.goal}
                  onClicK={() => history.push(`/habit/update/${habit._id}`)}
                />
              </SwipeableListItem>
            ))
          : null}
      </SwipeableList>
    </HomeWrapper>
  );
};

export default YourHabits;
