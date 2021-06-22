import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MainWrapper } from "../styled/StyledComponents";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { fetchGoal, IsHabitDone} from "../helpers/Fetch-API";

const AddHabitValue = ({id}) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [count, setCount] = useState("");
  const [goal, setGoal] = useState("");
  const [goalData, setGoalData] = useState([]);

  const fetchingGoal = async () => {
    const data = await fetchGoal();
    setGoalData(data);
  };

  const onSaveProgressDoned = async () => {

    const { habitDoneSaved } = await IsHabitDone({
      id,
      accessToken,
      count,
      goal,
    });

    if (habitDoneSaved){
     <p>your goal was saved</p>
    }
  };

  useEffect(() => {
    fetchingGoal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          </MenuItem>
        ))}
      </TextField>

        <button
        onClick={()=>onSaveProgressDoned()}> save</button>
    </MainWrapper>
  );
};
export default AddHabitValue;
