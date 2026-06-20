import { getPool } from "./config/db.js";
import { TRANSACTION_SQL } from "./config/sql/transaction.sql.js";
import { USER_SQL } from "./config/sql/user.sql.js";

export const pool = getPool();

export async function bootstrap() {
    try {
        // Cria as tabelas no banco de dados
        await pool.query(USER_SQL.CREATE_TABLE);
        await pool.query(TRANSACTION_SQL.CREATE_TABLE);
    } catch (error) {
        throw new Error(`Erro ao criar as tabelas do banco de dados. Erro: ${error}`);
    }
}