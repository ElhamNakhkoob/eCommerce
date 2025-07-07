import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";
import validateBody from "../middleware/validateSchema.js";
import productSchema from "../schemas/productSchema.js";

const productsRouter = Router();

productsRouter
  .route("/")
  .get(getAllProducts)
  .post(validateBody(productSchema), createProduct);

productsRouter
  .route("/:id")
  .get(getProductById)
  .put(validateBody(productSchema), updateProduct)
  .delete(deleteProduct);

export default productsRouter;
