export const USER_SQL = {
    CREATE_TABLE: `
    CREATE TABLE IF NOT EXISTS users(
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(40) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(300) NOT NULL,
        created_at VARCHAR(50) NOT NULL
    )`,
    INSERT: `INSERT INTO users(id, name, email, password_hash, created_at)VALUES($1, $2, $3, $4, $5)`,
    UPDATE: `UPDATE users SET name = $1 WHERE id = $2`,
    GET_BY_EMAIL: `SELECT * FROM users WHERE email = $1`,
    GET_BY_ID: `SELECT * FROM users WHERE id = $1`,
    DELETE: `DELETE FROM users WHERE id = $1`
}