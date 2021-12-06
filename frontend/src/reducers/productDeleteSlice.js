import { createSlice } from "@reduxjs/toolkit";

const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: {},
  reducers: {
    productDeleteRequest: (state) => {
      state.loading = true;
    },
    productDeleteSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    productDeleteFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productDeleteReducerActions = productDeleteSlice.actions;

export default productDeleteSlice.reducer;
