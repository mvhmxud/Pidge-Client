import { NextRequest, NextResponse } from "next/server";
import { getRefreshToken } from "./lib/utils/getRefreshToken";
// import { isTokenExpired } from "./lib/utils/isTokenExpired";

export default async function middleware(req: NextRequest) {
  console.log("AuthMiddleware ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅");

  // const session = req.cookies.get("token");
  const refreshToken = req.cookies.get("refreshToken");
  if (!refreshToken) return;
  // const isExpired = session?.value ? await isTokenExpired(session.value) : true;
    try {
      const { token, refreshToken: newRefreshToken } = await getRefreshToken(
        refreshToken.value
      );
      const response = NextResponse.next();
      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
      });
      response.cookies.set({
        name: "refreshToken",
        value: newRefreshToken,
        httpOnly: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

