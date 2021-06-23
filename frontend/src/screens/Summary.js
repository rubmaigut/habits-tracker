import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { KeyboardDatePicker } from "@material-ui/pickers";

import Header from "../components/Header";

import {
  MainWrapper,
  InnerWrapper,
  HabitInnerWrapper,
  GoogleIcon,
  Title,
  Subtitle,
} from "../styled/StyledComponents";

import rate from "../assets/report.png";
import note from "../assets/note.png";
import okay from "../assets/okay.png";
import calendar from "../assets/calendar.png";

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
  const [habistTrackList, setHabitsTrackList] = useState([]);
  const [habitByDate, setHabitByDate] = useState([]);
  const [habitsDone, setHabistDone] = useState(0);
  const [overallRate, setOverRate] = useState(0);

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
      startDate,
    });
    setHabitByDate(allHabitByDate);
  };

  const allHabitDonedbyMonth = async () => {
    const allHabitByDate = await fetchHabitByMonth({
      accessToken,
      startDate,
    });
    await setHabitsTrackList(allHabitByDate);
    const days = await allHabitByDate.map((date) =>
      new Date(date.dateDone).getDate()
    );
    await setSelectedDays(days);
  };

  const onChangeDate = (value) => {
    setStartDate(value.format().split("T")[0]);
  };

  const onMonthChange = (value) => {
    setStartDate(value.format().split("T")[0]);
  };

  useEffect(() => {
    //fetchChain();
    allHabitDoned();
    getYourHabits();
    allHabitDonedbyMonth();
  }, [startDate]);

  useEffect(() => {
    setHabistDone(habitByDate?.filter((item) => item.isDone).length);
    setOverRate(
      Math.trunc(
        (habitByDate?.filter((item) => item.isDone).length * 100) /
          habistList.length
      )
    );
  }, [habistList, habistTrackList]);

  return (
    <MainWrapper>
      <Header title="All Habits" />
      <HabitInnerWrapper
        style={{
          width: "100%",
          overflow: "scroll",
          display: "flex",
          justifyContent: "center",
        }}
      >
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
          const date = new Date(day);
          const isSelected =
            isInCurrentMonth && selectedDays.includes(date.getDate());

          return (
            <Badge
              badgeContent={
                isSelected ? (
                  <FiberManualRecordIcon fontSize="small" />
                ) : undefined
              }
            >
              {dayComponent}
            </Badge>
          );
        }}
      />
      <InnerWrapper style={{ marginBottom: "15px" }}>
        <HabitInnerWrapper style={{ width: "47%", flexDirection: "column" }}>
          <GoogleIcon src={rate} />
          <Title style={{ marginBottom: "0px" }}>{overallRate} %</Title>
          <p style={{ margin: "0px" }}>Overall rate</p>
        </HabitInnerWrapper>

        <HabitInnerWrapper style={{ width: "47%", flexDirection: "column" }}>
          <GoogleIcon src={note} />
          <Title
            style={{ marginBottom: "0px" }}
          >{`${habitsDone} / ${habistList.length}`}</Title>
          <p style={{ margin: "0px" }}>Habit doned</p>
        </HabitInnerWrapper>
      </InnerWrapper>

      <InnerWrapper>
        <HabitInnerWrapper style={{ width: "47%", flexDirection: "column" }}>
          <GoogleIcon src={calendar} />
          <Title style={{ marginBottom: "0px" }}>{overallRate} %</Title>
          <p style={{ margin: "0px" }}>Done in Month</p>
        </HabitInnerWrapper>

        <HabitInnerWrapper style={{ width: "47%", flexDirection: "column" }}>
          <GoogleIcon src={okay} />
          <Title style={{ marginBottom: "0px" }}>{overallRate} %</Title>
          <p style={{ margin: "0px" }}>Perfect Days</p>
        </HabitInnerWrapper>
      </InnerWrapper>
    </MainWrapper>
  );
};
export default Summary;
