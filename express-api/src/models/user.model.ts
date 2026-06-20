import type { Pool } from "pg";
import { USER_SQL } from "../config/sql/user.sql.js";

export type User = {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: string;
}

type UserRow = {
    id: string;
    name: string;
    email: string;
    password_hash: string;
    created_at: string;
};

// Converte o array de dados para um objeto usuário
function parseToUser({ id, name, email, password_hash, created_at }: UserRow): User {
    return {
        id: id,
        name: name,
        email: email,
        passwordHash: password_hash,
        createdAt: created_at
    };
}

// Model de usuário
export const makeUserModel = (pool: Pool) => {
    return {
        /**
         * Salva um usuário no banco de dados
         * @param user 
         */
        async store(user: User): Promise<void> {
            const sql = USER_SQL.INSERT;
            await pool.query(sql, [
                user.id,
                user.name,
                user.email,
                user.passwordHash,
                user.createdAt
            ]);
        },

        /**
         * Atualiza as informações do usuário
         * @param user 
         */
        async update(id: string, user: User): Promise<void> {
            const sql = USER_SQL.UPDATE;
            await pool.query(sql, [user.name, id]);
        },

        /**
         * Busca um usuário salvo pela coluna informada
         * @param column 
         * @param arg 
         * @returns 
         */
        async getBy(column: string, arg: string): Promise<User | null> {
            let sql = null;
            if (column === "id") {
                sql = USER_SQL.GET_BY_ID;
            } else if (column === "email") {
                sql = USER_SQL.GET_BY_EMAIL;
            } else {
                throw new Error("A coluna informada não é válida.");
            }
            const result = await pool.query(sql, [arg]);
            if (result && result.rows.length > 0) {
                return parseToUser(result.rows[0]);
            }
            return null;
        },

        /**
         * Busca um usuário salvo pela coluna informada
         * @param column 
         * @param arg 
         * @returns 
         */
        async delete(id: string): Promise<void> {
            let sql = USER_SQL.DELETE;
            await pool.query(sql, [id]);
        }

    }
}





export type UserModel = ReturnType<typeof makeUserModel>;