import { createSlice } from "@reduxjs/toolkit";

const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: { updateProductState: { product: {} } },
  reducers: {
    productUpdateRequest: (state) => {
      state.updateProductState.loading = true;
    },
    productUpdateSuccess: (state, action) => {
      state.updateProductState.loading = false;
      state.updateProductState.success = true;
      state.updateProductState.product = action.payload;
    },
    productUpdateFail: (state, action) => {
      state.updateProductState.loading = false;
      state.updateProductState.error = action.payload;
    },
    productUpdateReset: (state) => {
      state.updateProductState = { product: {} };
    },
  },
});

export const productUpdateReducerActions = productUpdateSlice.actions;

export default productUpdateSlice.reducer;
