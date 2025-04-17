import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/lib/utils/getSession";
import { redirect } from "next/navigation";
import React from "react";

const SignIn = async () => {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-background">
      <LoginForm className=" w-[90vw] md:w-[60vw] lg:w-[25vw]" />
    </div>
  );
};

export default SignIn;
