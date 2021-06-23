import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getUserHabits, fetchHabitByDay } from "../helpers/Fetch-API";
import {
  MainWrapper,
  ActionCard,
  IconWrapper,
} from "../styled/StyledComponents";

import ProgressHabit from "../components/ProgressHabit"
import AddHabitValue from "../components/addHabitDoneValue";

const Daily = ({ label }) => {
  const [habistList, setHabitsList] = useState([]);
  const [open, setOpen] = useState({});
  const [progressDone, setProgressDone] = useState();
  const accessToken = useSelector((store) => store.user.accessToken);

  const getYourHabits = async () => {
    const habitsData = await getUserHabits({ accessToken });
    if (habitsData.length) {
      setHabitsList(habitsData);
  
    }
  };
  const habitsByFrequency = habistList.filter((frequency) => {
    return frequency.frequency === `${label}`;
  });

  const handleChangeToggle = (index) => {
    setOpen({
      ...open,
      [index]: !open[index],
    });
  };

  const habitByDay = async () => {
    const habitDoneData = await fetchHabitByDay({ accessToken });
    setProgressDone(habitDoneData);
  };

  const refresh = ()=>{
    habitByDay()
  }
  useEffect(() => {
    getYourHabits();
    habitByDay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      {habitsByFrequency.length
        ? habitsByFrequency.map((habit, index) => {
          const habitProgress = progressDone?.find((habitDone)=> habitDone.habitId === habit._id)
           const progressPercent= habitProgress?.countDone*100/habit.count

               return (
              <IconWrapper key={habit._id}>
                <ProgressHabit
                  iconUrl={habit.icon?.url || null}
                  name={habit.name}
                  count={habit.count}
                  goal={habit.goal}
                  hasOptions={true}
                  onClickOptions={() => handleChangeToggle(index)}
                  showProgress={ progressPercent > 100 ? 100 : progressPercent ||0}
                />
                {open[index] === true && (
                  <ActionCard>
                    <AddHabitValue 
                    id={habit._id}
                    habitGoal={habit.goal}
                    refresh={refresh}
                   />
                  </ActionCard>
                )}
              </IconWrapper>
            );
          })
        : null}
    </MainWrapper>
  );
};
export default Daily;
