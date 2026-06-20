export const TRANSACTION_SQL = {
    CREATE_TABLE: `
    CREATE TABLE IF NOT EXISTS transactions (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        name VARCHAR(255) NOT NULL,
        amount INTEGER NOT NULL,
        type VARCHAR(10) NOT NULL,
        created_at TIMESTAMP NOT NULL,

        CONSTRAINT fk_user_transaction
        FOREIGN KEY (user_id) 
        REFERENCES users(id) 
        ON DELETE CASCADE
    );
    `,

    INSERT: `
    INSERT INTO transactions (id, user_id, name, amount, type, created_at)
    VALUES ($1, $2, $3, $4, $5, $6);
    `,

    UPDATE: `
    UPDATE transactions 
    SET 
        name = $1,
        amount = $2, 
        type = $3
    WHERE id = $4 AND user_id = $5;
    `,

    GET_BY_ID: `
    SELECT id, user_id, name, amount, type, created_at
    FROM transactions
    WHERE id = $1 AND user_id = $2;
    `,

    PAGINATED_LIST: (orderArg: string) => {
        return `
        SELECT id, user_id, name, amount, type, created_at
        FROM transactions
        WHERE user_id = $1
        ORDER BY ${orderArg}
        LIMIT $2 OFFSET $3;
        `
    },

    FILTERED_PAGINATED_LIST: (orderArg: string) => {
        return `
        SELECT id, user_id, name, amount, type, created_at
        FROM transactions
        WHERE user_id = $1 AND type = $2
        ORDER BY ${orderArg}
        LIMIT $3 OFFSET $4;
        `
    },

    COUNT: `
    SELECT COUNT(*) AS total 
    FROM transactions 
    WHERE user_id = $1;
    `,

    COUNT_FILTERED: `
    SELECT COUNT(*) AS total 
    FROM transactions 
    WHERE user_id = $1 AND type = $2;
    `,

    DELETE: `
    DELETE FROM transactions
    WHERE id = $1 AND user_id = $2;
    `,

    GROUP_AMOUNT_BY_TYPE: `
    SELECT type, SUM(amount) as total
    FROM transactions
    WHERE user_id = $1
    GROUP BY type
    `
}
