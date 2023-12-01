import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    token: null,
    logged: false,
  },
  reducers: {
    login: (state, action) => {
      const {user, token} = action.payload;
      state.user = user;
      state.token = token;
      state.logged = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.logged = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
