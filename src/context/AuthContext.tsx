import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ReactFCWithChildren } from "../types";
import { useNavigate } from "react-router-dom";
import { useLoginAuthLoginPost } from "@/clients/api/ragitApIComponents";
import { TUser } from "@/clients/api/ragitApISchemas";

interface AuthContextType {
  user: TUser | undefined;
  token: string | undefined;
  loginAction: (email: string, password: string) => Promise<void>;
  logoutAction: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<ReactFCWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(
    Cookies.get("accessToken"),
  );

  const [user, setUser] = useState<TUser | null>(null);

  const navigate = useNavigate();

  const loginUser = useLoginAuthLoginPost();

  useEffect(() => {}, [token]);

  const loginAction = async (email: string, password: string) => {
    try {
      loginUser.mutate(
        { body: { email, password } },
        {
          onSuccess: (tokenResponse) => {
            console.log("accessToken", tokenResponse.access_token);
            Cookies.set("accessToken", tokenResponse.access_token);
            setToken(tokenResponse.access_token);
            setUser(tokenResponse.user);
          },
        },
      );
    } catch (error) {
      console.error("Hola", error);
    }
  };

  const logoutAction = () => {
    setToken("");
    Cookies.remove("accessToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logoutAction }}>
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

export const useToken = () => {
  const context = useContext(AuthContext);
  return context?.token;
};
