"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/auth";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CookiesProvider } from "react-cookie";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <CookiesProvider>
        <AuthProvider>
          <QueryClientProvider client={client}>
              {children}
          </QueryClientProvider>
        </AuthProvider>
      </CookiesProvider>
      <Toaster />
    </GoogleOAuthProvider>
  );
}
