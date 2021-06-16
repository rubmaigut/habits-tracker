import React from "react";
import { Link } from "react-router-dom";

import { useStyles } from "../styled/material-UI";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import {
  MainWrapper,
  BorderStyle,
  FormWrapper,
} from "../styled/StyledComponents";

const UserForm = () => {
  const classes = useStyles();

  return (
    <MainWrapper>
      <BorderStyle></BorderStyle>
      <FormWrapper>

        <Avatar className={classes.avatar}></Avatar>

        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <Typography component="h1" variant="h6">
        Sign in with Google or your email
        </Typography>
        <Typography component="h1" variant="h5">
        Sign in with Email
        </Typography>

        <Link to={"/user/new/signup"}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {" "}
            SIGN IN
          </Button>
        </Link>
        
      </FormWrapper>
    </MainWrapper>
  );
};
export default UserForm;
