import axios from "axios";
import { createOrderActions } from "../reducers/orderSlice";

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
