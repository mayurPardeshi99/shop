import Order from "../models/orderSchema.js";
import asyncHandler from "express-async-handler";

// @desc      Create new order
// @routes    POST /api/orders
// @access    Public
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    taxPrice,
    itemPrice,
    shippingPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order Items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      totalPrice,
      taxPrice,
      itemPrice,
      shippingPrice,
    });

    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});
