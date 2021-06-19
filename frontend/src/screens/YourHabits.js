import React from "react";
import { useHistory } from "react-router-dom";
import { MainWrapper} from "../styled/StyledComponents";
import Header from "../components/Header";


const YourHabits = () => {
    const history = useHistory();
  return (
    <MainWrapper>
      <Header
      title="Your Habits"
      rightOnClick={()=>history.push("/add-habits")}
      icon ="addCircleIcon"
      />
    </MainWrapper>
  );
};

export default YourHabits; 
