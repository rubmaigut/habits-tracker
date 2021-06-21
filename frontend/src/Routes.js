import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import UserForm from "./screens/UserForm";
import SignUp from "./screens/UserFormSignup";
import LoginSuccess from "./screens/LoginSuccess";
import LoginError from "./screens/LoginError";
import Home from "./screens/Home";
import AddHabits from "./screens/AddHabit";
import CustomHabit from "./screens/CustomHabit";
import { useSelector } from "react-redux";

const Routes = () => {
  const {
    user: { isAuthenticated },
  } = useSelector((store) => store);

  return (
    <BrowserRouter>
      <main>
        {isAuthenticated ? (
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/add-habits">
              <AddHabits/>
            </Route>
            <Route exact path="/custom-habits">
              <CustomHabit/>
            </Route>
            <Route exact path="/custom-habits/edit/:id">
              <CustomHabit/>
            </Route>
            <Route exact path="/habit/update/:id">
              <CustomHabit/>
            </Route>
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/">
              <UserForm />
            </Route>
            <Route exact path="/login/success">
              <LoginSuccess />
            </Route>
            <Route exact path="/login/error">
              <LoginError />
            </Route>
            <Route exact path="/user/signup">
              <SignUp />
            </Route>
            <Redirect to="/" />
          </Switch>
        )}
      </main>
    </BrowserRouter>
  );
};
export default Routes;
