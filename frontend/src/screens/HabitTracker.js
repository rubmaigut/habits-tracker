import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getUserHabits } from "../helpers/Fetch-API";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { tabUseStyles } from "../styled/materialUI-TabHome";

import { TabPanel } from "../components/TabPanel";  
import DailyScreen from "../screens/DailyScreen"
import WeeklyScreen from "../screens/WeeklyScreen"
import MonthlyScreen from "../screens/MonthlyScreen"
import { MainWrapper } from "../styled/StyledComponents";


const YourHabits = () => {
  const classes = tabUseStyles();
  const accessToken = useSelector((store) => store.user.accessToken);

  const [habistList, setHabitsList] = useState([]);
  const [value, setValue] = useState(0);

  const a11yProps=(index) =>{
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const getYourHabits = async () => {
    const habitsData = await getUserHabits({ accessToken });
    if (habitsData.length) {
      setHabitsList(habitsData);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getYourHabits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainWrapper className={classes.root}>

      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
        className={classes.trackerTabs}
      >
        <Tab label="Daily" {...a11yProps(0)} />
        <Tab label="Weekly"  {...a11yProps(1)} />
        <Tab label="Monthly" {...a11yProps(2)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <DailyScreen
        label="Daily"/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <WeeklyScreen
        label="Weekly"/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MonthlyScreen
        label="Monthly"/>
      </TabPanel>
    </MainWrapper>
  );
};

export default YourHabits;
