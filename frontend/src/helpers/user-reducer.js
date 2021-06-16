import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    username: null,
    errors: null,
  },
  reducers: {
    setUser: (store, action)=>{
      store.username = action.payload.username
      store.accessToken = action.payload.accessToken
    },
    clearState: (store, action) => {
      store.username = null
      store.accessToken = null
    }
  },

});
export default user;
