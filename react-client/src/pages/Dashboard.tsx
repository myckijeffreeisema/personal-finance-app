import { Link, Outlet, useNavigate } from "react-router-dom";
import { FaList, FaMoon, FaUserAlt, FaWallet } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import { MdAddBox, MdLogout, MdSunny } from "react-icons/md";
import { GoHomeFill } from "react-icons/go";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { Loader } from "../components/Loader";

export const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, setAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth");
    }
  }, [loading, isAuthenticated, navigate]);


  function handleLogout(){
    localStorage.removeItem("jwt-token");
    setAuthenticated(false);
    window.location.href = "/auth"
  }

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-dvh bg-gray-200 dark:bg-gray-800">
      <aside className="flex-1 bg-gray-800 min-h-dvh fixed top-0 left-0 w-20 sm:w-50 lg:w-80 md:w-64 border-r border-gray-700 z-10">
        <div className="flex w-full p-6 border-b border-gray-700">
          <Link
            to={`/`}
            className="flex gap-3 text-white items-center font-extrabold text-2xl w-full"
          >
            <FaWallet />
            <span className="hidden sm:flex">.Wallet</span>
          </Link>
        </div>
        <nav className="flex flex-col">
          <ul className="text-white gap-1">
            <li className="text-lg">
              <Link
                to={`/`}
                className="flex gap-2 items-center p-6 py-3 hover:bg-gray-700 cursor-pointer duration-500"
              >
                <GoHomeFill />
                <span className="hidden sm:flex">Home</span>
              </Link>
            </li>
            <li className="text-lg">
              <Link
                to={`/transactions`}
                className="flex gap-2 items-center px-6 py-3 hover:bg-gray-700 cursor-pointer duration-500"
              >
                <FaList />
                <span className="hidden sm:flex">Lista de Transações</span>
              </Link>
            </li>
            <li className="text-lg">
              <Link
                to={`/new-transaction`}
                className="flex gap-2 items-center px-6 py-3 hover:bg-gray-700 cursor-pointer duration-500"
              >
                <MdAddBox />
                <span className="hidden sm:flex">Nova Transação</span>
              </Link>
            </li>
            <li className="text-lg">
              <Link
                to={`/profile`}
                className="flex gap-2 items-center px-6 py-3 hover:bg-gray-700 cursor-pointer duration-500"
              >
                <FaUserAlt />
                <span className="hidden sm:flex">Minha Conta</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-6 flex gap-5 sm:flex-row flex-col fixed bottom-0 left-0 w-20 sm:w-50 md:w-64 lg:w-80 border-t border-gray-700 sm:items-center text-white">
          <button onClick={handleLogout} className="text-xl cursor-pointer">
            <MdLogout />
          </button>
          <button className="text-xl cursor-pointer" onClick={toggleTheme}>
            {theme === "dark" ? <MdSunny /> : <FaMoon />}
          </button>
        </div>
      </aside>
      <main className="ml-14 sm:ml-64 lg:ml-80 flex w-full p-6 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};
