import { z } from "zod";

export const userRegistrationSchema = z.object({
    name: z.string("O nome é obrigatório.").min(1, "O nome precisa ter pelo menos dois caracteres."),
    email: z.email("Formato de email inválido."),
    password: z.string("A senha é obrigatória").min(8, "A senha precisa ter no mínimo três caracteres."),
});

export const userUpdateSchema = z.object({
    name: z.string("O nome é obrigatório.").min(1, "O nome precisa ter pelo menos dois caracteres.")
});

export const accountDetailSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.email(),
    createdAt: z.string()
});

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;
export type UserRegistrationSchema = z.infer<typeof userRegistrationSchema>;
export type AccountDetailSchema = z.infer<typeof accountDetailSchema>;