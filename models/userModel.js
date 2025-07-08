import {Schema, model} from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      maxLength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      maxlength: 15,
      select:false,
    },
  },
  {timestamps: true}
);

export default model("User", userSchema);