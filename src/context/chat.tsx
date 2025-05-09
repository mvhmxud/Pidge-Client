import { MessageProps } from "@/components/message/Message";
import { normalize } from "@/lib/utils/normalizeText";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
} from "react";

interface SelectedChatInfo {
  username: string;
  image: string;
  name: string;
  _id: string;
  isActive: boolean;
}

interface FriendsChats {
  _id: string;
  chatType: "direct";
  member:
    | {
        _id: string;
        username: string;
        name: string;
        image?: string;
        isActive: boolean;
      }
    | undefined;
  lastMessage: {
    _id: string;
    content: string;
    createdAt: string;
    sender: {
      _id: string;
      username: string;
      name: string;
      image?: string;
    };
  } | null;
  updatedAt: string;
  createdAt: string;
}

export type Message = Omit<MessageProps, "onReactionClick" | "currentUserId">;

interface ChatContextType {
  messages: Message[] | null;
  selectedChat: SelectedChatInfo | null;
  setSelectedChat: Dispatch<SetStateAction<SelectedChatInfo | null>>;
  setMessages: (updater: SetStateAction<Message[]>) => void;
  friends: FriendsChats[];
  setFriends: (updater: SetStateAction<FriendsChats[]>) => void;
  handleNewMessage: (data: any, selectedChatId: string) => void;
  toggleUserActivity: (userId: string, isActive: boolean) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessagesState] = useState<Message[]>([]);
  const [friends, setFriendsState] = useState<FriendsChats[]>([]);
  const [selectedChat, setSelectedChat] = useState<SelectedChatInfo | null>(
    null
  );

  const setMessages = useCallback((updater: SetStateAction<Message[]>) => {
    setMessagesState(updater);
  }, []);

  const setFriends = useCallback((updater: SetStateAction<FriendsChats[]>) => {
    setFriendsState(updater);
  }, []);

  const handleNewMessage = useCallback((data: any, selectedChatId: string) => {
    if (data.message.chat === selectedChatId) {
      setMessagesState((prev) => {
        const existingById = prev.find((m) => m._id === data.message._id);
        if (existingById) {
          return prev.map((msg) =>
            msg._id === data.message._id ? data.message : msg
          );
        }
        const optimisticIndex = prev.findIndex(
          (m) =>
            normalize(m.content) === normalize(data.message.content) &&
            m.sender._id === data.message.sender._id &&
            Math.abs(
              new Date(m.createdAt).getTime() -
                new Date(data.message.createdAt).getTime()
            ) < 1000
        );
        if (optimisticIndex !== -1) {
          const newMessages = [...prev];
          newMessages[optimisticIndex] = data.message;
          return newMessages;
        }
        return [...prev, data.message];
      });
    }

    setFriendsState((prev) => {
      const idx = prev.findIndex((chat) => chat._id === data.message.chat);
      if (idx === -1) return prev;

      const updated = [...prev];
      updated[idx] = {
        ...updated[idx],
        lastMessage: { ...data.message, sender: { ...data.message.sender } },
      };

      return updated.sort((a, b) => {
        const dateA = a.lastMessage
          ? new Date(a.lastMessage.createdAt).getTime()
          : 0;
        const dateB = b.lastMessage
          ? new Date(b.lastMessage.createdAt).getTime()
          : 0;
        return dateB - dateA;
      });
    });
  }, []);

  const toggleUserActivity = useCallback(
    (userId: string, isActive: boolean) => {
      setFriendsState((prev) => {
        const index = prev.findIndex(
          (chat) => chat.member && chat.member._id === userId
        );
        if (index === -1) return prev;

        const updated = [...prev];
        const chat = updated[index];
        updated[index] = {
          ...chat,
          member: {
            ...chat.member!,
            isActive,
          },
        };
        return updated;
      });
      if (selectedChat?._id === userId) {
        setSelectedChat((prev) =>
          prev
            ? {
                ...prev,
                isActive: isActive,
              }
            : null
        );
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      friends,
      setFriends,
      messages,
      selectedChat,
      setSelectedChat,
      setMessages,
      handleNewMessage,
      toggleUserActivity,
    }),
    [
      friends,
      messages,
      selectedChat,
      setFriends,
      setMessages,
      handleNewMessage,
      toggleUserActivity,
    ]
  );

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
