import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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


const UserForm = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const fetchAuthUser = async () => {
    const response = await axios
      .get("http://localhost:8080/home/", { withCredentials: true })
      .catch((err) => {
        dispatch(user.actions.setIsAuthenticated(false))
        dispatch(user.actions.setUser(null))
        history.push("/login/error")
      });
    if (response && response.data) {
      dispatch(user.actions.setIsAuthenticated(true))
      dispatch(user.actions.setUser(response.data))
      history.push("/home")
  }
}
  const redirectToGoogle = async () => {
    let timer= null
    const googleLoginUrl = "http://localhost:8080/auth/google/";
    const newWindow = window.open(
      googleLoginUrl,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(()=>{
        if (newWindow.closed){
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
          onClick={redirectToGoogle}
        />
        <Link to={"/user/signup"} style={{ textDecoration: "none" }}>
          <Wrapper>
            <GoogleIcon src={emailIcon} style={{width:"40px", height:"40px"}} />
            <EmailButton type="submit">Sign in with Email</EmailButton>
          </Wrapper>
        </Link>
      </FormWrapper>
    </MainWrapper>
  );
};
export default UserForm;
