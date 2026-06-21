import express from "express";
import { sendResponse } from "../helpers/response.helper.js";
import { TRANSACTION_RESPONSE_CODE } from "../codes/transaction.code.js";
import { APIError } from "../exception.js";
import type { TransactionService } from "../services/transaction.service.js";
import type {
  TransactionList,
  TransactionOrder,
  TransactionType,
} from "../models/transaction.model.js";

// Extrai o ID da requisição
function getTransactionId(req: express.Request): string {
  const id = req.params.id as string | undefined;
  if (!id) throw new APIError(TRANSACTION_RESPONSE_CODE.ERROR.ID_REQUIRED, 400);
  return id;
}

// Extrai o parâmetro de tipo da requisição
function getTransactionType(req: express.Request): TransactionType | null {
  const type = req.query.type as string | undefined;
  if (!type || type === "all") return null;
  const typeArgs = ["entry", "exit"];
  if (typeArgs.includes(type)) {
    return type as TransactionType;
  }
  throw new APIError(TRANSACTION_RESPONSE_CODE.ERROR.INVALID_PARAMS_TYPE, 400);
}

// Extrai o parâmetro de ordenação da requisição
function getTransactionOrder(req: express.Request): TransactionOrder | null {
  const order = req.query.order as string | undefined;
  if (!order) return null;
  const orderArgs = ["firstIn", "lastIn", "bigger", "smaller"];
  if (orderArgs.includes(order)) {
    return order as TransactionOrder;
  }
  throw new APIError(TRANSACTION_RESPONSE_CODE.ERROR.INVALID_PARAMS_ORDER, 400);
}

// Extrai os parâmetros de paginação da requisição
function getTransactionListParams(req: express.Request) {
  let queryPage = req.query.page as string | undefined;
  let querySize = req.query.size as string | undefined;

  const parsedPage = queryPage ? Number(queryPage) : 1;
  const parsedSize = querySize ? Number(querySize) : 10;

  let page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  let size = Number.isInteger(parsedSize) && parsedSize > 0 ? parsedSize : 10;

  if (size > 100) {
    size = 100;
  }
  return { page, size };
}

export const makeTransactionController = (
  transactionService: TransactionService,
) => {
  return {
    /**
     * Controller de criação de nova transação
     * @param req
     * @param res
     */
    async create(req: express.Request, res: express.Response) {
      const data = req.body;
      const { userId } = req.tokenPayload;
      const transaction = await transactionService.create(userId, data);
      return sendResponse(
        res,
        TRANSACTION_RESPONSE_CODE.SUCCESS.CREATED,
        201,
        transaction,
      );
    },

    /**
     * Controller de atualização dos dados de transação
     * @param req
     * @param res
     */
    async update(req: express.Request, res: express.Response) {
      const data = req.body;
      const { userId } = req.tokenPayload;
      const id = getTransactionId(req);
      const transaction = await transactionService.update(id, userId, data);
      return sendResponse(
        res,
        TRANSACTION_RESPONSE_CODE.SUCCESS.UPDATED,
        200,
        transaction,
      );
    },

    /**
     * Controller de busca de transação
     * @param req
     * @param res
     */
    async getById(req: express.Request, res: express.Response) {
      const { userId } = req.tokenPayload;
      const id = getTransactionId(req);
      const data = await transactionService.getById(id, userId);
      return sendResponse(
        res,
        TRANSACTION_RESPONSE_CODE.SUCCESS.FOUND,
        200,
        data,
      );
    },

    /**
     * Controller de listagem de transações
     * @param req
     * @param res
     */
    async list(req: express.Request, res: express.Response) {
      const { userId } = req.tokenPayload;
      let { page, size } = getTransactionListParams(req);
      page = page < 1 ? 1 : page;
      size = size < 1 ? 10 : size;
      const type = getTransactionType(req);
      const order = getTransactionOrder(req);
      let data: TransactionList;
      if (type) {
        data = await transactionService.list(userId, page, size, type, order);
      } else {
        data = await transactionService.list(userId, page, size, null, order);
      }

      return sendResponse(
        res,
        TRANSACTION_RESPONSE_CODE.SUCCESS.LIST,
        200,
        data,
      );
    },

    /**
     * Controller de deleção de transação
     * @param req
     * @param res
     */
    async delete(req: express.Request, res: express.Response) {
      const { userId } = req.tokenPayload;
      const id = getTransactionId(req);
      await transactionService.delete(id, userId);
      return res.sendStatus(204);
    },

    /**
     * Busca a soma total de valores de entradas e saídas de transações
     * @param req
     * @param res
     * @returns
     */
    async getBalances(req: express.Request, res: express.Response) {
      const { userId } = req.tokenPayload;
      const balance = await transactionService.getBalance(userId);
      return sendResponse(
        res,
        TRANSACTION_RESPONSE_CODE.SUCCESS.BALANCE_INFO,
        200,
        balance,
      );
    },
  };
};

export type TransactionController = ReturnType<
  typeof makeTransactionController
>;
