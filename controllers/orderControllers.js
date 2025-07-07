import { isValidObjectId } from "mongoose";

import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const getAllOrders = async (req, res) => {
  const orders = await Order.find();

  if (!orders) {
    throw new Error("No orders found", { cause: 404 });
  }
  return res.status(200).json(orders);
};

export const createOrder = async (req, res) => {
  const { userId, products } = req.sanitizedBody;

  const productPrice = await Promise.all(
    products.map((item) => Product.findById(item.productId).select("price"))
  );

  let total = 0;

  products.forEach((item, i) => {
    const product = productPrice[i];
    if (!product) throw new Error(`Product ${item.productId} not found`);
    total += product.price * item.quantity;
  });

  const newOrder = await Order.create({
    userId,
    products,
    total,
  });

  return res.status(201).json(newOrder);
};

export const getOrderByID = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid order id", { cause: 400 });
  }

  // const order = await Order.findById(id);

  const order = await Order.findById(id).populate(
    "products.productId",
    "name price"
  );

  if (!order) {
    throw new Error("Order not found", { cause: 404 });
  }
  return res.status(200).json(order);
};

export const updateOrder = async (req, res) => {
  const {
    params: { id },
  } = req;
  const { userId, products } = req.sanitizedBody;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid order id", { cause: 400 });
  }
  const existingOrder = await Order.findById(id);
  if (!existingOrder) {
    throw new Error("Order not found", { cause: 404 });
  }

  const productPrice = await Promise.all(
    products.map((item) => Product.findById(item.productId).select("price"))
  );

  let total = 0;

  products.forEach((item, i) => {
    const product = productPrice[i];
    if (!product) {
      throw new Error("Product not found", { cause: 404 });
    }
    total += product.price * item.quantity;
  });

  existingOrder.userId = userId;
  existingOrder.products = products;
  existingOrder.total = total;

  const updatedOrder = await existingOrder.save();

  return res.status(200).json(updatedOrder);
};

export const deleteOrder = async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid order id", { cause: 400 });
  }
  const order = await Order.findByIdAndDelete(id);

  if (!order) {
    throw new Error("Order not found", { cause: 404 });
  }
  return res.status(200).json({ message: "Order deleted successfully" });
};
