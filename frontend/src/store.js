import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./reducers/productListSlice";
import productDetailsReducer from "./reducers/productDetailsSlice";
import cartReducer from "./reducers/cartSlice";
import userLoginReducer from "./reducers/userLoginSlice";
import userRegisterReducer from "./reducers/userRegisterSlice";
import userDetailsReducer from "./reducers/userDetailsSlice";
import userUpdateProfileReducer from "./reducers/userUpdateSlice";
import {
  createOrderReducer,
  orderDetailsReducer,
  orderPayReducer,
  userOrdersListReducer,
} from "./reducers/orderSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    createOrder: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    userOrdersList: userOrdersListReducer,
  },
});

export default store;
