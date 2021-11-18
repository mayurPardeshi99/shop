import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialUserLoginState = { userInfo: userInfoFromStorage };

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: initialUserLoginState,
  reducers: {
    userLoginRequest: (state) => {
      state.loading = true;
    },
    userLoginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userLoginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.userInfo = null;
    },
  },
});

export const userLoginReducerActions = userLoginSlice.actions;

export default userLoginSlice.reducer;
