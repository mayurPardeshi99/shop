import axios from "axios";
import { cartActions } from "../reducers/cartSlice";

//Cart related actions creator Thunk
export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch(
      cartActions.cartAddItem({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      })
    );

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    dispatch(cartActions.cartRemoveItem(id));

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    dispatch(cartActions.cartSaveShippingAddress(data));

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  };
};

export const savePaymentMethod = (data) => {
  return (dispatch) => {
    dispatch(cartActions.cartSavePaymentMethod(data));
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
};
