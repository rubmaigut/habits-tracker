import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "../styled/material-UI";
import Avatar from "@material-ui/core/Avatar";

import {
  MainWrapper,
  BorderStyle,
  FormWrapper,
  GoogleButton,
  GoogleIcon,
  EmailButton,
  Wrapper,
  Title,
  Subtitle
} from "../styled/StyledComponents";

import googleIcon from "../assets/google-symbol.png";
import emailIcon from "../assets/message.png";

const UserForm = () => {
  const classes = useStyles();

  return (
    <MainWrapper>
      <BorderStyle></BorderStyle>
        <Title>21|90</Title>
        <Subtitle>Habits Maker</Subtitle>
      <FormWrapper>
        <GoogleButton type="submit">
          <GoogleIcon src={googleIcon} />
          Sign in with Google
        </GoogleButton>
        <Wrapper>
          <Link to={"/user/new/signup"} style={{ textDecoration: "none" }}>
            <EmailButton type="submit">
              <GoogleIcon src={emailIcon} />
              Sign in with Email
            </EmailButton>
          </Link>
        </Wrapper>
      </FormWrapper>
    </MainWrapper>
  );
};
export default UserForm;
