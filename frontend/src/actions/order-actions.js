import axios from "axios";
import {
  createOrderActions,
  orderDetailsActions,
  orderPayActions,
  userOrdersListActions,
  orderListActions,
  orderDeliverActions,
} from "../reducers/orderSlice";
import { cartActions } from "../reducers/cartSlice";

export const placeOrder = (order) => {
  return async (dispatch, getState) => {
    try {
      dispatch(createOrderActions.createOrderRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/orders", order, config);
      dispatch(createOrderActions.createOrderSuccess(data));
      dispatch(cartActions.cartReset());
      localStorage.removeItem("cartItems");
      dispatch(getUserOrdersList());
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(createOrderActions.createOrderFail(errorMessage));
    }
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderDetailsActions.orderDetailsRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/orders/${id}`, config);
      console.log(data);
      dispatch(orderDetailsActions.orderDetailsSuccess(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(orderDetailsActions.orderDetailsFail(errorMessage));
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderPayActions.orderPayRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
      dispatch(orderPayActions.orderPaySuccess());
      dispatch(getUserOrdersList());
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(orderPayActions.orderPayFail(errorMessage));
    }
  };
};

export const deliverOrder = (orderId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderDeliverActions.orderDeliverRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(`/api/orders/${orderId}/deliver`, {}, config);
      dispatch(orderDeliverActions.orderDeliverSuccess());
      dispatch(getUserOrdersList());
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(orderDeliverActions.orderDeliverFail(errorMessage));
    }
  };
};

export const getUserOrdersList = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(userOrdersListActions.userOrdersListRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/orders/myorders", config);
      dispatch(userOrdersListActions.userOrdersListSuccess(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userOrdersListActions.userOrdersListFail(errorMessage));
    }
  };
};

export const getOrderList = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(orderListActions.orderListRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get("/api/orders", config);
      dispatch(orderListActions.orderListSuccess(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(orderListActions.orderListFail(errorMessage));
    }
  };
};
