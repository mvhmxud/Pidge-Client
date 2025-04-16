import { decodeJwt } from "jose";

export const isTokenExpired = async (token: string) => {
  const decoded = decodeJwt(token);
  return decoded.exp ? decoded.exp < Date.now() / 1000 : true;
}; 