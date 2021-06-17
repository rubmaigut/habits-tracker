import React from "react";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import axios from "axios";

import {
  MainWrapper,
  BorderStyle,
  FormWrapper,
  GoogleIcon,
  EmailButton,
  Wrapper,
  Title,
  Subtitle,
} from "../styled/StyledComponents";

import emailIcon from "../assets/message.png";
import { user } from "../helpers/user-reducer"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";


const UserForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const fetchAuthUser = async () => {
    const response = await axios
      .get("https://habit-tracker-mr.herokuapp.com/home/", { withCredentials: true })
      .catch((err) => {
        console.log("Not properly authenticated");
        dispatch(user.actions.setAuthenticated(false))
      dispatch(user.actions.setUser(null))
      });
    if (response && response.data) {
      console.log("user", response.data);
      dispatch(user.actions.setIsAuthenticated(true))
      dispatch(user.actions.setUser(response.data))
      history.push("/home")
  }
}
  const redirecttoGoogle = async () => {
    let timer= null
    const googleLoginUrl = "https://habit-tracker-mr.herokuapp.com/auth/google/";
    const newWindow = window.open(
      googleLoginUrl,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(()=>{
        if (newWindow.closed){
          console.log('authenticated')
          fetchAuthUser()
          if (timer) clearInterval(timer)
        }
      },500)
    }
  };

  return (
    <MainWrapper>
      <BorderStyle></BorderStyle>
      <Title>21|90</Title>
      <Subtitle>Habits Maker</Subtitle>
      <FormWrapper>
        <GoogleButton
          style={{ backgroundColor: "#fff", color: "#737373" }}
          onClick={redirecttoGoogle}
        />
        <Link to={"/user/new/signup"} style={{ textDecoration: "none" }}>
          <Wrapper>
            <GoogleIcon src={emailIcon} />
            <EmailButton type="submit">Sign in with Email</EmailButton>
          </Wrapper>
        </Link>
      </FormWrapper>
    </MainWrapper>
  );
};
export default UserForm;
