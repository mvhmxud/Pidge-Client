import { ReactNode } from "react";
import { getSession } from "@/lib/utils/getSession";
import { AuthProvider } from "@/context/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ChatIdLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/");
  
  return <AuthProvider session={session}>{children}</AuthProvider>;
}

