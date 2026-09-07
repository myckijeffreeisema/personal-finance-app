const url: string = import.meta.env.VITE_API_BASE_URL;

// Busca a lista das transações salvas
export const listTransactions = async (
  page: number = 1,
  size: number = 10,
  type?: string | undefined,
  order?: string | undefined,
) => {
  const token = localStorage.getItem("jwt-token");
  const res = await fetch(
    `${url}/transactions?page=${page}&size=${size}&type=${type}&order=${order}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  return data;
};

// Busca uma transação por ID
export const getTransactionById = async (id: string) => {
  const token = localStorage.getItem("jwt-token");
  const res = await fetch(`${url}/transactions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};


// Busca os valores de entrada, saída e saldo
export const getTransactionBalance = async () => {
  const token = localStorage.getItem("jwt-token");
  const res = await fetch(`${url}/transactions/balance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

// Deleta uma transação por ID
export const deleteTransactionById = async (id?: string) => {
  const token = localStorage.getItem("jwt-token");
  const res = await fetch(`${url}/transactions/${id}`, {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.status;
};


// Salva uma transação
export const saveTransaction = async (transaction: any) => {
  const token = localStorage.getItem("jwt-token");
  const response = await fetch(`${url}/transactions`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(transaction),
  });
  const data = await response.json();
  return data;
};

// Atualiza uma transação
export const updateTransaction = async (id: string, transaction: any) => {
  const token = localStorage.getItem("jwt-token");
  const response = await fetch(`${url}/transactions/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(transaction),
  });
  const data = await response.json();
  return data;
};

