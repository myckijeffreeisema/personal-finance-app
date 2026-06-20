import { toast } from "sonner";


export function validateFormData(formData) {
    if (formData.name.value === "") {
        toast.error("O nome é obrigatório.", { position: "top-center" });
        return true;
    }

    if (parseValueInput(formData.amount.value) < 1) {
        toast.error("Informe um valor.", { position: "top-center" });
        return true;
    }

    if (formData.category.value === "") {
        toast.error("Selecione uma categoria.", { position: "top-center" });
        return true;
    }

    let validCategories = ["entry", "exit"];
    if (!validCategories.includes(formData.category.value)) {
        toast.error("Categoria inválida.", { position: "top-center" });
        return true;
    }
    
    


    return false;
}

export function parseValueInput(v) {
    if (!v) return 0;
    const cleanValue = String(v).replace(/\D/g, "");
    return Number(cleanValue); 
}

export function formatValueInput(e) {
    let value = `${e.target.value}`.replace(/\D/g, "");
    value = Number(value / 100).toFixed(2);
    const formater = Intl.NumberFormat("PT-BR", {
        currency: "BRL",
        style: "currency",
    });
    e.target.value = formater.format(Number(value));
}

export function formatAmountValue(v) {
    let value = Number(v / 100).toFixed(2);
    const formater = Intl.NumberFormat("PT-BR", {
        currency: "BRL",
        style: "currency",
    });
    return formater.format(value);
}

export function createTransactionObject(transactionData) {
    let now = new Date();
    return {
        id: crypto.randomUUID(),
        ...transactionData,
        createdAt: now.toISOString()
    }
}


/**
 * 
 * @param {string} filter 
 * @param {Array} transactions 
 */
export function filterTransactions(filter, transactions) {
    const isEntry = filter === "entry";
    const isExit = filter === "exit";

    if (isEntry) {
        return transactions.filter(t => t.category === "entry");
    }
    if (isExit) {
        return transactions.filter(t => t.category === "exit");
    }
    return transactions;
}

/**
 * 
 * @param {Array} transactions 
 */
export function sortTransactions(sortBy, transactions) {
    const firstIn = sortBy === "firstIn";
    const lastIn = sortBy === "lastIn";
    const bigger = sortBy === "bigger";
    const smaller = sortBy === "smaller";

    if (firstIn) {
        return transactions.toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    if (lastIn) {
        return transactions.toSorted((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (smaller) {
        return transactions.toSorted((a, b) => a.amount - b.amount);
    }

    if (bigger) {
        return transactions.toSorted((a, b) => b.amount - a.amount);
    }

    return transactions;
}
