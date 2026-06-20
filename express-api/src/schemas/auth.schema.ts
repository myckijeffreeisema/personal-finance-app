import { z } from "zod";

export const userLoginSchema = z.object({
    email: z.email("Formato de email inválido."),
    password: z.string("A senha é obrigatória."),
});

export type UserLoginSchema = z.infer<typeof userLoginSchema>;


export const authDetailSchema = z.object({
    token: z.string(),
    expiresIn: z.number(),
    expiresAt: z.number()
});

export type AuthDetailSchema = z.infer<typeof authDetailSchema>;
