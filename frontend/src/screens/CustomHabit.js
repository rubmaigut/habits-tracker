import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MainWrapper, FormWrapper, IconSize } from "../styled/StyledComponents";
import { useStyles } from "../styled/materialUI-Modal";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DatePicker from "@material-ui/lab/DatePicker";
import MobileDatePicker from "@material-ui/lab/MobileDatePicker";
import Stack from "@material-ui/core/Stack";

import Header from "../components/Header";
import CustomSelect from "../components/CustomSelect";
import IconModal from "../components/IconModal";
import CustomModal from "../components/CustomModal";
import { formDataSelected } from "../helpers/Fetch-API";

const tableNames = ["category", "goal", "frequency", "timeRange"];

const CustomHabit = () => {
  const classes = useStyles();
  const history = useHistory();

  const [habitName, setHabitName] = useState("");
  const [startate, setStartDate] = useState();
  const [endtate, setEndDate] = useState();
  const [count, setCount] = useState("");
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [goal, setGoal] = useState("");
  const [goalData, setGoalData] = useState([]);
  const [frequency, setFrequency] = useState("");
  const [frequencyData, setFrequencyData] = useState([]);
  const [time, setTime] = useState("");
  const [timeData, setTimeData] = useState([]);
  const [iconSelected, setIconSelected] = useState(null);
  const [displayIconModal, setDisplayIconModal] = useState(false);

  const onSelectIcon = (icon) => {
    setDisplayIconModal(false);
    setIconSelected(icon);
  };

  const fetchTable = async () => {
    tableNames.forEach(async (name) => {
      try {
        const tableData = await formDataSelected(name);
        switch (name) {
          case "category":
            const newCategory = tableData.map((item) => ({
              ...item,
              value: item.categoryName,
              name: item.categoryName,
            }));
            setCategoryData(newCategory);
            break;

          case "goal":
            const newGoal = tableData.map((item) => ({
              ...item,
              value: item.symbol,
              name: item.unitName,
            }));
            setGoalData(newGoal);
            break;

          case "frequency":
            const newFrequency = tableData.map((item) => ({
              ...item,
              value: item.frequencyName,
              name: item.frequencyName,
            }));
            setFrequencyData(newFrequency);
            break;

          case "timeRange":
            const newTimeRange = tableData.map((item) => ({
              ...item,
              value: item.timeRangeName,
              name: item.timeRangeName,
            }));
            setTimeData(newTimeRange);
            break;

          default:
            setTimeData([]);
            break;
        }
      } catch (error) {}
    });
  };

  useEffect(() => {
    fetchTable();
  }, []);

  return (
    <MainWrapper>
      <Header title="Custom Habits" leftOnClick={history.goBack} />
      <Button
        variant="contained"
        className={classes.submit}
        onClick={() => setDisplayIconModal(true)}
      >
        Choose Icon
      </Button>
      <CustomModal
        open={displayIconModal}
        handleClose={() => setDisplayIconModal(false)}
      >
        <IconModal onSelectIcon={onSelectIcon} />
      </CustomModal>
      {iconSelected && (
        <IconSize src={iconSelected?.url} alt={iconSelected?.name} />
      )}

      <TextField
        onChange={(e) => setHabitName(e.target.value)}
        value={habitName}
        label="Name"
      />
      <FormWrapper className={classes.form}>
        <CustomSelect
          items={categoryData}
          selectedValue={category}
          onChangeValue={setCategory}
          tableName={"Category"}
        />
        <div style={{ width: "95%", fontStyle: "oblique", color: "#737373" }}>
          {category &&
            categoryData.find((item) => item.value === category)?.description}
        </div>
      </FormWrapper>

      <FormWrapper
        className={classes.goalForm}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <TextField
          style={{ width: "50%" }}
          onChange={(e) => setCount(e.target.value)}
          value={count}
          label="Count "
          helperText="expressed in number your goal"
        />
        <CustomSelect
          style={{ width: "50%" }}
          items={goalData}
          selectedValue={goal}
          onChangeValue={setGoal}
          tableName={"Goal"}
        />
      </FormWrapper>

      <FormWrapper>
        <CustomSelect
          items={frequencyData}
          selectedValue={frequency}
          onChangeValue={setFrequency}
          tableName={"Frequency"}
        />
        <CustomSelect
          items={timeData}
          selectedValue={time}
          onChangeValue={setTime}
          tableName={"Time Range"}
        />
        <TextField
          style={{ width: "95%", marginTop: "10px" }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          label="message"
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack spacing={3}>
            <MobileDatePicker
              label="For mobile"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </LocalizationProvider>
      </FormWrapper>
    </MainWrapper>
  );
};
export default CustomHabit;