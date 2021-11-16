import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./reducers/productListSlice";
import productDetailsReducer from "./reducers/productDetailsSlice";
import cartReducer from "./reducers/cartSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
});

export default store;
