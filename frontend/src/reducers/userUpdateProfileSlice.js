import { createSlice } from "@reduxjs/toolkit";

const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: { updateUserState: {} },
  reducers: {
    userUpdateProfileRequest: (state) => {
      state.updateUserState.loading = true;
    },
    userUpdateProfileSuccess: (state, action) => {
      state.updateUserState.loading = false;
      state.updateUserState.success = true;
      state.updateUserState.userInfo = action.payload;
    },
    userUpdateProfileFail: (state, action) => {
      state.updateUserState.loading = false;
      state.updateUserState.error = action.payload;
    },
    userUpdateProfileReset: (state) => {
      state.updateUserState = {};
    },
  },
});

export const userUpdateProfileReducerActions = userUpdateProfileSlice.actions;

export default userUpdateProfileSlice.reducer;
