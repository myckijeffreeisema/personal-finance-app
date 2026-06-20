import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { SlWallet } from "react-icons/sl";


const Header = ({ entry, exit, balance }) => {

  function formatValue(value) {
    let v = Intl.NumberFormat("PT-BR", {
      currency: "BRL",
      style: "currency"
    }).format(value / 100);
    return v;
  }

  return (
    <div className="w-full flex items-center bg-gray-800 h-24 md:h-20 px-5">
      <div className="flex flex-col md:flex-row gap-3 md:gap-0 mx-auto max-w-300 w-full justify-between items-center">
        <a
          href="#"
          className="text-xl text-white font-extrabold tracking-wider"
        >
          .Wallet
        </a>

        <div className="flex items-center gap-3 md:gap-10 justify-between md:justify-normal">
          <div className="text-green-400 py-1 px-2 md:px-4 rounded-md bg-gray-900 flex items-center gap-1 text-sm ">
            <FaLongArrowAltUp />
            <span>{ formatValue(entry) }</span>
          </div>
          <div className="text-red-500 py-1 px-2 md:px-4 rounded-md bg-gray-900 flex items-center gap-1 text-sm ">
            <FaLongArrowAltDown /> <span>{ formatValue(exit) }</span>
          </div>
          <div className="text-white py-1 px-2 md:px-4 rounded-md bg-gray-900 flex items-center gap-2 text-sm">
            <SlWallet />
            <span>{ formatValue(balance) }</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
