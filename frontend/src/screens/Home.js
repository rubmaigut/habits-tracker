import React,{useState} from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ViewListRoundedIcon from '@material-ui/icons/ViewListRounded';
import EventAvailableRoundedIcon from '@material-ui/icons/EventAvailableRounded';
import DonutLargeRoundedIcon from '@material-ui/icons/DonutLargeRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

import { tabUseStyles } from "../styled/materialUI-TabHome";
import { MainWrapper } from "../styled/StyledComponents";


import { TabPanel } from "../components/TabPanel";  
import YourHabits from "./YourHabits";
import HabitTracker from "./HabitTracker"
import Summary from "./Summary";


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const classes = tabUseStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainWrapper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
        className={classes.tabs}
      >
        <Tab icon={<ViewListRoundedIcon />} aria-label="phone" {...a11yProps(0)} />
        <Tab icon={<EventAvailableRoundedIcon />} aria-label="favorite" {...a11yProps(1)} />
        <Tab icon={<DonutLargeRoundedIcon />} aria-label="person" {...a11yProps(2)} />
        <Tab icon={<SettingsRoundedIcon />} aria-label="person" {...a11yProps(3)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <YourHabits />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HabitTracker/>
      </TabPanel>
      <TabPanel value={value} index={2}>
       <Summary/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        User
      </TabPanel>
    </MainWrapper>
  );
}

export default Home;


