import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "@reduxjs/toolkit";
import { user } from "./helpers/user-reducer";

import UserForm from "./components/UserForm";
import SignUp from "./components/UserForm-Signup"
import LoginSuccess from "./components/LoginSuccess";
import Home from "./components/Home";

const reducer = combineReducers({
  user: user.reducer,
});

const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <main>
      <Switch>
        <Route exact path="/">
        <UserForm/>
        </Route>
        <Route exact path="/login/success">
          <LoginSuccess/>
        </Route>
        <Route exact path="/user/new/signup">
          <SignUp/>
        </Route>
        <Route exact path="/home">
        <Home/>
        </Route>
      </Switch>
      </main>
      </BrowserRouter>
    </Provider>
  );
};
export default App;
