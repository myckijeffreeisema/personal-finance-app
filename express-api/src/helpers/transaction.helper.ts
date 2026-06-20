import { randomUUID } from "node:crypto";
import type { Transaction } from "../models/transaction.model.js";
import type { CreateTransactionSchema } from "../schemas/transaction.schema.js";


/**
 * Cria o objeto transaction
 * @param data 
 * @param userId 
 * @returns 
 */
export function createTransactionObject(data: CreateTransactionSchema, userId: string): Transaction{
    const date = new Date();
    return {
        id: randomUUID(),
        userId: userId,
        name: data.name,
        amount: data.amount,
        type: data.type,
        createdAt: date.toISOString()
    }
}