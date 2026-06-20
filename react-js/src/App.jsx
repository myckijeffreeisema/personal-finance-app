import { useEffect, useState } from "react";
import AddTransactionButton from "./components/AddTransactionButton";
import Header from "./components/Header";
import AddTransactionForm from "./components/AddTransactionForm";
import { calculateBalance } from "./hooks/transactionService";
import { getAlltransactions, saveTransactions } from "./hooks/storage";
import ListTransactions from "./components/ListTransactions";
import { Toaster, toast } from "sonner";
import { filterTransactions, sortTransactions } from "./hooks/helper";
import TransactionModal from "./components/TransactionModal";

const App = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [orderByFilter, setOrderByFilter] = useState("lastIn");
  const [currentId, setCurrentId] = useState(null);
  const [action, setAction] = useState(null);

  // Filtra a lista de transações
  const filteredTransactions = sortTransactions(
    orderByFilter,
    filterTransactions(categoryFilter, transactions),
  );

  // Busca uma transação pelo ID atual
  const currentTransaction = currentId
    ? transactions.find((t) => String(t.id) === String(currentId))
    : null;

  // Calcula as informações de movimentações
  const balanceInfo = calculateBalance(transactions) ?? {
    entry: 0,
    exit: 0,
    balance: 0,
  };

  // Contrala a abertura e fechamento do modal
  function toggleModal(e, modal) {
    let target = e.target;

    const canToggleModal = {
      formModal: [
        "form_modal_container",
        "open_form_modal_btn",
        "update_transaction_btn",
      ],
      transactionModal: ["transaction_modal_container"],
    };

    if (modal === "formModal") {
      if (canToggleModal.formModal.includes(target.id)) {
        setFormOpen(!isFormOpen);
        setAction("update")
        setTransactionModalOpen(false);
        if (target.id !== "update_transaction_btn") {
          setCurrentId(null);
          setAction(null);
        }
      }
    }
    if (modal === "transactionModal") {
      if (canToggleModal.transactionModal.includes(target.id)) {
        setTransactionModalOpen(!isTransactionModalOpen);
      }
    }
  }

  // Abre o modal de transação com os dados
  function showTransactionModal(e) {
    const target = e.target;
    if (target.dataset.btn === "show_modal_btn") {
      const transactionId = target.closest(".card").dataset.id;
      setCurrentId(transactionId);
      setTransactionModalOpen(true);
    }
  }

  // Busca os dados de transactions salvos
  useEffect(() => {
    async function getTransactions() {
      const data = await getAlltransactions();
      setTransactions(data);
    }
    getTransactions();
  }, []);

  // Salva a nova transação e atualiza o estado
  async function handleSaveTransaction(transaction) {
    let updateTransactions = [];

    if (currentId) {
      const newTransaction = { ...currentTransaction, ...transaction };
      updateTransactions = transactions.map((t) => {
        if (String(t.id) === String(currentId)) {
          return { ...t, ...newTransaction };
        }
        return t;
      });
      toast.success("Transação atualizada com sucesso.", {
        position: "top-center",
      });
      setCurrentId(null);
      setAction(null)
    }

    if (!currentId) {
      updateTransactions = [...transactions, transaction];
      toast.success("Transação adicionada com sucesso.", {
        position: "top-center",
      });
    }

    setTransactions(updateTransactions);
    await saveTransactions(updateTransactions);
    setFormOpen(false);
  }

  // Deleta uma transação
  async function handleDeleteTransaction() {
    const updateTransactions = transactions.filter((t) => t.id !== currentId);
    setTransactions(updateTransactions);
    await saveTransactions(updateTransactions);
    setCurrentId(null);
    setTransactionModalOpen(false);
    toast.success("Transação deletada com sucesso.", {
      position: "top-center",
    });
  }

  return (
    <div className="flex flex-col gap-5 min-h-dvh bg-gray-900">
      <Header
        entry={balanceInfo.entry}
        exit={balanceInfo.exit}
        balance={balanceInfo.balance}
      />
      <AddTransactionButton onClickOpen={(e) => toggleModal(e, "formModal")} />
      <AddTransactionForm
        open={isFormOpen}
        transaction={currentTransaction}
        onClickCap={(e) => toggleModal(e, "formModal")}
        onSubmit={handleSaveTransaction}
        key={currentId ?? "new"}
        action={action}
      />
      <ListTransactions
        transactions={filteredTransactions}
        categoryFilter={categoryFilter}
        orderByFilter={orderByFilter}
        updateCategory={(e) => setCategoryFilter(e)}
        updateOrderBy={(e) => setOrderByFilter(e)}
        openModal={showTransactionModal}
      />
      <TransactionModal
        open={isTransactionModalOpen}
        transaction={currentTransaction}
        onClickCap={(e) => toggleModal(e, "transactionModal")}
        openFormModal={(e) => toggleModal(e, "formModal")}
        deleteTransaction={handleDeleteTransaction}
      />
      <Toaster richColors theme="dark" />
    </div>
  );
};

export default App;
