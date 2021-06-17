import React from "react";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { useStyles } from "../styled/material-UI";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {
  MainWrapper,
  BorderStyle,
  FormWrapper,
} from "../styled/StyledComponents";


const SignUp = () => {
  const classes = useStyles();

  return (
    <MainWrapper>
      <BorderStyle></BorderStyle>
      <FormWrapper>
        <Avatar className={classes.avatar}></Avatar>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            SIGN IN
          </Button>

        <Link to={"/"}>
          Back
        </Link>
        </form>
      </FormWrapper>
    </MainWrapper>
  );
};
export default SignUp;
