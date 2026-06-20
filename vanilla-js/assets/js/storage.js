export function getLastId() {
    let lastID = localStorage.getItem("lastID");
    if (!lastID) {
        localStorage.setItem("lastID", JSON.stringify(1));
        return 1;
    }
    let newId = Number(lastID) + 1;
    localStorage.setItem("lastID", JSON.stringify(newId));
    return newId;
}



export function storeTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

export function listTransactions(transactions) {
    return JSON.parse(localStorage.getItem("transactions")) ?? [];
}