"use server"
export const getRefreshToken = async (refreshToken: string) => {
    const res = await fetch("http://localhost:8080/api/auth/refresh-token", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `refreshToken=${refreshToken}`,
        },
      });
      const data = await res.json();
      return {
        token: data.user.token,
        refreshToken: data.user.refreshToken,
      };
};


