"use server";
export const getRefreshToken = async (refreshToken: string) => {
  const res = await fetch(
    `${process.env.PUBLIC_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
    }
  );
  const data = await res.json();
  return {
    token: data.user.token,
    refreshToken: data.user.refreshToken,
  };
};
