"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CookiesProvider } from "react-cookie";
import { SidebarProvider } from "./ui/sidebar";
import { ChatProvider } from "@/context/chat";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <CookiesProvider>
        <QueryClientProvider client={client}>
          <SidebarProvider>
            <ChatProvider>{children}</ChatProvider>
          </SidebarProvider>
        </QueryClientProvider>
      </CookiesProvider>
      <Toaster position="top-center" />
    </GoogleOAuthProvider>
  );
}
