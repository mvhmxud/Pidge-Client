"use client";
import React from "react";
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

const GoogleAuth = () => {
  return <GoogleLogin shape="square" onSuccess={onSuccessHandler} onError={onErrorHandler} />;
};
export default GoogleAuth;
