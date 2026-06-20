import { randomUUID } from "node:crypto";
import type { User } from "../models/user.model.js";
import type { UserRegistrationSchema } from "../schemas/user.schema.js";
import { hashUserPassword } from "./auth.helper.js";


/**
 * Cria o objeto usuário
 * @param data 
 * @returns 
 */
export  async function createUserObject(data: UserRegistrationSchema): Promise<User>{
    const now = new Date();
    return {
        id: randomUUID(),
        name: data.name,
        email: data.email,
        passwordHash: await hashUserPassword(data.password),
        createdAt: now.toISOString()
    }
}