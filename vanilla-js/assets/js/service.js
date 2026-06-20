import { populateForm } from "./util.js";
import { updateUI } from "./main.js";
import { toggleModalContainer } from "./ui.js";

/**
 * 
 * @param {Event} e 
 * @param {*} state 
 */
export function handleFilterChange(e, state) {
    if (e.target.value === state.currentFilter) {
        return;
    }

    state.setCurrentFilter(e.target.value);
    updateUI();
}


/**
 * 
 * @param {Event} e 
 * @param {*} state 
 */
export function handleSortArgChange(e, state) {
    if (e.target.value === state.currentSortArg) {
        return;
    }

    state.setCurrentSortArg(e.target.value);
    updateUI();
}


/**
 * 
 * @param {Event} e 
 * @param {*} state 
 */
export function handleListActions(e, form, state, modalContainer) {
    const card = e.target.closest(".card");
    const id = Number(card.dataset.id);
    if (!card) return;

    const editBtn = e.target.closest(".edit-btn");
    const removeBtn = e.target.closest(".remove-btn");


    let transaction = state.transactions.find(t => t.id === id);
    state.setCurrentId(id);


    if (!editBtn && !removeBtn) return;


    if (editBtn) {
        populateForm(form, transaction);
        state.setAction("update");
        form.elements["transactionName"].focus();
        return;
    }

    if (removeBtn) {
        toggleModalContainer(modalContainer, transaction.transactionName);
        state.setAction("delete");
        return;
    }
}


/**
 * 
 * @param {Event} e 
 * @param {Element} form 
 * @param {object} state 
 */
export function handlerFormReset(e, form, state) {
    form.reset();
    state.setCurrentId(null);
    state.setAction("");
}


/**
 * 
 * @param {Event} e 
 * @param {*} state 
 * @param {Element} confirmationModal 
 */
export function handleConfirmationModal(e, state, confirmationModal) {
    const isBackDrop = e.target === confirmationModal;
    const confirmNo = e.target.classList.contains("confirmNo");
    const confirmYes = e.target.classList.contains("confirmYes");

    if (isBackDrop || confirmNo) {
        toggleModalContainer(confirmationModal);
    }


    if (confirmYes) {
        state.transactions = state.transactions.filter(t => t.id != state.currentId);
        updateUI();
        toggleModalContainer(confirmationModal);
    }


    state.setCurrentId(null);
    state.setAction("");
}