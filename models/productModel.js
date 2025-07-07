import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required!"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      maxLength: [500, "Description cannot exceed 500 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
      min: [0, "Price must be a positive number"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required!"],
    },
  },
  { timestamps: true }
);

export default model("Product", productSchema);
