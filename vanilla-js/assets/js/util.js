import { getLastId } from "./storage.js"
import { formatPrice } from "./formatter.js"

export function createTransaction(transactionName, transactionValue, transactionCategory) {
    let now = new Date();
    return {
        id: getLastId(),
        transactionName,
        transactionValue,
        transactionCategory,
        createdAt: now.toUTCString()
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
        return transactions.filter(t => t.transactionCategory === "entry");
    }
    if (isExit) {
        return transactions.filter(t => t.transactionCategory === "exit");
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
        return transactions.toSorted((a, b) => a.transactionValue - b.transactionValue);
    }

    if (bigger) {
        return transactions.toSorted((a, b) => b.transactionValue - a.transactionValue);
    }

    return transactions;
}

/**
 * 
 * @param {Array} transactions 
 */
export function calculateBalance(transactions) {
    const entrance = transactions.filter(t => t.transactionCategory === "entry")
        .reduce((pre, cur) => pre += cur.transactionValue, 0);

    const exit = transactions.filter(t => t.transactionCategory === "exit")
        .reduce((pre, cur) => pre += cur.transactionValue, 0);

    const balance = entrance - exit;

    return { entrance, exit, balance };
}

/**
 * 
 * @param form 
 * @param {*} transaction 
 */
export function populateForm(form, transaction) {
    let transactionName = form.elements["transactionName"];
    transactionName.value = transaction.transactionName;


    let transactionValue = form.elements["transactionValue"];
    transactionValue.value = formatPrice(transaction.transactionValue);


    let transactionCategory = form.elements["transactionCategory"];
    transactionCategory.value = transaction.transactionCategory;


}