import { Router } from "express";
import {
  getAllOrders,
  getOrderByID,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderControllers.js";
import validateBody from "../middleware/validateSchema.js";
import orderSchema from "../schemas/orderSchema.js";

const orderRouter = Router();

orderRouter
  .route("/")
  .get(getAllOrders)
  .post(validateBody(orderSchema), createOrder);

orderRouter
  .route("/:id")
  .get(getOrderByID)
  .put(validateBody(orderSchema), updateOrder)
  .delete(deleteOrder);

export default orderRouter;
