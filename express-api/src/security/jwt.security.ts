import { errors, SignJWT, jwtVerify } from "jose";

import "dotenv/config";
import type { User } from "../models/user.model.js";
import { randomUUID } from "node:crypto";
import type {
  DecodedTokenDetailSchema,
  TokenDetailSchema,
} from "../schemas/jwt.schema.js";
import { APIError } from "../exception.js";
import { JWT_RESPONSE_CODE } from "../codes/jwt.code.js";

// Secret key para assinar os tokens
const secretKeyEnv: string | undefined = process.env.SECRET_KEY;
if (!secretKeyEnv) {
  throw new Error("A chave secreta para assinatura de token é obrigatória.");
}

if (secretKeyEnv.length < 20) {
  throw new Error("A chave secreta precisa ter mais de 20 caracteres.");
}
const secretKey = new TextEncoder().encode(secretKeyEnv);

/**
 * Cria um token JWT
 * @param user
 * @returns
 */
export async function createJwtToken(user: User): Promise<TokenDetailSchema> {
  const jti = randomUUID();

  const expiresInSeconds = 60 * 60;
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;

  const signer = new SignJWT();
  signer.setSubject(String(user.id));
  signer.setJti(jti);
  signer.setExpirationTime(expiresAt);
  signer.setProtectedHeader({ alg: "HS256" });
  return {
    token: await signer.sign(secretKey),
    expiresIn: expiresInSeconds,
    expiresAt: expiresAt,
  };
}

/**
 * Decodifica o token jwt do usuário
 * @param token
 * @returns
 */
export async function decodeJwtToken(
  token: string,
): Promise<DecodedTokenDetailSchema> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    const { sub, jti, tokenVersion } = payload;
    if (!sub || !jti) {
      throw new APIError(JWT_RESPONSE_CODE.ERROR.INVALID, 401);
    }
    return { userId: sub, jti: jti };
  } catch (error) {
    if (error instanceof errors.JWTExpired) {
      throw new APIError(JWT_RESPONSE_CODE.ERROR.EXPIRED, 401);
    }
    if (error instanceof errors.JWTInvalid) {
      throw new APIError(JWT_RESPONSE_CODE.ERROR.INVALID, 401);
    }

    if (error instanceof errors.JWTClaimValidationFailed) {
      throw new APIError(JWT_RESPONSE_CODE.ERROR.INVALID_CLAIMS, 401);
    }

    if (error instanceof errors.JWSSignatureVerificationFailed) {
      throw new APIError(JWT_RESPONSE_CODE.ERROR.INVALID, 401);
    }

    throw error;
  }
}
