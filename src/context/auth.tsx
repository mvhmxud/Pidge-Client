"use client";

import { createContext, useContext } from "react";
import { ChatMember } from "@/types/types";

const AuthContext = createContext<ChatMember | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: ChatMember | null;
}) => {
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
};