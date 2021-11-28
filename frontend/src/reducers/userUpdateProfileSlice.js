import { createSlice } from "@reduxjs/toolkit";

const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: {},
  reducers: {
    userUpdateProfileRequest: (state) => {
      state.loading = true;
    },
    userUpdateProfileSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
    },
    userUpdateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userUpdateProfileReducerActions = userUpdateProfileSlice.actions;

export default userUpdateProfileSlice.reducer;
