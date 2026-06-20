import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegistrationSchema, userUpdateSchema } from "../schemas/user.schema.js";
import { makeUserModel } from "../models/user.model.js";
import { pool } from "../init.js";
import { makeUserService } from "../services/user.service.js";
import { makeUserController } from "../controllers/user.controller.js";

const userRouter = express.Router();

const userModel = makeUserModel(pool);
const userService = makeUserService(userModel);
const userController = makeUserController(userService);

// Rota de cadastro de usuários
userRouter.post("/users", validate(userRegistrationSchema), userController.create);
userRouter.put("/users", checkAuth, validate(userUpdateSchema), userController.update);
userRouter.get("/users", checkAuth, userController.getInfo);
userRouter.delete("/users", checkAuth, userController.delete);

export default userRouter;