import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  deleteTransactionById,
  getTransactionById,
} from "../helper/transaction.api";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/Loader";
import { formatAmount, formatDate } from "../helper/formatter";

type TransactionType = "entry" | "exit" | "all";

type Transaction = {
  id: string;
  userId: string;
  name: string;
  amount: number;
  type: TransactionType;
  createdAt: string;
};

export const Transaction = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction>();
  const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Busca os dados da transação atual
  useEffect(() => {
    async function getTransaction() {
      try {
        setLoading(true);
        if (!id) {
          navigate("/transactions")
          return;
        }
        const response = await getTransactionById(id);

        if (response.status === 200) {
          setTransaction(response.data);
          return;
        }

        if (response.status === 401) {
          setAuthenticated(false);
          navigate("/");
          return;
        }

        toast.error("Houve um erro ao buscar transação.", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("Houve um erro ao buscar transação.", {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    }

    getTransaction();
  }, [id]);

  function toggleConfirmationModal(e: any) {
    const canCloseMenu = ["confirmationModal", "deleteBtn", "confirmNo"];
    if (canCloseMenu.includes(e.target.id)) {
      setIsModalOpen(!isModalOpen);
    }
  }
  async function handleDeleteTransaction() {
    try {
      const response = await deleteTransactionById(id);

      if (response === 204) {
        navigate("/transactions");
        toast.success("Transação deletada com sucesso.", {
          position: "top-center",
        });
        return;
      }

      if (response === 401) {
        setAuthenticated(false);
        navigate("/");
        return;
      }

      if (response === 404) {
        toast.error("Transação não encontrada.", { position: "top-center" });
        return;
      }

      toast.error("Erro ao deletar transação.", { position: "top-center" });
    } catch (error) {
      toast.error("Erro ao deletar transação.", { position: "top-center" });
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="py-10 px-5 flex flex-col gap-10 relative rounded-lg w-full">
      <div
        id="confirmationModal"
        onClick={toggleConfirmationModal}
        className={`${isModalOpen ? "flex" : "hidden"} justify-center items-center w-full absolute min-h-dvh -top-6 -left-6 backdrop-blur-[2px]`}
      >
        <div className="-translate-y-10 w-max p-10 bg-white dark:bg-gray-700 flex flex-col items-center justify-center gap-5 rounded-md">
          <h3 className="text-2xl dark:text-gray-200">
            Deseja remover: {transaction?.name}?
          </h3>
          <div className="flex items-center gap-10">
            <button
              className="px-5 cursor-pointer rounded-md py-2 bg-blue-400 hover:bg-blue-600 duration-500 text-white"
              onClick={toggleConfirmationModal}
              id="confirmNo"
            >
              Cancelar
            </button>
            <button
              className="px-5 cursor-pointer rounded-md py-2 bg-red-400 hover:bg-red-600 duration-500 text-white"
              onClick={handleDeleteTransaction}
            >
              Deletar
            </button>
          </div>
        </div>
      </div>

      <Link
        to={`/transactions`}
        className="flex text-xl items-center gap-5 w-max  duration-500 text-blue-600 hover:underline"
      >
        Ir para lista
      </Link>

      <h1 className="text-3xl dark:text-gray-200">{transaction?.name}</h1>
      <span
        className={`${transaction?.type === "exit" ? "text-red-500" : "text-green-500"}`}
      >
        {transaction?.type === "exit" ? "Saída" : "Entrada"}
      </span>

      <strong className="text-3xl text-blue-500 bg-white dark:bg-gray-900 w-max px-5 py-2 rounded-lg">
        {formatAmount(transaction?.amount ?? 0)}
      </strong>
      <span className="dark:text-gray-200">
        Data criação: {formatDate(transaction?.createdAt)}
      </span>

      <div className="flex gap-5">
        <Link
          className="px-5 rounded-md py-2 bg-blue-500 hover:bg-blue-600 duration-500 text-white"
          to={`/update-transaction/${id}`}
        >
          Editar
        </Link>
        <button
          className="px-5 cursor-pointer rounded-md py-2 bg-red-400 hover:bg-red-600 duration-500 text-white"
          id="deleteBtn"
          onClick={toggleConfirmationModal}
        >
          Deletar
        </button>
      </div>
    </div>
  );
};
