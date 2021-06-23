import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge } from "@material-ui/core";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { KeyboardDatePicker } from "@material-ui/pickers";

import Header from "../components/Header";

import {
  MainWrapper,
  InnerWrapper,
  HabitInnerWrapper,
  GoogleIcon,
  Tags,
} from "../styled/StyledComponents";

import {
  fetchHabitByDay,
  getUserHabits,
  fetchHabitByMonth,
} from "../helpers/Fetch-API";

const Summary = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [selectedDays, setSelectedDays] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [icon, setIcon] = useState();
  const [habistList, setHabitsList] = useState([]);

  const getYourHabits = async () => {
    const habitsData = await getUserHabits({ accessToken });
    if (habitsData.length) {
      setHabitsList(habitsData);
      setIcon(habitsData);
    }
  };

  const allHabitDoned = async () => {
    const allHabitByDate = await fetchHabitByDay({
      accessToken,
      startDate: startDate,
    });
    console.log(allHabitByDate);
  };

  const allHabitDonedbyMonth = async () => {
    const allHabitByDate = await fetchHabitByMonth({
      accessToken,
      startDate: startDate,
    });
    const days = await allHabitByDate.map((date)=> new Date(date.dateDone).getDate())
    console.log(days)
    setSelectedDays(days)
  };

  const onChangeDate = (value) => {
    setStartDate(value.format().split("T")[0]);
  };

  const onMonthChange = (value) => {
    setStartDate(value.format().split("T")[0]);
  }

  useEffect(() => {
    allHabitDoned();
    getYourHabits();
    allHabitDonedbyMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  return (
    <MainWrapper>
      <Header title="All Habits" />
      <HabitInnerWrapper style={{ width: "100%", overflow: "scroll" }}>
        {habistList.map((habit) => {
          icon?.find((habitDone) => habitDone.habitId === habit._id);
          return (
            <GoogleIcon
            key={habit._id}
              src={habit.icon?.url || null}
              style={{ width: "35px", height: "35px" }}
            />
          );
        })}
      </HabitInnerWrapper>
      <KeyboardDatePicker
        disableToolbar
        margin="normal"
        id="date-picker-dialog"
        label="Start Date"
        format="MM/DD/YYYY"
        value={startDate}
        variant="static"
        onChange={onChangeDate}
        onMonthChange={onMonthChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          const date = new Date(day); // skip this step, it is required to support date libs
          const isSelected =
            isInCurrentMonth && selectedDays.includes(date.getDate());

          // You can also use our internal <Day /> component
          return (
            <Badge badgeContent={isSelected ? <FiberManualRecordIcon color={"primary"} fontSize="small" /> : undefined}>
              {dayComponent}
            </Badge>
          );
        }}
      />
      <InnerWrapper>
        <HabitInnerWrapper style={{ width: "50%" }}>
          <Tags> Overall Rate</Tags>
        </HabitInnerWrapper>
        <HabitInnerWrapper style={{ width: "50%" }}>
          <Tags> Habit Done</Tags>
        </HabitInnerWrapper>
      </InnerWrapper>
      <InnerWrapper>
        <HabitInnerWrapper style={{ width: "50%" }}>
          <Tags> Best Streaks</Tags>
        </HabitInnerWrapper>
        <HabitInnerWrapper style={{ width: "50%" }}>
          <Tags> Perfect Days</Tags>
        </HabitInnerWrapper>
      </InnerWrapper>
    </MainWrapper>
  );
};
export default Summary;
