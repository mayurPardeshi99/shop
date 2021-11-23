import axios from "axios";
import { userLoginReducerActions } from "../reducers/userLoginSlice";
import { userRegisterReducerActions } from "../reducers/userRegisterSlice";
import { userDetailsReducerActions } from "../reducers/userDetailsSlice";
import { userUpdateProfileReducerActions } from "../reducers/userUpdateSlice";
import { userOrdersListActions } from "../reducers/orderSlice";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userLoginReducerActions.userLoginRequest());
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      dispatch(userLoginReducerActions.userLoginSuccess(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userLoginReducerActions.userLoginFail(errorMessage));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(userLoginReducerActions.userLogout());
    localStorage.removeItem("userInfo");
    dispatch(userDetailsReducerActions.userDetailsReset());
    dispatch(userOrdersListActions.userOrdersListReset());
  };
};

export const register = (name, email, password) => {
  return async (dispatch) => {
    try {
      dispatch(userRegisterReducerActions.userRegisterRequest());
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/users",
        { name, email, password },
        config
      );
      dispatch(userRegisterReducerActions.userRegisterSuccess(data));

      dispatch(userLoginReducerActions.userLoginSuccess(data));

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userRegisterReducerActions.userRegisterFail(errorMessage));
    }
  };
};

export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userDetailsReducerActions.userDetailsRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(`/api/users/${id}`, config);
      dispatch(userDetailsReducerActions.userDetailsSuccess(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(userDetailsReducerActions.userDetailsFail(errorMessage));
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch(userUpdateProfileReducerActions.userUpdateProfileRequest());

      const userLogin = getState().userLogin;
      const { userInfo } = userLogin;

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put("/api/users/profile", user, config);
      dispatch(userUpdateProfileReducerActions.userUpdateProfileSuccess(data));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch(
        userUpdateProfileReducerActions.userUpdateProfileFail(errorMessage)
      );
    }
  };
};
