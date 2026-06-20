import express from "express";
import z from "zod";

export function validate(schema: z.ZodObject) {
    return async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        try {
            const data = req.body;
            await z.parseAsync(schema, data);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const iss = error.issues.map(err => {
                    return {
                        field: err.path[0],
                        error: err.message
                    }
                });
                return res.status(422).json({
                    code: "validation_error",
                    status: 422,
                    detail: iss
                })
            }
            throw new Error("Erro ao validar os dados requisição.");
        }
    }
}