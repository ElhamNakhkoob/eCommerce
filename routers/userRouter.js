import {Router} from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../controllers/userControllers.js";
import validateBody from "../middleware/validateSchema.js";
import userSchema from "../schemas/userSchema.js";

const usersRouter = Router();

usersRouter.route("/").get(getAllUsers).post(validateBody(userSchema), createUser);

usersRouter.route("/:id").get(getUserById).put(validateBody(userSchema), updateUser).delete(deleteUser);

export default usersRouter;