import React, { createContext, useContext } from "react";
import { ReactFCWithChildren } from "../types";
import { useGetUserAuthGetGet } from "@/clients/api/ragitApIComponents";
import { TUser } from "@/clients/api/ragitApISchemas";
import { useAuth } from "./AuthContext";

interface UserContextType {
  user: TUser | undefined;
  isUserLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<ReactFCWithChildren> = ({ children }) => {
  const { token } = useAuth();

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUserAuthGetGet({}, { enabled: !!token });

  if (isUserLoading) {
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ user, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
