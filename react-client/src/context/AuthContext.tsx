import {
  createContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export type AuthContextType = {
  isAuthenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>;
  userData: User | undefined;
  loading: boolean;
};
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

