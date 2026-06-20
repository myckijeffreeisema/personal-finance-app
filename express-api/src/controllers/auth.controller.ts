import express from "express";
import type { UserLoginSchema } from "../schemas/auth.schema.js";
import { sendResponse } from "../helpers/response.helper.js";
import { AUTH_RESPONSE_CODE } from "../codes/auth.code.js";
import type { AuthService } from "../services/auth.service.js";

export const makeAuthController = (authService: AuthService) => {
    return {
        /**
         * Controller de autentiacação de usuários
         * @param req 
         * @param res 
         * @returns 
         */
        async loginUser(req: express.Request, res: express.Response) {
            const data = req.body as UserLoginSchema;
            const authDetail = await authService.loginUser(data);
            return sendResponse(res, AUTH_RESPONSE_CODE.SUCCESS.AUTHENTICATED, 200, authDetail);
        }
    }
}
export type AuthController = ReturnType<typeof makeAuthController>;
