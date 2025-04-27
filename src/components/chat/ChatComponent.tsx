"use client";
import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { User } from "@/types/types";
import { Message } from "../message/Message";
import { ScrollArea } from "../ui/scroll-area";
import { messages } from "@/lib/dummy";
export const revalidate = 0;
const dummyUser: Omit<User, "bio" | "lastActive" | "__v"> = {
  _id: "1a",
  username: "@johndoe",
  name: "John Doe",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  isActive: true,
};


const ChatComponent = () => {
  const bottomPageRef = useRef<HTMLDivElement>(null);
  const selectedChat = true;

  useEffect(() => {
    bottomPageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  return (
    <main className="w-screen h-svh flex flex-col my-bg">
      {dummyUser && <ChatHeader user={dummyUser} />}

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-6 py-4 space-y-4">
          {messages.map((message, idx) => (
            <Message
              content={message.content}
              attachments={message.attachments}
              createdAt={message.timestamp}
              currentUserId={dummyUser._id}
              readBy={message.readBy}
              sender={message.sender}
              isEdited={message.isEdited}
              reactions={message.reactions}
              id={idx.toString()}
              key={`${message.timestamp}${message.sender._id}`}
            />
          ))}
          {/* dummy div so it scrolls to the most recent message  */}
          <div ref={bottomPageRef}></div>
        </ScrollArea>
      </div>

      {dummyUser && <ChatInput />}
    </main>
  );
};

export default ChatComponent;
