import { isValidObjectId } from "mongoose";
import Category from "../models/categoryModel.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid category ID", { cause: 400 });
  }

  const category = await Category.findById(id);
  if (!category) {
    throw new Error("Category not found", { cause: 404 });
  }

  res.json(category);
};

export const createCategory = async (req, res) => {
  const { sanitizedBody } = req;
  const category = await Category.create(sanitizedBody);
  res.status(201).json(category);
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { sanitizedBody } = req;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid category ID", { cause: 400 });
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, sanitizedBody, {
    new: true,
  });

  if (!updatedCategory) {
    throw new Error("Category not found", { cause: 404 });
  }

  res.json(updatedCategory);
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    throw new Error("Invalid category ID", { cause: 400 });
  }

  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory) {
    throw new Error("Category not found", { cause: 404 });
  }

  res.json({ message: "Category deleted successfully" });
};
