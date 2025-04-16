"use client";
import { createContext, useContext, useState } from "react";
import { UserToken } from "@/types/types";

interface AuthContextType {
  user: UserToken | null;
  setUser: (user: UserToken | null) => void;
}

// TODO: get default value from cookies

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserToken | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
