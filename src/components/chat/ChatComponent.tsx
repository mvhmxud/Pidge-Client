"use client";
import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import PirateSvg from "@/assets/Pirate.svg";
import Image from "next/image";
import { User } from "@/types/types";
import { Message } from "../message/Message";
import { ScrollArea } from "../ui/scroll-area";
export const revalidate = 0;
const dummyUser: Omit<User, "bio" | "lastActive" | "__v"> = {
  _id: "1a",
  username: "@johndoe",
  name: "John Doe",
  image: "https://randomuser.me/api/portraits/men/32.jpg",
  isActive: true,
};

const messages = [
  {
    content:
      "Hey everyone! The new design mockups are ready. Check the drive folder 📁",
    sender: {
      _id: "1a",
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
    readBy: [
      { _id: "u2", name: "Carlos Diaz" },
      { _id: "u3", name: "Emily Zhang" },
    ],
    attachments: [] as { type: "image" | "video"; url: string }[],
    isEdited: false,
    reactions: [
      {
        emoji: "👍",
        users: [{ _id: "u2", name: "Carlos Diaz" }],
      },
      {
        emoji: "🔥",
        users: [{ _id: "u3", name: "Emily Zhang" }],
      },
    ],
  },
  {
    content: "Looks great Lena! Super clean work 👏",
    sender: {
      _id: "u2",
      name: "Carlos Diaz",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 1),
    readBy: [{ _id: "u1", name: "Lena Williams" }],
    attachments: [] as { type: "image" | "video"; url: string }[],
    isEdited: true,
    reactions: [
      {
        emoji: "❤️",
        users: [{ _id: "u1", name: "Lena Williams" }],
      },
    ],
  },
  {
    content: "Here's a screenshot of the dashboard component.",
    sender: {
      _id: "1",
      name: "Emily Zhang",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    readBy: [{ _id: "u1", name: "Lena Williams" }],
    attachments: [
      {
        type: "image" as const,
        url: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
    isEdited: false,
    reactions: [],
  },
  {
    content: "Quick demo from this morning's standup. Audio is a bit off 😅",
    sender: {
      _id: "u4",
      name: "Alex Murphy",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    readBy: [
      { _id: "u1", name: "Lena Williams" },
      { _id: "u3", name: "Emily Zhang" },
    ],
    attachments: [
      {
        type: "video" as const,
        url: "https://res.cloudinary.com/demo/video/upload/v1691253201/team_demo.mp4",
      },
    ],
    isEdited: false,
    reactions: [
      {
        emoji: "🍆",
        users: [{ _id: "u3", name: "Emily Zhang" }],
      },
    ],
  },
];

const ChatComponent = () => {
  const bottomPageRef = useRef<HTMLDivElement>(null);
  const selectedChat = true;

  useEffect(() => {
    bottomPageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);
  return (
    <main className="w-screen h-svh flex flex-col">
      {dummyUser && <ChatHeader user={dummyUser} />}

      <div className="flex-1 overflow-hidden">
        {!selectedChat ? (
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
        ) : null}
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
