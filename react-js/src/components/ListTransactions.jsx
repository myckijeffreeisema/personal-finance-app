import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { formatAmountValue } from "../hooks/helper";

const ListTransactions = ({
  transactions,
  updateCategory,
  updateOrderBy,
  openModal
}) => {
  return (
    <div className="w-full flex flex-col justify-center px-5 overflow-x-hidden">
      <div className="flex flex-col w-full max-w-300 mx-auto rounded-t-lg border border-gray-700 bg-slate-700 min-w-93.75">

        {/* Cabeçalho da Lista */}
        <div className="w-full bg-blue-600 rounded-t-lg flex gap-10 p-3 ">
          <select
            name="categoryFilter"
            id="categoryFilter"
            onChange={(e) => updateCategory(e.target.value)}
            className=" text-gray-100 outline-none focus:bg-blue-700 border border-gray-300 p-1 rounded-lg"
          >
            <option value="all">Todos</option>
            <option value="entry">Entrada</option>
            <option value="exit">Saída</option>
          </select>
          <select
            name="orderByFilter"
            id="orderByFilter"
            onChange={(e) => updateOrderBy(e.target.value)}
            className=" text-gray-100 outline-none focus:bg-blue-700 border border-gray-300 p-1 rounded-lg"
          >
            <option value="lastIn">Mais Recente</option>
            <option value="firstIn">Mais Antigo</option>
            <option value="bigger">Maior Valor</option>
            <option value="smaller">Menor Valor</option>
          </select>
        </div>

        {/* Lista */}
        <div className="flex flex-col">
          {transactions.map((t, idx) => (
            <div
              className="card flex items-center flex-row w-full not-odd:bg-gray-800 py-2 px-2 h-12 gap-2"
              key={idx}
              data-id={t.id}
              onClick={openModal}
            >
              <span
                className={`flex items-center ${t.category === "entry" ? "text-green-600" : "text-red-600"}`}
              >
                {t.category === "entry" ? (
                  <FaLongArrowAltUp />
                ) : (
                  <FaLongArrowAltDown />
                )}
              </span>
              <h3 className="flex-3 text-md overflow-hidden whitespace-nowrap text-ellipsis text-white ">
                {t.name}
              </h3>
              <span
                className={`flex-1 ${t.category === "entry" ? "text-green-600" : "text-red-600"} hidden  md:flex`}
              >
                {t.category === "entry" ? "Entrada" : "Saída"}
              </span>
              <span className="flex-1 font-bold text-white">
                {formatAmountValue(t.amount)}
              </span>
              <button data-btn="show_modal_btn" className="flex-1 px-2 bg-blue-600 text-white rounded-sm cursor-pointer hover:bg-blue-500 py-1">
                Visualizar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListTransactions;
