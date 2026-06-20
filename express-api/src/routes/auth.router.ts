import express from "express";
import { validate } from "../middlewares/validator.middleware.js";
import { userLoginSchema } from "../schemas/auth.schema.js";
import { makeAuthService } from "../services/auth.service.js";
import { makeUserModel } from "../models/user.model.js";
import { makeAuthController } from "../controllers/auth.controller.js";
import { pool } from "../init.js";

const authRouter = express.Router();

const userModel = makeUserModel(pool);
const authService = makeAuthService(userModel);
const authController = makeAuthController(authService);

// Rota de cadastro de usuários
authRouter.post("/login", validate(userLoginSchema), authController.loginUser);

export default authRouter;