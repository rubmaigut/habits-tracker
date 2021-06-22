import React, { useEffect, useState } from "react";
import { MainWrapper } from "../styled/StyledComponents";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

import {fetchGoal} from "../helpers/Fetch-API"

const AddHabitValue = () => {
  const [count, setCount] = useState("");
  const [goal, setGoal] = useState("");
  const [goalData, setGoalData] = useState([]);

  const fetchingGoal = async ()=>{
    const data = await fetchGoal()
    setGoalData(data)
  }
   useEffect(()=>{
    fetchingGoal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])
  return (
    <MainWrapper
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0px 50px",
      }}
    >
      <TextField
        style={{ width: "40%", textAlign: "center" }}
        onChange={(e) => setCount(e.target.value)}
        value={count}
        label="Count"
      />
      <TextField
        select
        style={{ width: "40%", textAlign: "center" }}
        onChange={(e) => setGoal(e.target.value)}
        value={goal}
        label="goal"
      >
        {goalData.map((option) => (
            <MenuItem key={option._id} value={option.symbol}>
              {option.symbol}
            </MenuItem> ))}
      </TextField>

    </MainWrapper>
  );
};
export default AddHabitValue;
