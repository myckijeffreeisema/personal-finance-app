import { handleSubmit } from "./form.js"
import { handleFormatValue } from "./formatter.js";
import { populateForm } from "./util.js";
import { state } from "./main.js"
import { handleConfirmationModal, handleFilterChange, handleListActions, handlerFormReset, handleSortArgChange } from "./service.js";


// Seleção dos elementos no DOM
export const DOM = {
    form: document.querySelector("#transactionForm"),
    transactionValue: document.querySelector("#transactionValue"),
    order: document.querySelector("#order"),
    filter: document.querySelector("#filter"),
    transactionListContainer: document.querySelector(".transactions"),
    resetFormBtn: document.querySelector(".reset-form"),
    confirmationModal: document.querySelector(".confirmation-modal"),
}

// Evento de envio do formulário
DOM.form.addEventListener("submit", (e) => handleSubmit(e, state));


// Evento de formatação  de moeda
DOM.transactionValue.addEventListener("input", handleFormatValue);


// Evento de mudança de filtro
DOM.filter.addEventListener("change", (e) => handleFilterChange(e, state));


// Evento de mudança de ordenação
DOM.order.addEventListener("change", (e) => handleSortArgChange(e, state));


// Event building de card de transações
DOM.transactionListContainer.addEventListener("click", (e) => handleListActions(e, DOM.form, state, DOM.confirmationModal));


// Limpa o formulário
DOM.resetFormBtn.addEventListener("click", (e) => handlerFormReset(e, DOM.form, state));


// 
DOM.confirmationModal.addEventListener("click", (e) => handleConfirmationModal(e, state, DOM.confirmationModal))