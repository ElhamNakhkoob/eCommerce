import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required!"],
      maxLength: [50, "Category name cannot exceed 50 characters"],
    },
  },
  { timestamps: true }
);

export default model("Category", categorySchema);
