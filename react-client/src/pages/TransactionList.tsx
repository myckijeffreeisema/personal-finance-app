import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listTransactions } from "../helper/transaction.api";
import { toast } from "sonner";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { formatAmount } from "../helper/formatter";

type TransactionType = "entry" | "exit" | "all";

type Transaction = {
  id: string;
  userId: string;
  name: string;
  amount: number;
  type: TransactionType;
  createdAt: string;
};

type TransactionSortType = "lastIn" | "firstIn" | "bigger" | "smaller";

type TransactionList = {
  transactions: Transaction[];
  totalItems: number;
  totalPages: number;
};

export const TransactionList = () => {
  const { setAuthenticated } = useAuth();

  // Estado de controle de carregamento
  const [isTransactionLoading, setIsTransactionLoading] =
    useState<boolean>(true);

  const [transactions, setTransactions] = useState<TransactionList>({
    transactions: [],
    totalItems: 0,
    totalPages: 1,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const [transactionTypeFilter, setTransactionTypeFilter] =
    useState<TransactionType>();
  const [transactionSortFilter, setTransactionSortFilter] =
    useState<TransactionSortType>();

  // Hook de navegação
  const navigate = useNavigate();

  // Busca as transações via API
  useEffect(() => {
    async function getTransactions() {
      try {
        setIsTransactionLoading(true);
        const data = await listTransactions(
          currentPage,
          perPage,
          transactionTypeFilter,
          transactionSortFilter
        );

        if (data.status === 401) {
          navigate("/auth");
          setAuthenticated(false);
          return;
        }

        if (data.status === 200) {
          setTransactions(data.data);
          return;
        }

        toast.error("Erro ao listar transações.", { position: "top-center" });
      } catch (error) {
        toast.error("Erro ao listar transações.", { position: "top-center" });
      } finally {
        setIsTransactionLoading(false);
      }
    }
    getTransactions();
  }, [currentPage, perPage, transactionTypeFilter, transactionSortFilter]);

  useEffect(() => {
    if (currentPage > transactions.totalPages) {
      setCurrentPage(transactions.totalPages);
    }
  }, [transactions.totalPages, currentPage]);

  // Funções auxiliares
  function handleTypeFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    if (value === "entry" || value === "exit" || value === "all") {
      const type: TransactionType = value as TransactionType;
      setTransactionTypeFilter(type);
      setCurrentPage(1);
    }
  }

  function handleSortFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    if (
      value === "lastIn" ||
      value === "firstIn" ||
      value === "bigger" ||
      value === "smaller"
    ) {
      const order: TransactionSortType = value as TransactionSortType;
      setTransactionSortFilter(order);
    }
  }

  function handlePerPageFilterChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value: string = e.target.value;
    if (value === "5" || value === "10" || value === "15" || value === "20") {
      const totalPerPage: number = Number(value);
      setPerPage(totalPerPage);
    }
  }

  const disableBackPageButton = currentPage === 1;
  const disableNextPageButton =
    transactions.totalItems <= perPage ||
    transactions.totalPages === currentPage;

  return (
    <div className="flex flex-col gap-10 w-full max-w-300">
      <h1 className="text-2xl dark:text-gray-200">Lista de transações</h1>

      {/* Cabeçalho da Lista */}
      <div className="flex w-full flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 p-4">
        {/* Filtros */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h3 className="text-md dark:text-gray-200">Filtros: </h3>

          {/* Filtros de tipo de transação */}
          <select
            className="py-2 mr-2 w-full sm:w-max dark:focus:bg-gray-700 dark:text-gray-200 px-4 border-2 border-gray-400 outline-none dark:border-gray-400 rounded-md"
            name="typeFilter"
            id="typeFilter"
            onChange={handleTypeFilterChange}
          >
            <option value="all">Todos</option>
            <option value="entry">Entrada</option>
            <option value="exit">Saída</option>
          </select>

          {/* Filtros de ordenação */}
          <select
            className="py-2 mr-2 w-full sm:w-max dark:focus:bg-gray-700 dark:text-gray-200 px-4 border-2 border-gray-400 outline-none dark:border-gray-400 rounded-md"
            name="sortFilter"
            id="sortFilter"
            onChange={handleSortFilterChange}
          >
            <option value="lastIn">Mais recente</option>
            <option value="firstIn">Mais antigo</option>
            <option value="bigger">Maior valor</option>
            <option value="smaller">Menor valor</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <h3 className="text-md dark:text-gray-200">Total por página:</h3>

          {/* Filtros de Paginação */}
          <select
            className="py-2 mr-2 w-full sm:w-max dark:focus:bg-gray-700 dark:text-gray-200 px-4 border-2 border-gray-400 outline-none dark:border-gray-400 rounded-md"
            name="pageFilter"
            id="pageFilter"
            onChange={handlePerPageFilterChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>

      {/* Listagem das transações */}

      {isTransactionLoading ? (
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 mx-auto" />
      ) : transactions.transactions.length < 1 ? (
        <span className="text-gray-700 dark:text-gray-200 text-center">Não há transação cadastrada.</span>
      ) : (
        <div className="flex flex-col w-full">
          {transactions?.transactions.map((el, idx) => (
            <div
              key={idx}
              className="flex items-center px-6 py-3 w-full last:rounded-b-md first:rounded-t-md even:bg-gray-50 bg-gray-300 dark:even:bg-gray-600 dark:bg-gray-700"
            >
              <span
                className={`flex-1 ${el.type === "exit" ? "text-red-500" : "text-green-600"}`}
              >
                {el.type === "entry" ? (
                  <FaLongArrowAltUp />
                ) : (
                  <FaLongArrowAltDown />
                )}
              </span>
              <h4 className="flex-4 text-gray-700 dark:text-gray-100">
                {el.name}
              </h4>
              <strong className=" flex-3 text-gray-700 dark:text-gray-300">
                {formatAmount(el.amount)}
              </strong>
              <span
                className={`flex-1 ${el.type === "exit" ? "text-red-500" : "text-green-600"} flex-2 hidden sm:block`}
              >
                {el.type === "entry" ? "Entrada" : "Saída"}
              </span>
              <Link
                className="px-4 py-1 bg-blue-500  text-white rounded-sm"
                to={`/transactions/${el.id}`}
              >
                Visualizar
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Rodapé da lista */}
      <div className="flex flex-col w-full items-center justify-between bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500 p-4">
        <div className="flex w-max mx-auto gap-5">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={disableBackPageButton}
            className={`${disableBackPageButton ? "bg-blue-400 cursor-no-drop" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}  text-white px-3 py-1 rounded-sm  duration-300`}
          >
            Anterior
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={disableNextPageButton}
            className={`${disableNextPageButton ? "bg-blue-400 cursor-no-drop" : "bg-blue-500 hover:bg-blue-600 cursor-pointer"}  text-white px-3 py-1 rounded-sm  duration-300`}
          >
            Próximo
          </button>
        </div>
        <div className="flex w-max mx-auto gap-5 dark:text-gray-100">
          <span>
            Página {currentPage} de {transactions.totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};
