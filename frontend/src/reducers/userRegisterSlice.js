import { createSlice } from "@reduxjs/toolkit";

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: {},
  reducers: {
    userRegisterRequest: (state) => {
      state.loading = true;
    },
    userRegisterSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    userRegisterFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userRegisterReducerActions = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
