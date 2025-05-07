"use client";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface BackButtonProps {
  children: ReactNode;
}

const BackButton = ({ children }: BackButtonProps) => {
  const router = useRouter();
  return <div onClick={() => router.back()}>{children}</div>;
};

export default BackButton;
