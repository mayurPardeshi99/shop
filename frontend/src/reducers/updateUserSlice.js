import { createSlice } from "@reduxjs/toolkit";

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: { user: {} },
  reducers: {
    updateUserRequest: (state) => {
      state.user.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.user.loading = false;
      state.user.success = true;
    },
    updateUserFail: (state, action) => {
      state.user.loading = false;
      state.user.error = action.payload;
    },
    updateUserReset: (state) => {
      state.user = {};
    },
  },
});

export const updateUserReducerActions = updateUserSlice.actions;

export default updateUserSlice.reducer;
