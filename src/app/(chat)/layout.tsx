import { ReactNode } from "react";
import { getSession } from "@/lib/utils/getSession";
import { AuthProvider } from "@/context/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();

  return {
    title: session ? `Pidge - Welcome Back ${session.username}` : "Pidge",
    description: "Pidge is a real-time chat app that helps you connect and chat with friends seamlessly, with online status, clean UI, and instant messaging.",
  };
}

export default async function AuthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/");

  return <AuthProvider session={session}>{children}</AuthProvider>;
}
