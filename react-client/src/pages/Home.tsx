import { FaLongArrowAltDown, FaLongArrowAltUp, FaWallet } from "react-icons/fa";
import { formatAmount } from "../helper/formatter";
import { useAuth } from "../hooks/useAuth";
import { Pie, PieChart, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import { getTransactionBalance } from "../helper/transaction.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";

type Balance = {
  type: string;
  total: number;
};

export const Home = () => {
  const { userData, setAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [entryBalanceInfo, setEntryBalanceInfo] = useState<Balance>({
    type: "entry",
    total: 0,
  });
  const [exitBalanceInfo, setExitBalanceInfo] = useState<Balance>({
    type: "exit",
    total: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function getBalance() {
      try {
        setLoading(true);
        const response = await getTransactionBalance();

        if (response.status === 200) {
          const entry = response.data.balance.find(
            (b: Balance) => b.type === "entry",
          ) || { type: "entry", total: 0 };
          const exit = response.data.balance.find(
            (b: Balance) => b.type === "exit",
          ) || { type: "exit", total: 0 };

          setEntryBalanceInfo(entry);
          setExitBalanceInfo(exit);
          return;
        }

        if (response.status === 401) {
          setAuthenticated(false);
          navigate("/");
          return;
        }

        toast.error("Houve um erro ao buscar informações de saldo.");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getBalance();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const chartData = [
    {
      name: "Entradas",
      value: Number(entryBalanceInfo?.total || 0),
      fill: "#16a34a",
    },
    {
      name: "Saídas",
      value: Number(exitBalanceInfo?.total || 0),
      fill: "#ef4444",
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-xl dark:text-gray-200">
        Olá, {userData && userData.name}!
      </h1>
      <div className="flex flex-col gap-5">
        <h2 className="text-lg dark:text-gray-200 text-gray-700">
          Saldo total das movimentações.
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-10 dark:text-gray-200 text-gray-700">
          <div className="flex flex-row min-w-40 items-center rounded-lg border border-gray-400 bg-gray-300 dark:border-gray-600 dark:bg-gray-700">
            <div className="flex items-center w-max p-3 text-green-600">
              <FaLongArrowAltUp />
            </div>
            <div className="flex flex-col p-2 ml-2 text-center pr-10">
              <span>Entrada</span>
              <strong>{formatAmount(entryBalanceInfo?.total || 0)}</strong>
            </div>
          </div>
          <div className="flex flex-row min-w-40 items-center rounded-lg border border-gray-400 bg-gray-300 dark:border-gray-600 dark:bg-gray-700">
            <div className="flex items-center w-max p-3 text-red-500">
              <FaLongArrowAltDown />
            </div>
            <div className="flex flex-col p-2 ml-2 text-center pr-10">
              <span>Saída</span>
              <strong>{formatAmount(exitBalanceInfo?.total || 0)}</strong>
            </div>
          </div>

          <div className="flex flex-row min-w-40 items-center rounded-lg border border-gray-400 bg-gray-300 dark:border-gray-600 dark:bg-gray-700">
            <div className="flex items-center w-max p-3">
              <FaWallet />
            </div>
            <div className="flex flex-col p-2 ml-2 text-center pr-10">
              <span>Saldo</span>
              <strong>
                {formatAmount(
                  (entryBalanceInfo?.total || 0) -
                    (exitBalanceInfo?.total || 0),
                )}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {!loading ? (
        <PieChart
          width={400}
          height={400}
          className="z-0 ml-2 sm:ml-10 md:ml-20"
        >
          <Pie data={chartData} dataKey="value" nameKey="name" />
          <Legend />
          <Tooltip formatter={(value: any) => formatAmount(value)} />
        </PieChart>
      ) : null}
    </div>
  );
};
