import { createSlice } from "@reduxjs/toolkit";

const productReviewCreateSlice = createSlice({
  name: "productReviewCreate",
  initialState: { createReviewState: {} },
  reducers: {
    productReviewCreateRequest: (state) => {
      state.createReviewState.loading = true;
    },
    productReviewCreateSuccess: (state) => {
      state.createReviewState.loading = false;
      state.createReviewState.success = true;
    },
    productReviewCreateFail: (state, action) => {
      state.createReviewState.loading = false;
      state.createReviewState.error = action.payload;
    },
    productReviewCreateReset: (state) => {
      state.createReviewState = {};
    },
  },
});

export const productReviewCreateReducerActions =
  productReviewCreateSlice.actions;

export default productReviewCreateSlice.reducer;
