import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ReactFCWithChildren } from "../types";
import { useNavigate } from "react-router-dom";
import {
  useAuthDiscordAuthDiscordPost,
  useLoginAuthLoginPost,
} from "@/clients/api/ragitApIComponents";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  token: string | undefined;
  loginAction: (email: string, password: string) => Promise<void>;
  logoutAction: () => void;
  discordLoginAction: (
    code: string,
    permissions: string,
    guild_id: string,
    redirect_uri: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<ReactFCWithChildren> = ({ children }) => {
  const { toast } = useToast();
  const [token, setToken] = useState<string | undefined>(
    Cookies.get("accessToken"),
  );

  const navigate = useNavigate();

  const loginUser = useLoginAuthLoginPost();

  const discordLogin = useAuthDiscordAuthDiscordPost();

  useEffect(() => {}, [token]);

  const loginAction = async (email: string, password: string) => {
    try {
      loginUser.mutate(
        { body: { email, password } },
        {
          onSuccess: (tokenResponse) => {
            Cookies.set("accessToken", tokenResponse.access_token);
            setToken(tokenResponse.access_token);
          },
          onError: (error) => {
            toast({
              title: "Unable to login. Please check email or password.",
            });
            console.log(error);
          },
        },
      );
    } catch (error) {
      toast({
        title: "Unable to login. Please check email or password.",
      });
    }
  };

  const discordLoginAction = async (
    code: string,
    permissions: string,
    guild_id: string,
    redirect_uri: string,
  ) => {
    try {
      discordLogin.mutate(
        {
          body: {
            code,
            permissions,
            guild_id,
            redirect_uri: redirect_uri,
          },
        },
        {
          onSuccess: (response) => {
            Cookies.set("accessToken", response.access_token);
            setToken(response.access_token);
          },
          onError: (error) => {
            toast({
              title: "Unable to login.",
            });
            console.log(error);
          },
        },
      );
    } catch (error) {
      toast({
        title: "Unable to login.",
      });
    }
  };

  const logoutAction = () => {
    setToken("");
    Cookies.remove("accessToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, loginAction, logoutAction, discordLoginAction }}
    >
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
