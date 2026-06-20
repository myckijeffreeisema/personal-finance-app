import { parsePriceToInt } from "./formatter.js";
import { updateUI } from "./main.js";
import { toast } from "./ui.js";
import { createTransaction } from "./util.js";
import { validateFormData } from "./validator.js";

/**
 * @param {Event} e 
 */
function extractFormData(e) {
    return {
        transactionName: e.target.transactionName.value,
        transactionValue: e.target.transactionValue.value,
        transactionCategory: e.target.transactionCategory.value
    }
}


/**
 * 
 * @param {Event} e 
 * @param {object} state 
 */
export const handleSubmit = (e, state) => {
    e.preventDefault();
    const { transactionName, transactionValue, transactionCategory } = extractFormData(e);
    let error = validateFormData(transactionName, transactionValue, transactionCategory);
    if (error) {
        return;
    }

    const toUpdate = state.action === "update";

    if (!toUpdate) {
        let transaction = createTransaction(transactionName, parsePriceToInt(transactionValue), transactionCategory);
        state.transactions.push(transaction);
        toast.success("Transação adiconada")
    } else {
        let newTransaction = { transactionName, transactionValue: parsePriceToInt(transactionValue), transactionCategory };
        state.transactions = state.transactions.map(t => {
            if (t.id === state.currentId) {
                return { ...t, ...newTransaction };
            }
            return t;
        });

        state.setCurrentId(null);
        state.setAction("");
        toast.success("Transação atualizada")
    }

    e.target.reset();
    updateUI()
}