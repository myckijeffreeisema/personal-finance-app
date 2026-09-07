import { useEffect, useState } from "react";
import { AuthContext, type User } from "../context/AuthContext";
import { getUserInfo } from "../helper/user.api";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        setLoading(true);
        const data = await getUserInfo();
        if (data.status === 200 && data.data) {
          setUserData({
            name: data.data.name,
            email: data.data.email,
            createdAt: data.data.createdAt,
            id: data.data.id,
          });
          setAuthenticated(true);
          return;
        }
        setAuthenticated(false);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, userData, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
