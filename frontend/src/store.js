import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./reducers/productListSlice.js";
import productDetailsReducer from "./reducers/productDetailsSlice.js";

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
  },
});

export default store;
