import { USER_RESPONSE_CODE } from "../codes/user.code.js";
import { APIError } from "../exception.js";
import { createUserObject } from "../helpers/user.helper.js";
import type { BalanceInfo } from "../models/transaction.model.js";
import type { User, UserModel } from "../models/user.model.js";
import { accountDetailSchema, type AccountDetailSchema, type UserRegistrationSchema, type UserUpdateSchema } from "../schemas/user.schema.js";


export const makeUserService = (userModel: UserModel) => {
    return {

        /**
         * Cadastra um novo usuário
         * @param data 
         */
        async create(data: UserRegistrationSchema): Promise<void> {
            const savedUser = await userModel.getBy("email", data.email);
            if (savedUser) {
                throw new APIError(USER_RESPONSE_CODE.ERROR.CONFLICT, 409)
            }
            const user = await createUserObject(data);
            await userModel.store(user);
        },

        /**
         * Atualiza os dados do usuário
         * @param id 
         * @param data 
         * @returns 
         */
        async update(id: string, data: UserUpdateSchema): Promise<User> {
            const user = await userModel.getBy("id", id);
            if (!user) throw new APIError(USER_RESPONSE_CODE.ERROR.NOT_FOUND, 404);
            const updatedUser = { ...user, ...data };
            await userModel.update(id, updatedUser);
            return updatedUser;
        },


        /**
         * Busca os dados do usuário salvo
         * @param id 
         * @returns 
         */
        async getInfo(id: string): Promise<AccountDetailSchema> {
            const user = await userModel.getBy("id", id);
            if (!user) throw new APIError(USER_RESPONSE_CODE.ERROR.NOT_FOUND, 404);
            return await accountDetailSchema.parseAsync(user);
        },


        /**
         * Deleta um usuário no banco de dados
         * @param id 
         * @returns 
         */
        async delete(id: string): Promise<void> {
            const user = await userModel.getBy("id", id);
            if (!user) throw new APIError(USER_RESPONSE_CODE.ERROR.NOT_FOUND, 404);
            await userModel.delete(user.id)
        }
    }
}

export type UserService = ReturnType<typeof makeUserService>