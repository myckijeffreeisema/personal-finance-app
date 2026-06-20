import { formatPrice } from "../formatter.js";

const editBtnIcon = `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#e2d73e" > <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" ></g> <g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#e2d73e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="rgb(121, 109, 1)73e" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" ></path> </g> </svg>`;
const removeBtnIcon = `<svg width="20px" height="20px" viewBox="0 0 1024 1024" fill="#c92828" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#fff" > <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" ></g> <g id="SVGRepo_iconCarrier"> <path d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z" fill="" ></path> <path d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z" fill="" ></path> </g> </svg>`;
const arrowUpIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" > <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" ></g> <g id="SVGRepo_iconCarrier"> <path d="M7.33199 7.68464C6.94146 8.07517 6.3083 8.07517 5.91777 7.68464C5.52725 7.29412 5.52725 6.66095 5.91777 6.27043L10.5834 1.60483C11.3644 0.823781 12.6308 0.82378 13.4118 1.60483L18.0802 6.27327C18.4707 6.66379 18.4707 7.29696 18.0802 7.68748C17.6897 8.078 17.0565 8.078 16.666 7.68748L13 4.02145V21.9999C13 22.5522 12.5523 22.9999 12 22.9999C11.4477 22.9999 11 22.5522 11 21.9999V4.01666L7.33199 7.68464Z" fill="#ffffff" ></path> </g> </svg>`;
const arrowDownIcon = `<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000" > <g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" ></g> <g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="arrow-down"> <g> <polyline data-name="Right" fill="none" id="Right-2" points="7 16.4 12 21.5 17 16.4" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" ></polyline> <line fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="2.5" y2="19.2" ></line> </g> </g> </g> </g> </svg>`;

export default function transactionCardTemplate(transaction) {
    const card = document.createElement("div");
    card.dataset.id = transaction.id;
    const transactionCategory = transaction.transactionCategory === "entry" ? "entry" : "exit";
    card.classList.add("card");
    card.classList.add(transactionCategory);


    const cardIcon = document.createElement("span");
    cardIcon.classList.add("card-icon");
    card.innerHTML = transactionCategory === "entry" ? arrowUpIcon : arrowDownIcon;
    card.append(cardIcon);

    
    const cardTitle = document.createElement("h2");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = transaction.transactionName;
    card.append(cardTitle);


    const cardPrice = document.createElement("strong");
    cardPrice.classList.add("card-price");
    cardPrice.textContent = formatPrice(transaction.transactionValue);
    card.append(cardPrice);


    const cardCategory = document.createElement("span");
    cardCategory.classList.add("card-category");
    cardCategory.textContent = transactionCategory === "entry" ? "Entrada" : "Saída";
    card.append(cardCategory);


    const cardActions = document.createElement("div");
    cardActions.classList.add("actions");

    const cardEditBtn = document.createElement("button");
    cardEditBtn.classList.add("edit-btn");
    cardEditBtn.innerHTML = editBtnIcon;

    const cardRemoveBtn = document.createElement("button");
    cardRemoveBtn.classList.add("remove-btn");
    cardRemoveBtn.innerHTML = removeBtnIcon;

    cardActions.append(cardEditBtn);
    cardActions.append(cardRemoveBtn);

    card.append(cardActions);

    return card;
}