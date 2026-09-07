import { useAuth } from "../hooks/useAuth";

export const Profile = () => {
  const { userData } = useAuth();

  // Inicial do nome do usuário para logo
  const initial = userData?.name.slice(0, 1).toUpperCase();
  
  return (
    <div className="w-full flex flex-col gap-5 ">
      <h1 className="text-gray-700 dark:text-gray-200 text-2xl">Minha conta</h1>
      <div className="flex gap-5 w-full bg-white dark:bg-gray-700 p-4 rounded-lg items-center border dark:border-gray-600 border-gray-300">
        <div className="flex justify-center items-center bg-blue-500 text-white rounded-[50%] w-20 h-20 text-3xl font-bold">
          {initial}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl text-gray-700 dark:text-gray-200">
            {userData?.name}
          </h2>
          <span className="text-lg text-gray-700 dark:text-gray-200">
            {userData?.email}
          </span>
          <span className="px-2 py-1 text-xs font-bold bg-green-600 text-white rounded-lg w-max">
            Conta ativa
          </span>
        </div>
      </div>
    </div>
  );
};
