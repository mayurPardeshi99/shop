import { productListActions } from "../reducers/productListSlice.js";
import { productDetailsActions } from "../reducers/productDetailsSlice.js";
import axios from "axios";

export const listProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(productListActions.productListRequest());
      const { data } = await axios.get("/api/products");
      dispatch(productListActions.productListSuccess(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(productListActions.productListFail(errorMessage));
    }
  };
};

export const listProductDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch(productDetailsActions.productDetailsRequest());
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(productDetailsActions.productDetailsSuccess(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(productDetailsActions.productDetailsFail(errorMessage));
    }
  };
};
