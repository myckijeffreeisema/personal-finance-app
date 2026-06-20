import { TRANSACTION_RESPONSE_CODE } from "../codes/transaction.code.js";
import { APIError } from "../exception.js";
import { createTransactionObject } from "../helpers/transaction.helper.js";
import type {
  Balance,
  BalanceInfo,
  Transaction,
  TransactionList,
  TransactionModel,
  TransactionOrder,
  TransactionType,
} from "../models/transaction.model.js";
import type {
  CreateTransactionSchema,
  UpdateTransactionSchema,
} from "../schemas/transaction.schema.js";

export const makeTransactionService = (transactionModel: TransactionModel) => {
  return {
    /**
     * Salva uma nova transação no banco de dados
     * @param userId
     * @param data
     */
    async create(
      userId: string,
      data: CreateTransactionSchema,
    ): Promise<Transaction> {
      const transaction = createTransactionObject(data, userId);
      await transactionModel.store(transaction);
      return transaction;
    },

    /**
     * Atualiza os dados de uma transação salva no banco de dados
     * @param id
     * @param userId
     * @param data
     */
    async update(
      id: string,
      userId: string,
      data: UpdateTransactionSchema,
    ): Promise<Transaction> {
      const savedTransaction = await transactionModel.getById(id, userId);
      if (!savedTransaction)
        throw new APIError(TRANSACTION_RESPONSE_CODE.ERROR.NOT_FOUND, 404);
      const { name, amount, type } = data;
      const transaction = { ...savedTransaction, name, amount, type };
      await transactionModel.update(transaction);
      return transaction;
    },

    /**
     * Busca uma transação no banco de dados
     * @param id
     * @param userId
     * @returns
     */
    async getById(id: string, userId: string): Promise<Transaction> {
      const savedTransaction = await transactionModel.getById(id, userId);
      if (!savedTransaction)
        throw new APIError(TRANSACTION_RESPONSE_CODE.ERROR.NOT_FOUND, 404);
      return savedTransaction;
    },

    /**
     * Lista as transações salvas no banco de forma paginada
     * @param userId
     * @param page
     * @param size
     * @param type
     */
    async list(
      userId: string,
      page: number = 1,
      size: number = 10,
      type: TransactionType | null = null,
      order: TransactionOrder | null = "lastIn",
    ): Promise<TransactionList> {
      return await transactionModel.getAll(userId, page, size, type, order);
    },

    /**
     * Deleta uma transação salva no banco de dados
     * @param id
     * @param userId
     */
    async delete(id: string, userId: string): Promise<void> {
      const transaction = await transactionModel.getById(id, userId);
      if (!transaction)
        throw new APIError(TRANSACTION_RESPONSE_CODE.ERROR.NOT_FOUND, 404);
      await transactionModel.delete(id, userId);
    },

    /**
     * Busca a soma total de valores de entradas e saídas de transações
     * @param userId
     * @returns
     */
    async getBalance(userId: string): Promise<BalanceInfo> {
      const result = await transactionModel.getBalances(userId);
      const entry: Balance = {
        type: "entry",
        total: result.balance.find((r) => r.type === "entry")?.total ?? 0,
      };
      const exit: Balance = {
        type: "exit",
        total: result.balance.find((r) => r.type === "exit")?.total ?? 0,
      };
      const balanceInfo: BalanceInfo = {
        balance: [entry, exit],
      };
      return balanceInfo;
    },
  };
};

export type TransactionService = ReturnType<typeof makeTransactionService>;
