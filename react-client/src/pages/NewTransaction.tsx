import { type FormikHelpers } from "formik";
import { parseAmount } from "../helper/formatter";
import { saveTransaction } from "../helper/transaction.api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { TransactionForm } from "../components/TransactionForm";

type TransactionValues= {
  name: string;
  amount: string;
  type: string;
};

export const NewTransaction = () => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  async function handleSubmit(values: TransactionValues, actions: FormikHelpers<TransactionValues>) {
    try {
      actions.setSubmitting(true);
      const transaction = {
        name: values.name,
        type: values.type,
        amount: parseAmount(values.amount),
      };
      const response = await saveTransaction(transaction);

      if (response.status === 201) {
        toast.success("Transação adicionada com sucesso.", {
          position: "top-center",
        });
        actions.resetForm();
        return;
      }

      if (response.status === 401) {
        navigate("/auth");
        setAuthenticated(false);
        return;
      }
      toast.error("Houve um erro ao adicionar transação.");
    } catch (error) {
      toast.error("Houve um erro ao adicionar transação.");
    } finally {
      actions.setSubmitting(false);
    }
  }
  return (
    <div className="flex flex-col gap-10">
      <Link
        to={`/transactions`}
        className="flex text-xl items-center gap-5 w-max  duration-500 text-blue-600 hover:underline"
      >
        Ir para lista
      </Link>
      <h1 className="text-3xl dark:text-gray-200">
        Adicione uma nova transação
      </h1>
      <TransactionForm buttonText="Cadastrar" onSubmit={handleSubmit} />
    </div>
  );
};
