import { MessageProps } from "@/components/message/Message";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SelectedChatInfo {
  username: string;
  image: string;
  name: string;
  _id: string;
  isActive: boolean;
}

export type Message = Omit<MessageProps, "onReactionClick" | "currentUserId">;

interface ChatContextType {
  messages: Message[] | null;
  selectedChat: SelectedChatInfo | null;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatInfo | null>>;
  setMessages: Dispatch<SetStateAction<Message[]>>;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChat, setSelectedChat] = useState<SelectedChatInfo | null>(
    null
  );

  return (
    <ChatContext.Provider
      value={{
        messages,
        selectedChat,
        setSelectedChat,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
