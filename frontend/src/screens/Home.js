import React,{useState} from "react";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { TabPanel } from "../components/TabPanel";  
import { tabUseStyles } from "../styled/materialUI-TabHome";


import YourHabits from "./YourHabits";
import HabitTracker from "./HabitTracker"

import { MainWrapper } from "../styled/StyledComponents";

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
        <Tab icon={<PhoneIcon />} aria-label="phone" {...a11yProps(0)} />
        <Tab icon={<FavoriteIcon />} aria-label="favorite" {...a11yProps(1)} />
        <Tab icon={<PersonPinIcon />} aria-label="person" {...a11yProps(2)} />
        <Tab icon={<PersonPinIcon />} aria-label="person" {...a11yProps(3)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        <YourHabits />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HabitTracker/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item four
      </TabPanel>
    </MainWrapper>
  );
}

export default Home;


