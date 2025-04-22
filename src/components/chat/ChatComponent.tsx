import React from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import PirateSvg from '@/assets/Pirate.svg'
const ChatComponent = () => {
  return (
    <main className="w-screen h-screen flex flex-col">
      <ChatHeader />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-center flex flex-col justify-center items-center">
            {/* <PirateSvg//> */}
            <h1 className="text-2xl font-bold mb-2">Select a conversation</h1>
            <p className="text-muted-foreground">
              Choose a chat from the sidebar to start messaging
            </p>
          </div>
        </div>
      </div>
      <ChatInput />
    </main>
  );
};

export default ChatComponent;
