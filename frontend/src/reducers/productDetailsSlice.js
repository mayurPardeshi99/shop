import { createSlice } from "@reduxjs/toolkit";

const initialProductDetailsState = { product: { reviews: [] } };

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: initialProductDetailsState,
  reducers: {
    productDetailsRequest: (state) => {
      state.loading = true;
      state.product = initialProductDetailsState;
    },
    productDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    productDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const productDetailsActions = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
