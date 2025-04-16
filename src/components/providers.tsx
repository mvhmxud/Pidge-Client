"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/context/auth";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <AuthProvider>{children}</AuthProvider>
    </GoogleOAuthProvider>
  );
}
