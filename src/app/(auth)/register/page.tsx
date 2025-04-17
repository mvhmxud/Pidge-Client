import React from "react";
import { RegisterForm } from "@/components/auth/register-form";
const Register = () => {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-background">
    <RegisterForm className=" w-[90vw] lg:w-[25vw]" />
  </div>
  );
};

export default Register;
