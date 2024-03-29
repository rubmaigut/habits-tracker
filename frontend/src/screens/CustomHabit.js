import "moment";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";

import {
  useStyles,
  materialTheme,
  PurpleSwitch,
} from "../styled/materialUI-Modal";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import Header from "../components/Header";
import CustomSelect from "../components/CustomSelect";
import IconModal from "../components/IconModal";
import CustomModal from "../components/CustomModal";

import { MainWrapper, FormWrapper, IconSize } from "../styled/StyledComponents";

import {
  formDataSelected,
  createCustomHabit,
  findDefaultHabits,
  findHabit,
  updateYourHabit,
} from "../helpers/Fetch-API";


const tableNames = ["category", "goal", "frequency", "timeRange"];

const CustomHabit = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const params = useParams();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [habitName, setHabitName] = useState("");
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

  const  [tablesFetched, setTablesFetched]= useState(false)

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [toggleButton, setToggleButton] = useState({
    checkedA: false,
  });

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
            await setCategoryData(newCategory);
            break;

          case "goal":
            const newGoal = tableData.map((item) => ({
              ...item,
              value: item.symbol,
              name: item.unitName,
            }));
            await setGoalData(newGoal);
            break;

          case "frequency":
            const newFrequency = tableData.map((item) => ({
              ...item,
              value: item.frequencyName,
              name: item.frequencyName,
            }));
            await setFrequencyData(newFrequency);
            break;

          case "timeRange":
            const newTimeRange = tableData.map((item) => ({
              ...item,
              value: item.timeRangeName,
              name: item.timeRangeName,
            }));
            await setTimeData(newTimeRange);
            break;

          default:
            await  setTimeData([]);
            break;
        }
        await setTablesFetched(true)
      } catch (error) {}
    });
  };

  const fetchCustomHabit = async (id) => {
    const habitFetched = await findDefaultHabits({ id, accessToken });

    if (habitFetched) {
      setHabitName(habitFetched.name);
      setCount(habitFetched.count);
      setMessage(habitFetched.message);
      setCategory(habitFetched.category.categoryName);
      setGoal(habitFetched.goal);
      setFrequency(habitFetched.frequency);
      setTime(habitFetched.timeRange);
      setIconSelected(habitFetched.icon);
      setStartDate(habitFetched.startedDate);
      if (habitFetched.endingDate) {
        setToggleButton({
          ...toggleButton,
          ["checkedA"]: true,
        });
        setEndDate(habitFetched.endingDate);
      }
    }
  };

  const fetchHabit = async (id) => {
    const habitFetched = await findHabit({ id, accessToken });

    if (habitFetched) {
      setHabitName(habitFetched.name);
      setCount(habitFetched.count);
      setMessage(habitFetched.message);
      setCategory(habitFetched.category.categoryName);
      setGoal(habitFetched.goal);
      setFrequency(habitFetched.frequency);
      setTime(habitFetched.timeRange);
      setIconSelected(habitFetched.icon);
      setStartDate(habitFetched.startedDate);
      if (habitFetched.endingDate) {
        setToggleButton({
          ...toggleButton,
          ["checkedA"]: true,
        });
        setEndDate(habitFetched.endingDate);
      }
    }
  };

  const onCreateHabit = async () => {
    const editCustom = location.pathname.search("update");
    if (editCustom > -1) {
      const { updateHabit } = await updateYourHabit({
        accessToken,
        category,
        name: habitName,
        count,
        goal,
        frequency,
        timeRange: time,
        icon: iconSelected.imageName,
        message,
        startedDate: startDate,
        endingDate: endDate,
        id: params.id,
      });
      if (updateHabit) {
        history.push("/home");
      }
    } else {
      const { habitCreated } = await createCustomHabit({
        accessToken,
        category,
        name: habitName,
        count,
        goal,
        frequency,
        timeRange: time,
        icon: iconSelected.imageName,
        message,
        startedDate: startDate,
        endingDate: endDate,
      });
      if (habitCreated) {
        history.push("/home");
      } else {
        //
      }
    }
  };

  const handleChangeToggle = (event) => {
    setToggleButton({
      ...toggleButton,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    fetchTable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const editCustom = location.pathname.search("edit");
    if (params.id && tablesFetched) {
      if (editCustom > -1) {
        fetchCustomHabit(params.id);
      } else {
        fetchHabit(params.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, location, tablesFetched]);

  return (
    <ThemeProvider theme={materialTheme}>
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
          style={{justifyContent: "space-between" }}
        >
          <TextField
            style={{ width: "95%" }}
            onChange={(e) => setCount(e.target.value)}
            value={count}
            label="Count "
            helperText="expressed in number your goal"
          />
          <CustomSelect
            style={{ width: "35%" }}
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

          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Start Date"
            format="MM/DD/YYYY"
            value={startDate}
            onChange={setStartDate}
            minDate={new Date()}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <FormControlLabel
            control={
              <PurpleSwitch
                checked={toggleButton.checkedA}
                onChange={handleChangeToggle}
                name="checkedA"
              />
            }
            label="Has end date"
          />
          {toggleButton.checkedA && (
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="End Date"
              format="MM/DD/YYYY"
              value={endDate}
              minDate={startDate}
              onChange={setEndDate}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
              disabled={startDate ? false : true}
            />
          )}

          <Button
            variant="contained"
            className={classes.submit}
            onClick={onCreateHabit}
            style={{ width: "95%", alignSelf: "center" }}
          >
            SAVE
          </Button>
        </FormWrapper>
      </MainWrapper>
    </ThemeProvider>
  );
};
export default CustomHabit;
