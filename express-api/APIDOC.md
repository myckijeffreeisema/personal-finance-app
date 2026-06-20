# 📑 Documentação da API

Esta API foi desenvolvida utilizando **Node.js**, **Express** e **PostgreSQL**. Abaixo estão listados todos os endpoints disponíveis, seus formatos de requisição e respostas esperadas.

---

## 🔐 Autenticação e Padronização

### Autenticação via JWT

Para os endpoints protegidos (indicados com 🔐), envie o token no cabeçalho (Header) da requisição:
`Authorization: Bearer <seu_token>`

### Erros Globais de JWT (Qualquer rota protegida 🔐)

- **`401 Unauthorized`** — Token ausente, expirado ou inválido.

```json
{
  "code": "jwt_token_required",
  "status": 401
}
```

### Erros Globais de Validação de dados

- **`422 Unprocessable Content`** — Dados de requisição inválidos ou em falta.

```json
{
  "code": "validation_error",
  "status": 422,
  "detail": [
    {
      "field": "email",
      "error": "O e-mail informado é inválido."
    },
    {
      "field": "password",
      "error": "A senha deve conter no mínimo 8 caracteres."
    }
  ]
}
```

---

## 👥 Usuários (`/api/v1/users`)

### 🔹 Criar um novo usuário

Cria um novo registro de usuário no sistema.

- **URL:** `/api/v1/users`
- **Método:** `POST`
- **Autenticação Requerida:** Não

#### 📥 Corpo da Requisição (JSON)

```json
{
  "name": "Test User",
  "email": "email@test.com",
  "password": "12345678"
}
```

#### 📤 Respostas

- **`201 Created`** — Usuário criado com sucesso.

```json
{
  "code": "user_created",
  "status": 201
}
```

- **`409 Conflict`** — O e-mail informado já está em uso.

```json
{
  "code": "email_in_use",
  "status": 409
}
```

---

### 🔹 Atualizar dados do usuário 🔐

Atualiza os dados cadastrais do próprio usuário autenticado.

- **URL:** `/api/v1/users`
- **Método:** `PUT`
- **Autenticação Requerida:** Sim

#### 📥 Corpo da Requisição (JSON)

```json
{
  "name": "Novo Nome do Usuário"
}
```

#### 📤 Respostas

- **`200 OK`** — Dados atualizados com sucesso.

```json
{
  "code": "user_info_updated",
  "status": 200
}
```

---

### 🔹 Buscar dados do usuário 🔐

Retorna as informações do usuário logado.

- **URL:** `/api/v1/users`
- **Método:** `GET`
- **Autenticação Requerida:** Sim

#### 📤 Respostas

- **`200 OK`** — Usuário encontrado.

```json
{
  "code": "user_found",
  "status": 200,
  "data": {
    "id": "UUID",
    "name": "Test User",
    "email": "email@test.com",
    "createdAt": "2026-06-04T18:03:18.440Z"
  }
}
```

---

### 🔹 Deletar conta do usuário 🔐

Remove a conta do usuário logado do sistema.

- **URL:** `/api/v1/users`
- **Método:** `DELETE`
- **Autenticação Requerida:** Sim

#### 📤 Respostas

- **`204 No Content`** — Usuário deletado com sucesso.

---

## 🔑 Autenticação (`/api/v1/auth`)

### 🔹 Login de Usuário

Autentica um usuário e gera o token de acesso.

- **URL:** `/api/v1/auth/login`
- **Método:** `POST`
- **Autenticação Requerida:** Não

#### 📥 Corpo da Requisição (JSON)

```json
{
  "email": "email@test.com",
  "password": "12345678"
}
```

#### 📤 Respostas

- **`200 OK`** — Autenticação realizada com sucesso.

```json
{
  "code": "user_found",
  "status": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 3600,
    "expiresAt": "2026-06-04T23:59:59.000Z"
  }
}
```

- **`404 Not Found`** — Usuário não encontrado.

```json
{
  "code": "user_not_found",
  "status": 404
}
```

- **`401 Unauthorized`** — Credenciais de usuário inválidas.

```json
{
  "code": "invalid_credentials",
  "status": 401
}
```

---

## 💰 Transações (`/api/v1/transactions`)

### 🔹 Criar transação 🔐

Registra uma nova transação financeira associada ao usuário.

- **URL:** `/api/v1/transactions`
- **Método:** `POST`
- **Autenticação Requerida:** Sim

#### 📥 Corpo da Requisição (JSON)

```json
{
  "name": "Freelance Dev",
  "amount": 1500.0,
  "type": "entry"
}
```

#### 📤 Respostas

- **`201 Created`** — Transação criada com sucesso.

