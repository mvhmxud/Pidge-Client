"use client";
import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { Message, MessageProps } from "../message/Message";
import { ScrollArea } from "../ui/scroll-area";
import { useChat } from "@/context/chat";
import { MessageSquare } from "lucide-react";
import { useSocket } from "@/context/socket";
import { useAuth } from "@/context/auth";
import { useMessage } from "@/hooks/use-message";

export const revalidate = 0;

interface ChatComponentProps {
  messages: Omit<MessageProps, "onReactionClick" | "currentUserId">[];
  user: {
    _id: string;
    name: string;
    username: string;
    image: string;
    isActive: boolean;
  };
  chatId: string;
  selectedChatId: string;
}

const ChatComponent = ({
  messages,
  user,
  chatId,
  selectedChatId,
}: ChatComponentProps) => {
  const socket = useSocket();
  const session = useAuth();

  const {
    selectedChat,
    messages: MessagesArray,
    setMessages,
    setSelectedChat,
    handleNewMessage,
    toggleUserActivity,
  } = useChat();

  const { handleReactionClick } = useMessage({
    chatId: chatId,
    currentUserId: session?.userId as string,
  });

  useEffect(() => {
    if (!socket) return;

    socket.emit("chat-join", { chatId });

    socket.on("chat-join", (data) => {
      console.log("✅ chat joined:", data);
    });

    socket.on("message", (data) => {
      console.log("new Message");
      handleNewMessage(data, selectedChatId as string);
    });

    socket.on("friend-status-update", (update) => {
      console.log(update);
      toggleUserActivity(update.userId, update.isActive);
    });

    return () => {
      socket.off("chat-join");
      socket.off("message");
      socket.off("friend-status-update");
    };
  }, [socket, chatId]);

  const bottomPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedChat(user);
    setMessages(messages);
  }, [messages, user]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (bottomPageRef.current) {
        bottomPageRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    if (Array.isArray(MessagesArray) && MessagesArray.length > 0) {
      scrollToBottom();
      const timer = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timer);
    }
  }, [MessagesArray]);

  return (
    <main className="w-screen h-svh flex flex-col my-bg">
      {selectedChat && <ChatHeader user={selectedChat} />}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-6 py-4 space-y-4 flex flex-col">
          {Array.isArray(MessagesArray) && MessagesArray.length > 0 ? (
            <div className="flex flex-col space-y-4">
              {MessagesArray.map((message) => (
                <Message
                  onReactionClick={handleReactionClick}
                  content={message.content}
                  attachments={message.attachments}
                  createdAt={message.createdAt}
                  currentUserId={session?.userId as string}
                  readBy={message.readBy}
                  sender={message.sender}
                  isEdited={message.isEdited}
                  reactions={message.reactions}
                  _id={message._id}
                  key={`${message.createdAt}${message.sender._id}`}
                  pending={message.pending}
                />
              ))}
              <div ref={bottomPageRef} className="h-1" />
            </div>
          ) : (
            <div className="flex flex-col items-center self-center justify-center gap-3 p-6 border border-black/10 dark:border-white/10 rounded-lg bg-white dark:bg-black">
              <MessageSquare className="w-8 h-8 text-black/60 dark:text-white/60" />
              <p className="text-center font-medium text-black dark:text-white">
                No messages yet
              </p>
              <p className="text-center text-sm text-black/60 dark:text-white/60">
                Start the conversation
              </p>
            </div>
          )}
        </ScrollArea>
      </div>

      {selectedChat && (
        <ChatInput
          currentUserId={session?.userId as string}
          chatId={chatId}
          username={user.username}
        />
      )}
    </main>
  );
};

export default ChatComponent;
