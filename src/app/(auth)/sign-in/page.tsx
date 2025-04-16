import { LoginForm } from "@/components/auth/login-form";
import React from "react";

const SignIn = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-background">
      <LoginForm className="w-[50vh]" />
    </div>
  );
};

export default SignIn;
