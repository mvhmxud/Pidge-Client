import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import PirateSvg from "@/assets/Pirate.svg";
import Image from "next/image";
import { User } from "@/types/types";
const ChatComponent = () => {
  const dummyUser: Omit<User, "bio" | "lastActive" | "__v"> = {
    _id: "1",
    username: "@johndoe",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    isActive: true,
  };
  return (
    <main className="w-screen flex flex-col">
      {dummyUser && <ChatHeader user={dummyUser} />}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-center flex flex-col justify-center items-center">
            <Image
              priority
              width={150}
              height={150}
              src={PirateSvg}
              className="invert "
              alt="pirates"
            />
            <h1 className="text-2xl font-bold mb-2">Select a conversation</h1>
            <p className="text-muted-foreground">
              Choose a chat from the sidebar to start messaging
            </p>
          </div>
        </div>
      </div>
      {dummyUser && <ChatInput />}
    </main>
  );
};

export default ChatComponent;
