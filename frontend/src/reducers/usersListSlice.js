import { createSlice } from "@reduxjs/toolkit";

const usersListSlice = createSlice({
  name: "usersList",
  initialState: { users: [] },
  reducers: {
    usersListRequest: (state) => {
      state.loading = true;
    },
    usersListSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    usersListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    usersListReset: (state, action) => {
      state.users = [];
    },
  },
});

export const usersListReducerActions = usersListSlice.actions;

export default usersListSlice.reducer;
