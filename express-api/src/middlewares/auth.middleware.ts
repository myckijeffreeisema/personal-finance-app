import express from "express";
import { APIError } from "../exception.js";
import { JWT_RESPONSE_CODE } from "../codes/jwt.code.js";
import { decodeJwtToken } from "../security/jwt.security.js";


/**
 * Middleware de autenticação
 * @param req 
 * @param res 
 * @param next 
 */
export async function checkAuth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    // Extrai o token do header
    const token = req.headers.authorization;

    if (!token) throw new APIError(JWT_RESPONSE_CODE.ERROR.REQUIRED, 401);

    // Verifica o formato do token
    if (!token.startsWith("Bearer ")) {
        throw new APIError(JWT_RESPONSE_CODE.ERROR.INVALID_FORMAT, 401);
    }

    // Tokem sem o Bearer 
    const formatedToken = token.slice(7);

    // Decodifica o token
    const { userId, jti } = await decodeJwtToken(formatedToken);
    req.tokenPayload = { userId, jti };

    next();
}