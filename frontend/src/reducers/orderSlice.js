import { createSlice } from "@reduxjs/toolkit";

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState: {},
  reducers: {
    createOrderRequest: (state) => {
      state.loading = true;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.order = action.payload;
    },
    createOrderFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const createOrderActions = createOrderSlice.actions;

export const createOrderReducer = createOrderSlice.reducer;

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: { order: { shippingAddress: {}, orderItems: [], user: {} } },
  reducers: {
    orderDetailsRequest: (state) => {
      state.loading = true;
    },
    orderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    orderDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const orderDetailsActions = orderDetailsSlice.actions;

export const orderDetailsReducer = orderDetailsSlice.reducer;

const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: { payment: {} },
  reducers: {
    orderPayRequest: (state) => {
      state.payment.loading = true;
    },
    orderPaySuccess: (state) => {
      state.payment.loading = false;
      state.payment.success = true;
    },
    orderPayFail: (state, action) => {
      state.payment.loading = false;
      state.payment.error = action.payload;
    },
    orderPayReset: (state) => {
      state.payment = {};
    },
  },
});

export const orderPayActions = orderPaySlice.actions;

export const orderPayReducer = orderPaySlice.reducer;

const userOrdersListSlice = createSlice({
  name: "userOrdersList",
  initialState: { orders: [] },
  reducers: {
    userOrdersListRequest: (state) => {
      state.loading = true;
    },
    userOrdersListSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    userOrdersListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    userOrdersListReset: (state) => {
      state.orders = [];
    },
  },
});

export const userOrdersListActions = userOrdersListSlice.actions;

export const userOrdersListReducer = userOrdersListSlice.reducer;
