import request from "supertest";
import { it, beforeEach, describe, expect, afterAll, beforeAll } from "vitest";
import { pool } from "../../src/init.js";
import app from "../../src/main.js";

const defaultUser = {
  name: "Test",
  email: "email@test.com",
  password: "12345678",
};

// LImpa o banco de dados antes de cada teste
beforeEach(async () => {
  await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
});

// Salva um usuário no banco de dados
async function createUser() {
  await request(app).post("/api/v1/users").send(defaultUser);
}


describe(`POST /auth/login: Autenticação de usuários`, () => {
    it(`Deve autenticar o usuário`, async () => {
        await createUser();
        const response = await request(app).post("/api/v1/auth/login")
            .send(defaultUser);
        expect(response.status).toBe(200);
        expect(response.body.code).toBe("user_authenticated");
        expect(response.body.data.token).exist;
        expect(response.body.data.expiresAt).exist;

    });

    it(`Deve retornar erro de usuário inexistente`, async () => {
        const response = await request(app).post("/api/v1/auth/login")
            .send({ email: "t@email.com", password: "12345678" });
        expect(response.status).toBe(404);
        expect(response.body.code).toBe("user_not_found");
    });

    it(`Deve retornar erro de credentiais inválidas`, async () => {
        await createUser();
        const response = await request(app).post("/api/v1/auth/login")
            .send({ email: "email@test.com", password: "1234567" });
        expect(response.status).toBe(401);
        expect(response.body.code).toBe("invalid_credentials");
    });
})