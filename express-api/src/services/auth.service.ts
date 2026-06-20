import { AUTH_RESPONSE_CODE } from "../codes/auth.code.js";
import { USER_RESPONSE_CODE } from "../codes/user.code.js";
import { APIError } from "../exception.js";
import { verifyUserPassword } from "../helpers/auth.helper.js";
import type { UserModel } from "../models/user.model.js";
import type { AuthDetailSchema, UserLoginSchema } from "../schemas/auth.schema.js";
import { createJwtToken } from "../security/jwt.security.js";


export const makeAuthService = (userModel: UserModel) => {
    return {
        /**
         * Faz a autenticação do usuário
         * @param data 
         * @returns 
         */
        async loginUser(data: UserLoginSchema): Promise<AuthDetailSchema> {
            const user = await userModel.getBy("email", data.email);
            if (!user) throw new APIError(USER_RESPONSE_CODE.ERROR.NOT_FOUND, 404);
            if (!(await verifyUserPassword(data.password, user.passwordHash))) {
                throw new APIError(AUTH_RESPONSE_CODE.ERROR.INVALID_CREDENTIALS, 401);
            }
            return {
                ...(await createJwtToken(user))
            }
        }
    }
}


export type AuthService = ReturnType<typeof makeAuthService>