import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    userData: {},
  },
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = Object.assign({}, action.payload.userData);
    },

    logout: (state) => {
      state.status = false;
      state.userData = {};
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
