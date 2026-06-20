import express from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validator.middleware.js";
import { createTransactionSchema, updateTransactionSchema } from "../schemas/transaction.schema.js";
import { makeTransactionModel } from "../models/transaction.model.js";
import { pool } from "../init.js";
import { makeTransactionService } from "../services/transaction.service.js";
import { makeTransactionController } from "../controllers/transaction.controller.js";

const transactionRouter = express.Router();

const transactionModel = makeTransactionModel(pool);
const transactionService = makeTransactionService(transactionModel);
const transactionController = makeTransactionController(transactionService);

transactionRouter.post("/transactions", checkAuth, validate(createTransactionSchema), transactionController.create);
transactionRouter.get("/transactions", checkAuth, transactionController.list);
transactionRouter.get("/transactions/balance", checkAuth, transactionController.getBalances);


transactionRouter.delete("/transactions/:id", checkAuth, transactionController.delete);
transactionRouter.put("/transactions/:id", checkAuth, validate(updateTransactionSchema), transactionController.update);
transactionRouter.get("/transactions/:id", checkAuth, transactionController.getById);

export default transactionRouter;