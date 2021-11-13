import { createSlice } from "@reduxjs/toolkit";

const initialProductState = { products: [] };

const productListSlice = createSlice({
  name: "productList",
  initialState: initialProductState,
  reducers: {
    productListRequest: (state) => {
      state.loading = true;
      state.products = [];
    },
    productListSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    productListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productListActions = productListSlice.actions;

export default productListSlice.reducer;
