import React from "react";
import Image from "next/image";
import PigoenPng from "@/assets/Pigeon.png";
import { getSession } from "@/lib/utils/getSession";
import { redirect } from "next/navigation";
import MenuButton from "@/components/chat/MenuButton";


const page = async () => {
  const session = await getSession();
  if (!session) return redirect("/");
  return (
    <main className="w-screen h-svh flex flex-col my-bg relative">
      <MenuButton />
      <div className="flex items-center justify-center h-full">
        <div className="text-center flex flex-col justify-center items-center">
          <Image
            priority
            width={150}
            height={150}
            src={PigoenPng}
            className="invert "
            alt="pirates"
          />
          <h1 className="text-2xl font-bold mb-2">Select a conversation</h1>
          <p className="text-muted-foreground">
            Choose a chat from the sidebar to start messaging
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
