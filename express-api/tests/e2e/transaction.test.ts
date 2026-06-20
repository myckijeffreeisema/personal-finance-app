import request from "supertest";
import { it, beforeEach, describe, expect } from "vitest";
import { pool } from "../../src/init.js";
import app from "../../src/main.js";

const defaultUser = {
  name: "Test",
  email: "email@test.com",
  password: "12345678",
};

const defaultTransaction = {
  name: "Transaction 1",
  amount: 10000,
  type: "entry",
};

const BASE_URI = "/api/v1/transactions";

// LImpa o banco de dados antes de cada teste
beforeEach(async () => {
  await pool.query("TRUNCATE TABLE users RESTART IDENTITY CASCADE");
  await pool.query("TRUNCATE TABLE transactions RESTART IDENTITY CASCADE");
});

// Salva um usuário no banco de dados
async function createUser() {
  await request(app).post("/api/v1/users").send(defaultUser);
}

// Retorna um token jwt
async function getAuthToken() {
  await createUser();
  const loginResponse = await request(app)
    .post("/api/v1/auth/login")
    .send(defaultUser);
  return loginResponse.body?.data?.token;
}

// Salva uma transação no banco de dados
async function createTransaction(transaction: any) {
  const token = await getAuthToken();
  const response = await request(app)
    .post(BASE_URI)
    .set("Authorization", `Bearer ${token}`)
    .send(transaction);
  return {token, response};
}

describe(`POST /transactions: Criação de transações`, () => {
  it(`Deve cadastrar uma transação no banco de dados`, async () => {
    const token = await getAuthToken();
    const response = await request(app)
      .post(BASE_URI)
      .set("Authorization", `Bearer ${token}`)
      .send(defaultTransaction);
    expect(response.status).toBe(201);
    expect(response.body.code).toBe("transaction_created");
  });

  it(`Deve retornar um erro de usuário não autenticado`, async () => {
    const response = await request(app).post(BASE_URI).send(defaultTransaction);
    expect(response.status).toBe(401);
    expect(response.body.code).toBe("jwt_token_required");
  });
});

describe(`GET /transactions/:id: Busca uma transação`, () => {
  it(`Deve buscar os dados de uma transação`, async () => {
    const transactionCreatedRes = await createTransaction(defaultTransaction);
    const id = transactionCreatedRes.response.body?.data?.id;
    const response = await request(app).get(`${BASE_URI}/${id}`)
      .set("Authorization", `Bearer ${transactionCreatedRes.token}`);
    expect(response.status).toBe(200);
    expect(response.body.code).toBe("transaction_found");
    expect(response.body.data?.name).toBe("Transaction 1");
  });

  it(`Deve retornar um erro de transação não encontrada`, async () => {
    const transactionCreatedRes = await createTransaction(defaultTransaction);
    const response = await request(app).get(`${BASE_URI}/WEGWEGWE`)
      .set("Authorization", `Bearer ${transactionCreatedRes.token}`);
    expect(response.status).toBe(404);
    expect(response.body.code).toBe("transaction_not_found");
  });

  it(`Deve retornar um erro usuário não autenticado`, async () => {
    const response = await request(app).get(`${BASE_URI}/WEGWEGWE`)
    expect(response.status).toBe(401);
    expect(response.body.code).toBe("jwt_token_required");
  });
});

describe(`PUT /transactions: Atualização de transações`, () => {
  it(`Deve atualizar os dados de uma transação`, async () => {
    const transactionCreatedRes = await createTransaction(defaultTransaction)
    const id = transactionCreatedRes.response.body?.data?.id;
    const response = await request(app).put(`${BASE_URI}/${id}`)
      .set("Authorization", `Bearer ${transactionCreatedRes.token}`)
      .send({ name: "Transaction 2", amount: 20000, type: "entry" });
    expect(response.status).toBe(200);
    expect(response.body.code).toBe("transaction_info_updated");
    expect(response.body.data.name).toBe("Transaction 2");
  });
});


describe(`DELETE /transactions: Deleção de transações`, () => {
  it(`Deve deletar os dados de uma transação`, async () => {
    const transactionCreatedRes = await createTransaction(defaultTransaction)
    const id = transactionCreatedRes.response.body?.data?.id;
    const response = await request(app).delete(`${BASE_URI}/${id}`)
      .set("Authorization", `Bearer ${transactionCreatedRes.token}`)
      .send({ name: "Transaction 2", amount: 20000, type: "entry" });
    
    const responseTransactionNotFound = await request(app).get(`${BASE_URI}/${id}`)
      .set("Authorization", `Bearer ${transactionCreatedRes.token}`);
    
    expect(response.status).toBe(204);
    expect(responseTransactionNotFound.status).toBe(404);
    expect(responseTransactionNotFound.body.code).toBe("transaction_not_found");
  });
});