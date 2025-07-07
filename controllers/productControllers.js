import { isValidObjectId } from "mongoose";
import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  const { categoryId } = req.query;

  const filter = {};
  if (categoryId) {
    if (!isValidObjectId(categoryId)) {
      throw new Error("Invalid categoryId", { cause: 400 });
    }
    filter.categoryId = categoryId;
  }

  const products = await Product.find(filter);
  res.json(products);
};

export const getProductById = async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid product ID", { cause: 400 });
  }

  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found", { cause: 404 });
  }

  res.json(product);
};

export const createProduct = async (req, res) => {
  const { sanitizedBody } = req;
  const { categoryId } = sanitizedBody;

  if (!isValidObjectId(categoryId)) {
    throw new Error("Invalid category ID", { cause: 400 });
  }

  const product = await Product.create(sanitizedBody);
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const {
    params: { id },
    sanitizedBody,
  } = req;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid product ID", { cause: 400 });
  }

  if (sanitizedBody.categoryId && !isValidObjectId(sanitizedBody.categoryId)) {
    throw new Error("Invalid category ID", { cause: 400 });
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, sanitizedBody, {
    new: true,
  });

  if (!updatedProduct) {
    throw new Error("Product not found", { cause: 404 });
  }

  res.json(updatedProduct);
};

export const deleteProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid product ID", { cause: 400 });
  }

  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct) {
    throw new Error("Product not found", { cause: 404 });
  }

  res.json({ message: "Product deleted successfully" });
};
