import { createSlice } from "@reduxjs/toolkit";

const productTopRatedSlice = createSlice({
  name: "productTopRated",
  initialState: { products: [] },
  reducers: {
    productTopRatedRequest: (state) => {
      state.loading = true;
    },
    productTopRatedSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productTopRatedFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productTopRatedReducerActions = productTopRatedSlice.actions;

export default productTopRatedSlice.reducer;
