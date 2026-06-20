# 🚀 .Wallet - API de Controle de finanças pessoais

Uma API REST desenvolvida para controle de transações financeiras pessoais, permitindo cadastro de usuários, autenticação segura e gerenciamento de entradas e saídas.

👉 Acesse a Documentação da API (APIDOC.md)

## 🛠️ Tecnologias Utilizadas

* **Node.js** (Ambiente de execução)
* **Express** (Framework web)
* **PostgreSQL** (Banco de dados relacional)
* **JWT (JSON Web Tokens)** (Autenticação)

## ▶️ Como Executar o Projeto

Você pode rodar este projeto localmente de duas formas: utilizando o **Docker** (recomendado por já subir o banco de dados configurado) ou rodando o **Node.js** diretamente na sua máquina.

### 1. Baixando o código

Escolha uma das opções abaixo para obter o código:

```bash
# Opção A: Baixar apenas a pasta da API (Não precisa do Git)
npx degit myckijeffreeisema/personal-finance-app/express-api nome-da-sua-pasta

# Opção B: Clonar o repositório inteiro
git clone [https://github.com/myckijeffreeisema/personal-finance-app.git](https://github.com/myckijeffreeisema/personal-finance-app.git)

```

Entre na pasta do projeto antes de prosseguir:

```bash
cd nome-da-sua-pasta # ou cd personal-finance-app/express-api

```

---

### 🐳 Opção 1: Via Docker Compose (Mais Rápido)

Certifique-se de ter o Docker e o Docker Compose instalados. Esta opção já configura o ambiente e o banco de dados PostgreSQL automaticamente.

```bash
# 1. Copie o arquivo de exemplo das variáveis de ambiente
cp .env.example .env

# 2. Suba os containers (o Docker vai instalar as dependências e iniciar o banco e a API)
docker compose up -d

```

*A API estará disponível em `http://localhost:3000`.*

---

### 📦 Opção 2: Via Node.js (Local)

Para esta opção, você precisará ter um banco **PostgreSQL** rodando localmente e o **Node.js** instalado.

```bash
# 1. Instale as dependências
npm install

# 2. Copie e configure as variáveis de ambiente (.env) com as credenciais do seu banco local
cp .env.example .env

# 4. Inicie a aplicação em modo de desenvolvimento
npm run dev

```