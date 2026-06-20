import bcrypt from "bcrypt";

/**
 * Faz o hash da senha do usuário
 * @param password 
 * @returns 
 */
export async function hashUserPassword(password: string): Promise<string>{
    const salt = await bcrypt.genSalt(); 
    return bcrypt.hash(password, salt);
}

/**
 * Verifica a senha informada pelo usuário
 * @param hash 
 * @param password 
 * @returns 
 */
export async function verifyUserPassword(password: string, hash: string): Promise<boolean>{
    return await bcrypt.compare(password, hash);
}