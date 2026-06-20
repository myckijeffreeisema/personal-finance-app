
export function handleFormatValue(e) {
    let value = `${e.target.value}`.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2)
    let formtedValue = Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency"
    }).format(value)
    e.target.value = formtedValue;
}

export function parsePriceToInt(price) {
    let p = `${price}`.trim().replace("R$", "").replace(" ", "").replace(",", "").replace(".", "");
    return Number(p);
}
/**
 * Formata o preço
 * @param {int} price 
 */
export function formatPrice(price) {
    let formtedValue = (Number(price) / 100).toFixed(2)
    formtedValue = Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency"
    }).format(formtedValue)
    return formtedValue;
}