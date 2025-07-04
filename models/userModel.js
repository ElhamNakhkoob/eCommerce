import {Schema, model} from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      mexLength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      mexlength: 15,
    },
  },
  {timestamps: true}
);

export default model("User", userSchema);