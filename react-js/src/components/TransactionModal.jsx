import { formatAmountValue } from "../hooks/helper";

const TransactionModal = ({
  transaction,
  open,
  onClickCap,
  openFormModal,
  deleteTransaction,
}) => {
  return (
    <div
      id="transaction_modal_container"
      onClick={(e) => onClickCap(e, "transactionModal")}
      className={`${open ? "flex" : "hidden"} justify-center items-center min-h-dvh fixed top-24 md:top-20 left-0 backdrop-blur-xs w-full p-5`}
    >
      <div className="custom-form-hover flex flex-col gap-7 p-8 border custom-shadow border-gray-700 bg-gray-800 w-full max-w-140 -translate-y-20 rounded-lg">
        {transaction && (
          <div className="flex flex-col gap-5">
            <h1 className="text-gray-100 text-xl">{transaction.name}</h1>
            <span
              className={`${transaction.category === "entry" ? "text-green-500" : "text-red-400"}`}
            >
              {transaction.category === "entry" ? "Entrada" : "Saída"}
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {formatAmountValue(transaction.amount)}
            </span>
            <div className="flex flex-row gap-3">
              <button
                onClick={openFormModal}
                id="update_transaction_btn"
                className="px-4 py-1 bg-amber-700 text-white cursor-pointer rounded-md hover:bg-amber-600 duration-300"
              >
                Atualizar
              </button>
              <button
                onClick={deleteTransaction}
                className="px-4 py-1 bg-red-700 text-white cursor-pointer rounded-md hover:bg-red-600 duration-300"
              >
                Deletar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;
