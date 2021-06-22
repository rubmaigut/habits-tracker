import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getUserHabits } from "../helpers/Fetch-API";
import {
  MainWrapper,
  ActionCard,
  IconWrapper,
} from "../styled/StyledComponents";

import DefaultHabit from "../components/DefaultHabit";
import AddHabitValue from "../components/addHabitDoneValue";

import AddBoxIcon from "@material-ui/icons/AddBox";

const Daily = ({ label }) => {
  const [habistList, setHabitsList] = useState([]);
  const [open, setOpen] = useState({});
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

  useEffect(() => {
    getYourHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper>
      {habitsByFrequency.length
        ? habitsByFrequency.map((habit, index) => (
            <IconWrapper key={habit._id}>
              <DefaultHabit
                iconUrl={habit.icon?.url || null}
                name={habit.name}
                count={habit.count}
                goal={habit.goal}
                onClicK={() => null}
                hasOptions={true}
                onClickOptions={() => handleChangeToggle(index)}
              />
              {open[index] === true && (
                <ActionCard>
                  <AddHabitValue />
                </ActionCard>
              )}
            </IconWrapper>
          ))
        : null}
    </MainWrapper>
  );
};
export default Daily;
