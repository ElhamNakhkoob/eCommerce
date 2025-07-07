import { Schema, model } from "mongoose";

const productSubSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, "Product ID is required!"],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required!"],
  },
});

const orderSchema = new Schema(
  {
    userId: {
      type: Number,
      required: [true, "User ID is required!"],
    },
    products: [productSubSchema],
    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Order", orderSchema);
