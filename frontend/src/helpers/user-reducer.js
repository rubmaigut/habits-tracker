import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    username: null,
    errors: null,
    isAuthenticated:false
  },
  reducers: {
    setUser: (store, action)=>{
      store.username = action.payload.username
      store.accessToken = action.payload.accessToken
    },
    setIsAuthenticated :(store, action)=>{
      store.isAuthenticated = action.payload
    },
    clearState: (store, action) => {
      store.username = null
      store.accessToken = null
    }
  },

});
export default user;
