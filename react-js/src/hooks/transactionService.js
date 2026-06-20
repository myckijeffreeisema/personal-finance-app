
/**
 * Calcula os valores de entrada, saida e saldo
 * @param {Array} transactions
 */
export function calculateBalance(transactions) {
    let entry = transactions.filter(t => t.category === "entry").reduce((previous, current) => {
        return previous + current.amount;
    }, 0);
    
    let exit = transactions.filter(t => t.category === "exit").reduce((previous, current) => {
        return previous + current.amount;
    }, 0);

    let balance = entry - exit;

    return {entry, exit, balance}
}

