import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { ChatMember } from "@/types/types";

export const getSession = async (): Promise<
  (ChatMember & { exp?: number }) | null
> => {
  const cookieStore = cookies();
  const session = (await cookieStore).get("token")?.value;
  if (!session) return null;
  const decoded = decodeJwt(session) as ChatMember;
  return decoded;
};
