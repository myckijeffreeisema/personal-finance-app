export function confirmationModalTemplate(transactionName) {
    const modalConfirmationContent = document.createElement("div");
    modalConfirmationContent.classList.add("confirmation-modal-content");

    const title = document.createElement("h3");
    title.textContent = `Deseja remover "${transactionName}"?`;
    modalConfirmationContent.append(title);

    const options = document.createElement("div");
    options.classList.add("options");


    const confirmYesBtn = document.createElement("button");
    confirmYesBtn.classList.add("confirmYes");
    confirmYesBtn.textContent = "Remover";
    options.append(confirmYesBtn);

    const confirmNoBtn = document.createElement("button");
    confirmNoBtn.classList.add("confirmNo");
    confirmNoBtn.textContent = "Cancelar";
    options.append(confirmNoBtn);

    modalConfirmationContent.append(options);

    return modalConfirmationContent;
}