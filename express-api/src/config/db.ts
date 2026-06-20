import { Pool } from "pg";


let connectionString: string | undefined = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("A url do banco precisa ser definida.");
}

export const getPool = () => {
  return new Pool({
    connectionString: connectionString,
  });
};
