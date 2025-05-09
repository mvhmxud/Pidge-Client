"use client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { redirect } from "next/navigation";

const onSuccessHandler = async ({ credential }: CredentialResponse) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`,
    {
      method: "POST",
      body: JSON.stringify({ idToken: credential }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  console.log(data);
  redirect("/");
};

const onErrorHandler = () => {
  console.log("Login Failed");
};

type GoogleAuthProps = {
  text?: "signin_with" | "signup_with" | "continue_with" | "signin";
};
const GoogleAuth = ({ text }: GoogleAuthProps) => {
  return (
    <GoogleLogin
      theme="filled_black"
      locale="en-US"
      text={text}
      onSuccess={onSuccessHandler}
      onError={onErrorHandler}
      size="large"
      logo_alignment="left"
      ux_mode="popup"
    />
  );
};

export default GoogleAuth;
