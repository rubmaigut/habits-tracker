import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "@reduxjs/toolkit";
import { user } from "./helpers/user-reducer";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import Routes from "./Routes";
import { loadState, saveState } from "./helpers/local-storage";

const persistedState = loadState();

const reducer = combineReducers({
  user: user.reducer,
});

const store = createStore(reducer, persistedState);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </MuiPickersUtilsProvider>
  );
};
export default App;
