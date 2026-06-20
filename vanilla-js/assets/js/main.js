import "./listener.js"
import { listTransactions, storeTransactions } from "./storage.js";
import { showBalanceInfo, showTransactionList } from "./ui.js";
import { filterTransactions, sortTransactions } from "./util.js";

export const state = {
    transactions: [],
    currentFilter: "all",
    currentSortArg: "lastIn",
    currentId: null,
    action: "",

    /**
     * @param {Array} transactions 
     */
    setTransactions: (transactions) => {
        state.transactions = transactions;
    },

    setCurrentFilter(filter) {
        state.currentFilter = filter;
    },

    setCurrentSortArg(sortArg) {
        state.currentSortArg = sortArg;
    },
    setCurrentId(id) {
        state.currentId = id;
    },
    setAction(action) {
        state.action = action;
    },
}

function parsedList() {
    const filteredTransactions = filterTransactions(state.currentFilter, state.transactions);
    const sortedTransactions = sortTransactions(state.currentSortArg, filteredTransactions);
    return sortedTransactions;
}

function save() {
    storeTransactions(state.transactions);
}

function render() {
    showTransactionList(parsedList());
    showBalanceInfo(state.transactions)
}

export function updateUI() {
    save();
    render();
}

function init() {
    state.setTransactions(listTransactions());
    updateUI()
}

init();