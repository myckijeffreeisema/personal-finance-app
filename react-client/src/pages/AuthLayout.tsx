import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { Loader } from "../components/Loader";
import { FaMoon, FaWallet } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import { MdSunny } from "react-icons/md";

export const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading]);

  if (isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-dvh">
      <div className="flex w-full bg-gray-800 h-20 border">
        <div className="flex mx-auto max-w-250 w-full">
          <div className="flex w-full p-6">
            <Link
              to={`/auth`}
              className="flex gap-3 text-white items-center font-extrabold text-2xl w-full"
            >
              <FaWallet />
              <span className="hidden sm:flex">.Wallet</span>
            </Link>
          </div>
          <div className="flex items-center text-white">
            <button className="text-xl cursor-pointer" onClick={toggleTheme}>
              {theme === "dark" ? <MdSunny /> : <FaMoon />}
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center min-h-[calc(100dvh-80px)] p-4">
        <Outlet />
      </div>
    </div>
  );
};
