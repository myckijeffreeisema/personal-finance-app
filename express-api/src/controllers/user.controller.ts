import express from "express";
import { sendResponse } from "../helpers/response.helper.js";
import { USER_RESPONSE_CODE } from "../codes/user.code.js";
import type { UserService } from "../services/user.service.js";

export const makeUserController = (userService: UserService) => {
    return {
        /**
         * Controller de criação de usuáarios
         * @param req 
         * @param res 
         * @returns 
         */
        async create(req: express.Request, res: express.Response) {
            const data = req.body;
            await userService.create(data);
            return sendResponse(res, USER_RESPONSE_CODE.SUCCESS.CREATED, 201);
        },

        /**
         * Controller de atualização dos dados de usuáarios
         * @param req 
         * @param res 
         * @returns 
         */
        async update(req: express.Request, res: express.Response) {
            const data = req.body;
            const { userId } = req.tokenPayload;
            const user = await userService.update(userId, data);
            return sendResponse(res, USER_RESPONSE_CODE.SUCCESS.UPDATE, 200, user);
        },

        /**
         * Busca as informações do usuário
         * @param req 
         * @param res 
         * @returns 
         */
        async getInfo(req: express.Request, res: express.Response) {
            const { userId } = req.tokenPayload;
            const user = await userService.getInfo(userId);
            return sendResponse(res, USER_RESPONSE_CODE.SUCCESS.FOUND, 200, user);
        },

        /**
         * Controller para removeção de usuáarios
         * @param req 
         * @param res 
         * @returns 
         */
        async delete(req: express.Request, res: express.Response) {
            const { userId } = req.tokenPayload;
            await userService.delete(userId);
            return res.sendStatus(204);
        }
    }
}

export type UserController = ReturnType<typeof makeUserController>;