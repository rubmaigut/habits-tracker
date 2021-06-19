import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useStyles } from "../styled/materialUI-UserForm";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import {
  MainWrapper,
  BorderStyle,
  FormWrapper,
} from "../styled/StyledComponents";

import { createUser } from "../helpers/Fetch-API"
import { user } from "../helpers/user-reducer"

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const accessToken = useSelector((store)=> store.user.accessToken)

  useEffect(() => {
    if (accessToken) {
      history.push("/home");
    }
  }, [accessToken]);

  const OnsubmitUser= async ()=>{
     const { userInfo, error400 }= await createUser(
       email,
       username,
       password
     )
     if (userInfo) {
       dispatch(user.actions.setUser(userInfo))
       dispatch(user.actions.setIsAuthenticated(true))
       history.push("/home")
       console.log(userInfo)
     }else{
       setError(error400)
       return error
     }
  }

  return (
    <MainWrapper>
      <BorderStyle></BorderStyle>
      <FormWrapper className={classes.form} noValidate>
        <Avatar></Avatar>
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
            onChange={(e)=> setUsername(e.target.value)}
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
            onChange={(e)=> setEmail(e.target.value)}
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
            onChange={(e)=> setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={OnsubmitUser}
          >
            SIGN IN
          </Button>

        <Link to={"/"}>
          Back
        </Link>
      </FormWrapper>
    </MainWrapper>
  );
};
export default SignUp;
