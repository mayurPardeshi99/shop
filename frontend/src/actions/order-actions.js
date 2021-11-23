import axios from "axios";
import {
  createOrderActions,
  orderDetailsActions,
  orderPayActions,
  userOrdersListActions,
} from "../reducers/orderSlice";

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

      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      console.log(data);
      dispatch(orderPayActions.orderPaySuccess());
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(orderPayActions.orderPayFail(errorMessage));
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
