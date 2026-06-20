import { toast } from "./ui.js";

export function validateFormData(transactionName, transactionValue, transactionCategory) {
    if (!transactionName || transactionName.trim().length < 1) {
        toast.error("O nome da transação é obrigatório")
        return true;
    }

    
    if (transactionValue.trim() === "" || transactionValue.trim() === "R$ 0,00") {
        toast.error("O valor da transação é obrigatório")
        return true;
    }

    if (transactionCategory !== "entry" && transactionCategory !== "exit") {
        toast.error("A categoria da transação precisa ser válida")
        return true;
    }
    return false;
}