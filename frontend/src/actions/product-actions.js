import { productListActions } from "../reducers/productListSlice";
import { productDetailsActions } from "../reducers/productDetailsSlice";
import { productDeleteReducerActions } from "../reducers/productDeleteSlice";
import { productCreateReducerActions } from "../reducers/productCreateSlice";
import { productUpdateReducerActions } from "../reducers/productUpdateSlice";
import axios from "axios";

//Products related actions creator Thunk
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

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(productDeleteReducerActions.productDeleteRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.delete(`/api/products/${id}`, config);
      dispatch(productDeleteReducerActions.productDeleteSuccess());
      dispatch(listProducts());
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(productDeleteReducerActions.productDeleteFail(errorMessage));
    }
  };
};

export const createProduct = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(productCreateReducerActions.productCreateRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post("/api/products/", {}, config);
      dispatch(productCreateReducerActions.productCreateSuccess(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(productCreateReducerActions.productCreateFail(errorMessage));
    }
  };
};

export const updateProduct = (product) => {
  return async (dispatch, getState) => {
    try {
      dispatch(productUpdateReducerActions.productUpdateRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/products/${product._id}`,
        product,
        config
      );
      dispatch(productUpdateReducerActions.productUpdateSuccess(data));
      dispatch(productDetailsActions.productDetailsSuccess(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(productUpdateReducerActions.productUpdateFail(errorMessage));
    }
  };
};
