import { type FormikHelpers } from "formik";
import { formatAmount, parseAmount } from "../helper/formatter";
import {
  getTransactionById,
  updateTransaction,
} from "../helper/transaction.api";
import { toast } from "sonner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { TransactionForm } from "../components/TransactionForm";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";

type TransactionValues = {
  name: string;
  amount: string;
  type: string;
};

export const UpdateTransaction = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();
  const { id } = useParams();
  const [values, setValues] = useState<TransactionValues>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function populateForm() {
      setLoading(true);
      try {
        if (!id) {
          navigate("/transactions")
          return;
        }
        const response = await getTransactionById(id);

        if (response.status === 200) {
          setValues({
            name: response.data.name,
            amount: formatAmount(response.data.amount),
            type: response.data.type
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
          navigate("/transactions")
          return;
        }
      } catch (error) {
        toast.error("Erro ao atualizar transação.", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    }

    populateForm();
  }, []);


  async function handleSubmit(
    values: TransactionValues,
    actions: FormikHelpers<TransactionValues>,
  ) {
    try {
      actions.setSubmitting(true);
      const transaction = {
        name: values.name,
        type: values.type,
        amount: parseAmount(values.amount),
      };
      if (!id) {
        navigate("/new-transaction");
        return;
      }
      const response = await updateTransaction(id, transaction);

      if (response.status === 200) {
        toast.success("Transação atualizada com sucesso.", {
          position: "top-center",
        });
        return;
      }

      if (response.status === 401) {
        navigate("/auth");
        setAuthenticated(false);
        return;
      }
      toast.error("Houve um erro ao atualizar transação.");
    } catch (error) {
      toast.error("Houve um erro ao adicionar transação.");
    } finally {
      actions.setSubmitting(false);
    }
  }

  if (loading) {
    return <Loader/>
  }
  return (
    <div className="flex flex-col gap-10">
      <Link
        to={`/transactions`}
        className="flex text-xl items-center gap-5 w-max  duration-500 text-blue-600 hover:underline"
      >
        Ir para lista
      </Link>
      <h1 className="text-3xl dark:text-gray-200">Atualizar transação</h1>
      <TransactionForm
        initialValues={values}
        buttonText="Atualizar"
        onSubmit={handleSubmit}
      />
    </div>
  );
};
