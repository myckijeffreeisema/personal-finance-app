import type { Pool } from "pg";
import { TRANSACTION_SQL } from "../config/sql/transaction.sql.js";

export type TransactionType = "entry" | "exit";
export type TransactionOrder = "lastIn" | "firstIn" | "bigger" | "smaller";

const transactionOrderArg = {
    lastIn: "created_at DESC",
    firstIn: "created_at ASC",
    bigger: "amount DESC",
    smaller: "amount ASC",
}

export type Transaction = {
    id: string;
    userId: string;
    name: string;
    amount: number;
    type: TransactionType;
    createdAt: string;
}

export type TransactionList = {
    transactions: Transaction[];
    totalItems: number;
    totalPages: number;
}

type TransactionRow = {
    id: string;
    user_id: string;
    name: string;
    amount: number;
    type: TransactionType;
    created_at: string;
}

export type Balance = {
    type: TransactionType;
    total: number;
}

export type BalanceInfo = {
    balance: Balance[];
}


/**
 * Faz o parse do objeto retorna do banco
 * @param
 * @returns 
 */
export function parseToTransaction(row: TransactionRow): Transaction {
    return {
        id: row.id,
        name: row.name,
        type: row.type,
        userId: row.user_id,
        createdAt: row.created_at,
        amount: Number(row.amount)
    }
}

export const makeTransactionModel = (pool: Pool) => {
    return {
        /**
         * Salva uma transação no banco de dados
         * @param transaction 
         */
        async store(transaction: Transaction): Promise<void> {
            const sql = TRANSACTION_SQL.INSERT;
            await pool.query(sql, [
                transaction.id,
                transaction.userId,
                transaction.name,
                transaction.amount,
                transaction.type,
                transaction.createdAt
            ]);
        },

        /**
         * Atualiza os dados de uma transação salva
         * @param transaction 
         */
        async update(transaction: Transaction): Promise<void> {
            const sql = TRANSACTION_SQL.UPDATE;
            await pool.query(sql, [
                transaction.name,
                transaction.amount,
                transaction.type,
                transaction.id,
                transaction.userId,
            ])
        },

        /**
         * Busca uma transação no banco pelo id
         * @param id 
         * @returns 
         */
        async getById(id: string, userId: string): Promise<Transaction | null> {
            const sql = TRANSACTION_SQL.GET_BY_ID;
            const result = await pool.query(sql, [id, userId]);
            if (result && result.rows.length > 0) {
                return parseToTransaction(result.rows[0]);
            }
            return null;
        },

        /**
         * Lista as transactions salvas no banco de dados
         * @param userId 
         * @param page 
         * @param size 
         * @returns 
         */
        async getAll(userId: string, page: number = 1, size: number = 10, type: TransactionType | null = null, order: TransactionOrder | null = "lastIn"): Promise<TransactionList> {
            const transactionType = type;
            const hasType = type !== null;

            const orderArg = (order as TransactionOrder) ?? "lastIn";


            const countSql = hasType ? TRANSACTION_SQL.COUNT_FILTERED : TRANSACTION_SQL.COUNT;
            const countBind = hasType ? [userId, transactionType] : [userId];

            const { total } = (await pool.query(countSql, countBind)).rows[0];
            const totalPages = Math.ceil(Number(total) / size) || 1;
            const offset = (page - 1) * size;

            const sql = hasType ? TRANSACTION_SQL.FILTERED_PAGINATED_LIST(transactionOrderArg[orderArg]) : TRANSACTION_SQL.PAGINATED_LIST(transactionOrderArg[orderArg]);
            const bind = hasType ? [userId, transactionType, size, offset] : [userId, size, offset];
            const result = await pool.query(sql, bind);
            
            const transactions = result.rows.map((t) => parseToTransaction(t));
            return { transactions: transactions, totalItems: Number(total), totalPages: totalPages };
        },

        /**
         * Deleta uma transação  no banco de dados
         * @param id 
         * @param userId 
         */
        async delete(id: string, userId: string): Promise<void> {
            const sql = TRANSACTION_SQL.DELETE;
            await pool.query(sql, [id, userId]);
        },

        /**
         * Busca a soma total de valores das transações por tipo
         * @param userId 
         * @returns 
         */
        async getBalances(userId: string): Promise<BalanceInfo>{
            const sql = TRANSACTION_SQL.GROUP_AMOUNT_BY_TYPE;
            const result = await pool.query(sql, [userId]);
            return { balance: result.rows };
        }
    }
}

export type TransactionModel = ReturnType<typeof makeTransactionModel>