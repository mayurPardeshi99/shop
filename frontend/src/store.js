import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./reducers/productListSlice";
import productDetailsReducer from "./reducers/productDetailsSlice";
import cartReducer from "./reducers/cartSlice";
import userLoginReducer from "./reducers/userLoginSlice";
import userRegisterReducer from "./reducers/userRegisterSlice";
import userDetailsReducer from "./reducers/userDetailsSlice";
import userUpdateProfileReducer from "./reducers/userUpdateProfileSlice";
import {
  createOrderReducer,
  orderDetailsReducer,
  orderPayReducer,
  userOrdersListReducer,
} from "./reducers/orderSlice";
import usersListReducer from "./reducers/usersListSlice";
import userDeleteReducer from "./reducers/userDeleteSlice";
import updateUserReducer from "./reducers/updateUserSlice";

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userOrdersList: userOrdersListReducer,
    usersList: usersListReducer,
    userDelete: userDeleteReducer,
    updateUser: updateUserReducer,
    createOrder: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
  },
});

export default store;
