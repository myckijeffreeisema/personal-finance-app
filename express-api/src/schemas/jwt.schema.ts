import { z } from "zod";

export const tokenDetailSchema = z.object({
    token: z.string(),
    expiresIn: z.number(),
    expiresAt: z.number()
});
export type TokenDetailSchema = z.infer<typeof tokenDetailSchema>;


export const decodedTokenDetailSchema = z.object({
    userId: z.string(),
    jti: z.string()
});

export type DecodedTokenDetailSchema = z.infer<typeof decodedTokenDetailSchema>