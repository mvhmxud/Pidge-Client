import { decodeJwt } from "jose";
import { cookies } from "next/headers";

export const getSession = async () => {
    const cookieStore = await cookies();
    const session = cookieStore.get('token')?.value;
    if (!session) return null;
    const decoded = decodeJwt(session); 
    return decoded;
};



