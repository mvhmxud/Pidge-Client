"use client";
import React, { Suspense, useEffect } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { redirect } from "next/navigation";

const onSuccessHandler = async ({ credential }: CredentialResponse) => {
  const response = await fetch("http://localhost:8080/api/auth/google", {
    method: "POST",
    body: JSON.stringify({ idToken: credential }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
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
      locale="en"
      shape="square"
      text={text}
      onSuccess={onSuccessHandler}
      onError={onErrorHandler}
    />
  );
};

export default GoogleAuth;
