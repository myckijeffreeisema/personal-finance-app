import request from "supertest";
import { it, beforeEach, expect, describe } from "vitest";
import app from "../../src/main.js";
import { pool } from "../../src/init.js";

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

// Retorna um token jwt
async function getAuthToken() {
  const loginResponse = await request(app)
    .post("/api/v1/auth/login")
    .send(defaultUser);
  return loginResponse.body?.data?.token;
}

describe(`POST /users: Cadastro de usuários`, () => {
  it(`Deve criar um usuário no banco de dados`, async () => {
    const response = await request(app).post("/api/v1/users").send(defaultUser);
    expect(response.status).toBe(201);
  });

  it(`Erro de email duplicado`, async () => {
    await createUser();
    const response = await request(app).post("/api/v1/users").send(defaultUser);
    expect(response.status).toBe(409);
  });

  const users = [
    {
      name: "",
      email: "email@test.com",
      password: "12345678",
    },
    {
      name: "Test",
      email: "",
      password: "12345678",
    },
    {
      name: "Test",
      email: "email@test.com",
      password: "",
    },
  ];
  it.each(users)(
    `Erro de dados inválidos: deve falhar se faltar dados`,
    async (user) => {
      const response = await request(app).post("/api/v1/users").send(user);
      expect(response.status).toBe(422);
    },
  );
});

describe(`GET /users: Retorna as informações do usuário.`, () => {
  it(`Deve buscar as informações da conta do usuário`, async () => {
    await createUser();
    const token = await getAuthToken();

    const userInfoResponse = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);

    expect(userInfoResponse.status).toBe(200);
    expect(userInfoResponse.body.code).toBe("user_found");
    expect(userInfoResponse.body.data.name).toBe("Test");
    expect(userInfoResponse.body.data.email).toBe("email@test.com");
  });

  it(`Erro ao buscar dados de usuário: Não Autenticado`, async () => {
    await createUser();
    const userInfoResponse = await request(app).get("/api/v1/users");

    expect(userInfoResponse.status).toBe(401);
    expect(userInfoResponse.body.code).toBe("jwt_token_required");
  });
});

describe(`PUT /users: Atualização de usuários`, () => {
  it(`Deve atualizar os dados do usuário`, async () => {
    await createUser();
    const token = await getAuthToken();

    const updateResponse = await request(app)
      .put("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test 2" });

    const userUpdated = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.code).toBe("user_info_updated");
    expect(userUpdated.status).toBe(200);
    expect(userUpdated.body.data.name).toBe("Test 2");
  });
});


describe(`DELETE /users: Deleção dos dados do usuário`, () => {
  it(`Deve deletar os dados do usuário`, async () => {
    await createUser();
    const token = await getAuthToken();
    const response = await request(app).delete("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);
    const userResponse = await request(app).get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(204);
    expect(userResponse.status).toBe(404);
  });
})