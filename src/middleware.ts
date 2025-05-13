import { NextRequest, NextResponse } from "next/server";
import { getRefreshToken } from "./lib/utils/getRefreshToken";

export default async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken");

  if (!refreshToken) return;

  try {
    const { token, refreshToken: newRefreshToken } = await getRefreshToken(refreshToken.value);

    const response = NextResponse.next();

    // Set token cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      domain: process.env.COOKIES_DOMAIN,
      path: "/",
    });

    // Set refreshToken cookie
    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      domain: process.env.COOKIES_DOMAIN,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
