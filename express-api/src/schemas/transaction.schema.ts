import { z } from "zod";


export const createTransactionSchema = z.object({
    name: z.string("O nome da transação é obrigatório."),
    amount: z.number("O preço precisa ser um valor válido.").int("O valor deve ser informado em centavos, sem casas decimais.").positive("O preço não pode ser negativo."),
    type: z.enum(["entry", "exit"], {error: "Tipo de transação inválido."})
});

export const updateTransactionSchema = z.object({
    name: z.string("O nome da transação é obrigatório."),
    amount: z.number("O preço precisa ser um valor válido.").int("O valor deve ser informado em centavos, sem casas decimais.").positive("O preço não pode ser negativo."),
    type: z.enum(["entry", "exit"], {error: "Tipo de transação inválido."})
});


export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>
export type UpdateTransactionSchema = z.infer<typeof updateTransactionSchema>