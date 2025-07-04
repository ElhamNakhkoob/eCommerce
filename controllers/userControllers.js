import {isValidObjectId} from "mongoose";
import User from "../models/userModel.js";

export const getAllUsers = async(req, res) => {
  const users = await User.find();
  res.json(users);
};

export const getUserById = async(req, res) => {
  const{
    params: {id},
  } = req;
  if(!isValidObjectId(id)) {
    throw new Error("Invalid user ID", {cause: 400});
  }
  const user = await User.findById(id);
  if(!user) throw new Error("User not found", {cause: 400});

  res.json(user);
};

export const createUser = async(req, res) => {
  const {sanitizedBody} = req;

  const user = await User.create(sanitizedBody);
  res.status(201).json(user);
};

export const updateUser = async(req, res) => {
  const{
    sanitizedBody,
    params: {id},
  } = req;
  if(!isValidObjectId(id)){
    throw new Error ("Invalid id", {cause: 400});
  }
  const updatedUser = await User.findByIdAndUpdate(id, sanitizedBody, {new: true});
  if(!updatedUser) throw new Error("User not found", {cause: 404});
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const {
    params: { id },
  } = req;
  if(!isValidObjectId(id)) {
    throw new Error("Invalid id", {cause: 400});
  }
  const deletedUser = await User.findByIdAndDelete(id);
  if(!deletedUser) throw new Error("User not found", {cause: 404});
  res.json({message: "User deleted sucessfully"});
};