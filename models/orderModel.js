import { Schema, model } from "mongoose";

const productSubSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required!"],
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required!"],
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
