import { Router } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";
import validateBody from "../middleware/validateSchema.js";
import categorySchema from "../schemas/categorySchema.js";

const categoriesRouter = Router();

categoriesRouter
  .route("/")
  .get(getAllCategories)
  .post(validateBody(categorySchema), createCategory);

categoriesRouter
  .route("/:id")
  .get(getCategoryById)
  .put(validateBody(categorySchema), updateCategory)
  .delete(deleteCategory);

export default categoriesRouter;
