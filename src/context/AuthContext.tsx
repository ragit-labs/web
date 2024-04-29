import React, { createContext, useContext, useState, useMemo } from "react";
import Cookies from "js-cookie";
import { IUser } from "@/types/user";
import { ReactFCWithChildren } from "../types";
import { useQuery } from "react-query";
import { fetchUser } from "@/api/auth";

interface AuthContextType {
  user: IUser | null;
  isAuthenticated: boolean;
  setUser: (user: IUser | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<ReactFCWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = !!user;

  const {
    isLoading,
    error,
    data: response,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });

  const token = Cookies.get("accessToken");

  useMemo(() => {
    if (token) {
      if (!user) {
        if (!isLoading) {
          if (response) {
            setUser(response);
          } else {
            console.log("Remove....");
            Cookies.remove("accessToken");
          }
        }
      }
    } else {
      setUser(null);
    }
  }, [token, response, error, isLoading]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
