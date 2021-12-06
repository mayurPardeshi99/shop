import { createSlice } from "@reduxjs/toolkit";

const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: { createProductState: {} },
  reducers: {
    productCreateRequest: (state) => {
      state.createProductState.loading = true;
    },
    productCreateSuccess: (state, action) => {
      state.createProductState.loading = false;
      state.createProductState.success = true;
      state.createProductState.product = action.payload;
    },
    productCreateFail: (state, action) => {
      state.createProductState.loading = false;
      state.createProductState.error = action.payload;
    },
    productCreateReset: (state) => {
      state.createProductState = {};
    },
  },
});

export const productCreateReducerActions = productCreateSlice.actions;

export default productCreateSlice.reducer;
