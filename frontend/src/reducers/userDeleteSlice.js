import { createSlice } from "@reduxjs/toolkit";

const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState: {},
  reducers: {
    userDeleteRequest: (state) => {
      state.loading = true;
    },
    userDeleteSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    userDeleteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const userDeleteReducerActions = userDeleteSlice.actions;

export default userDeleteSlice.reducer;