```json
{
  "code": "transaction_created",
  "status": 201,
  "data": {
    "id": "UUID",
    "userId": "UUID",
    "name": "Freelance Dev",
    "amount": 1500.0,
    "type": "entry",
    "createdAt": "2026-01-04T18:03:18.440Z"
  }
}
```

---

### 🔹 Listar todas as transações 🔐

Lista as transações do usuário logado, com suporte a paginação e filtros por tipo.

- **URL:** `/api/v1/transactions`
- **Método:** `GET`
- **Autenticação Requerida:** Sim

#### 🔍 Parâmetros de Busca (Query Params)

| Parâmetro | Tipo     | Obrigatório | Padrão | Descrição                                                                 |
| --------- | -------- | ----------- | ------ | ------------------------------------------------------------------------- |
| `page`    | `number` | Não         | `1`    | Número da página atual para paginação.                                    |
| `size`    | `number` | Não         | `10`   | Quantidade de registros retornados por página.                            |
| `type`    | `string` | Não         | —      | Filtra pelo tipo de movimentação. Valores aceitos: `entry` ou `exit`.     |
| `order`   | `string` | Não         | —      | Ordena a lista. Valores aceitos: `lastIn`, `firstIn`, `bigger`, `smaller` |

_Exemplo de URL completa:_ `/api/v1/transactions?page=1&size=10&type=entry&order=lastIn`

#### 📤 Respostas

- **`200 OK`** — Lista e metadados de paginação retornados com sucesso.

```json
{
  "code": "transaction_list",
  "status": 200,
  "data": {
    "transactions": [
      {
        "id": "UUID",
        "userId": "UUID",
        "name": "Freelance Dev",
        "amount": 1500.0,
        "type": "entry",
        "createdAt": "2026-01-04T18:03:18.440Z"
      }
    ],
    "totalItems": 45,
    "totalPages": 5
  }
}
```

---

### 🔹 Buscar transação por ID 🔐

Busca os detalhes de uma transação específica através do ID informado na URL.

- **URL:** `/api/v1/transactions/:id`
- **Método:** `GET`
- **Autenticação Requerida:** Sim

#### 📤 Respostas

- **`200 OK`** — Transação encontrada.

```json
{
  "code": "transaction_found",
  "status": 200,
  "data": {
    "id": "UUID",
    "userId": "UUID",
    "name": "Freelance Dev",
    "amount": 1500.0,
    "type": "entry",
    "createdAt": "2026-01-04T18:03:18.440Z"
  }
}
```

- **`404 Not Found`** — Transação não encontrada.

```json
{
  "code": "transaction_not_found",
  "status": 404
}
```

---

### 🔹 Atualizar transação 🔐

Atualiza os dados de uma transação existente.

- **URL:** `/api/v1/transactions/:id`
- **Método:** `PUT`
- **Autenticação Requerida:** Sim

#### 📥 Corpo da Requisição (JSON)

```json
{
  "name": "Freelance Dev (Atualizado)",
  "amount": 1800.0,
  "type": "entry"
}
```

#### 📤 Respostas

- **`200 OK`** — Transação atualizada com sucesso.

```json
{
  "code": "transaction_info_updated",
  "status": 200,
  "data": {
    "id": "UUID",
    "userId": "UUID",
    "name": "Freelance Dev (Atualizado)",
    "amount": 1800.0,
    "type": "entry",
    "createdAt": "2026-01-04T18:03:18.440Z"
  }
}
```

---

### 🔹 Deletar transação 🔐

Remove uma transação do sistema.

- **URL:** `/api/v1/transactions/:id`
- **Método:** `DELETE`
- **Autenticação Requerida:** Sim

#### 📤 Respostas

- **`204 No Content`** — Transação removida com sucesso.

A rota `GET /api/v1/transactions/balance` realmente ficou de fora da documentação principal! Como ela é uma rota protegida e retorna o resumo financeiro (entradas e saídas) do usuário autenticado, ela segue o mesmo padrão de segurança das demais.

Aqui está o trecho formatado pronto para você incluir na seção de **💰 Transações** da sua documentação:

---

### 🔹 Buscar balanço das transações 🔐

Retorna o total acumulado das movimentações financeiras do usuário, segregado por tipo (`entry` e `exit`).

* **URL:** `/api/v1/transactions/balance`
* **Método:** `GET`
* **Autenticação Requerida:** Sim

#### 📤 Respostas

* **`200 OK`** — Balanço calculado com sucesso.

```json
{
  "code": "balance_info",
  "status": 200,
  "data": {
    "balance": [
      {
        "type": "entry",
        "total": 1500.0
      },
      {
        "type": "exit",
        "total": 350.0
      }
    ]
  }
}

```