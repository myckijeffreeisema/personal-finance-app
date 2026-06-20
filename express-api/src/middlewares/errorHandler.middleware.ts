import express from "express";
import { APIError } from "../exception.js";

export async function errorHandler(
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (process.env.APP_ENV === "dev") {
        console.log(error)
    }
    if (error instanceof APIError) {
        return res.status(error.status).json({
            code: error.code,
            status: error.status
        });
    }
    res.status(500).json({
        code: "internal_server_error",
        status: 500
    })
}