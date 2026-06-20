import {  useState } from "react";
import {
  createTransactionObject,
  formatAmountValue,
  formatValueInput,
  parseValueInput,
  validateFormData
} from "../hooks/helper";

const AddTransactionForm = ({
  open = false,
  onClickCap,
  onSubmit,
  transaction,
  action
}) => {
  const [formData, setFormData] = useState({
    name: transaction?.name || "",
    amount: transaction?.amount || 0,
    category: transaction?.category || "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "amount" ? parseValueInput(value) : value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = e.target;
    if (validateFormData(formData)) {
      return;
    }
    const transaction = createTransactionObject({
      name: formData.name.value,
      amount: parseValueInput(formData.amount.value),
      category: formData.category.value,
    });
    await onSubmit(transaction);
    setFormData({
      name: "",
      amount: 0,
      category: ""
    })
  }

  return (
    <div
      id="form_modal_container"
      onClickCapture={onClickCap}
      className={`${open ? "flex" : "hidden"} justify-center items-center min-h-dvh fixed top-24 md:top-20 left-0 backdrop-blur-xs w-full p-5`}
    >
      <div className="custom-form-hover flex flex-col gap-7 p-8 border custom-shadow border-gray-700 bg-gray-800 w-full max-w-140 -translate-y-20 rounded-lg">
        <h1 className="text-xl text-gray-200 font-semibold">
          {action === "update" ? "Atualizar transação" : "Cadastrar nova transação"}
        </h1>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-200">
              Nome:
            </label>
            <input
              className="focus:ring focus:ring-blue-500 px-2 py-3 rounded-md border border-gray-700 placeholder:text-gray-500 outline-none text-gray-100"
              type="text"
              placeholder="Nome da transação..."
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-200">
              Valor:
            </label>
            <input
              className="focus:ring focus:ring-blue-500 px-2 py-3 rounded-md border border-gray-700 placeholder:text-gray-500 outline-none text-gray-100"
              type="text"
              placeholder="R$ 0,00"
              name="amount"
              id="amount"
              value={formatAmountValue(formData.amount)}
              onChange={handleChange}
              onInput={formatValueInput}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-200">
              Categoria:
            </label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="focus:ring focus:bg-gray-700 focus:ring-blue-500 px-2 py-3 rounded-md border border-gray-700 placeholder:text-gray-500 outline-none text-gray-100"
            >
              <option value="">Selecione uma categoria</option>
              <option value="entry">Entrada</option>
              <option value="exit">Saída</option>
            </select>
            <button
              type="submit"
              className="py-3 w-full bg-blue-600 text-white mt-5 rounded-md cursor-pointer hover:bg-blue-500 duration-500"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionForm;
