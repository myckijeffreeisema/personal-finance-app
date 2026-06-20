/**
 * Lista as transações salvas
 * @returns {Array}
 */
export async function getAlltransactions() {
    try {
        return JSON.parse(localStorage.getItem("transactions")) ?? [];
    } catch (error) {
        console.log("Erro ao listar transações. Erro: ", error);
        return [];
    }
}

/**
 * Salva as transações no Localstorage
 * @param {Array} transactions 
 */
export async function saveTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}