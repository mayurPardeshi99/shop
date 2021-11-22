import { createSlice } from "@reduxjs/toolkit";

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState: {},
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const createOrderActions = createOrderSlice.actions;

export const createOrderReducer = createOrderSlice.reducer;
