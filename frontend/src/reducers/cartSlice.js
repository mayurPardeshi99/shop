import { createSlice } from "@reduxjs/toolkit";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialCartState = { cartItems: cartItemsFromStorage };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    cartAddItem: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    cartRemoveItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
