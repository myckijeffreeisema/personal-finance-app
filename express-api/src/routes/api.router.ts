import express from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
import transactionRouter from "./transaction.router.js";
import rateLimit from "express-rate-limit";

const apiRouter = express.Router();

const apiLimitter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 500,
    message: {
        status: 429,
        message: 'Muitas requisições vindas deste IP. Tente novamente em 15 minutos.'
    }
});

const authLimitter = rateLimit({
    windowMs: 30 * 60 * 1000,
    limit: 10,
    message: {
        status: 429,
        message: 'Muitas requisições vindas deste IP. Tente novamente em 10 minutos.'
    }
});

apiRouter.use(apiLimitter, userRouter);
apiRouter.use("/auth", authLimitter, authRouter);
apiRouter.use(apiLimitter, transactionRouter);

export default apiRouter;