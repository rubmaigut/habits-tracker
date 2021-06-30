import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MainWrapper } from "../styled/StyledComponents";
import TextField from "@material-ui/core/TextField";

import { IsHabitDone } from "../helpers/Fetch-API";

const AddHabitValue = ({
  id,
  habitGoal,
  refresh,
  habitProgress,
  closeOnSave,
  habitCount
}) => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const [count, setCount] = useState("");

  const onSaveProgressDoned = async () => {
    const { habitDoneSaved } = await IsHabitDone({
      id,
      accessToken,
      count,
      goal: habitGoal,
      isDone: parseInt(count) >= habitCount,
    });


    if (habitDoneSaved) {
      refresh();
    }
  };

  useEffect(() => {
    setCount(habitProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitProgress]);

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
      <p>{habitGoal}</p>

      <button
        onClick={() => {
          onSaveProgressDoned();
          closeOnSave();
        }}
      >
        {" "}
        save
      </button>
    </MainWrapper>
  );
};
export default AddHabitValue;
