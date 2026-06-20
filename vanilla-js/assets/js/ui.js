import { formatPrice } from "./formatter.js";
import { confirmationModalTemplate } from "./templates/confirmationModal.js";
import transactionCardTemplate from "./templates/transactionCard.js";
import { calculateBalance } from "./util.js";


export const toast = {
    toastContainer: document.querySelector(".toast"),
    /**
     * @param msg 
     */
    error: (msg) => {
        toast.showToast(msg, true)
    },
    success: (msg) => {
        toast.showToast(msg)
    },
    showToast: (msg, error = false) => {
        toast.toastContainer.classList.remove("hidden");
        toast.toastContainer.innerHTML = msg + ".";
        if (error) {
            toast.toastContainer.classList.add("toast-error");
            toast.toastContainer.classList.remove("toast-success");
        } else {
            toast.toastContainer.classList.remove("toast-error");
            toast.toastContainer.classList.add("toast-success");
        }

        setTimeout(() => {
            toast.toastContainer.classList.add("hidden");
        }, 3000);


    }
}

/**
 * Renderiza a lista de transações
 * @param {Array} transactions 
 */
export const showTransactionList = (transactions) => {
    const container = document.querySelector(".transactions");
    container.innerHTML = "";

    const frag = document.createDocumentFragment();

    if (transactions.length > 0) {
        transactions.forEach(t => {
            frag.append(transactionCardTemplate(t));
        })
    } else {
        const msg = document.createElement("span");
        msg.classList.add("list-empty");
        msg.textContent = "Não há transação cadastrada.";
        frag.append(msg);
    }

    container.append(frag);
}

/**
 * 
 * @param {Array} transactions 
 */
export function showBalanceInfo(transactions) {
    const { entrance, exit, balance } = calculateBalance(transactions);

    const entryBalanceEl = document.querySelector("#entry-balance");
    entryBalanceEl.textContent = `Entrada: ${formatPrice(entrance)}`;


    const exitBalanceEl = document.querySelector("#exit-balance");
    exitBalanceEl.textContent = `Saída: ${formatPrice(exit)}`;



    const finalBalanceEl = document.querySelector("#final-balance");
    finalBalanceEl.textContent = `Saldo: ${formatPrice(balance)}`;

}

/**
 * 
 * @param {Element} modalContainer 
 */
export function toggleModalContainer(modalContainer, transactionName) {
    modalContainer.classList.toggle("hidden");
    modalContainer.innerHTML = ""
    modalContainer.append(confirmationModalTemplate(transactionName));
}