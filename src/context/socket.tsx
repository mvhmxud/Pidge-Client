"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./auth";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<SocketContextType>(null);
  const session = useAuth();

  useEffect(() => {
    const socketInstance: Socket = io(
      process.env.NEXT_PUBLIC_API_URL + "/default",
      {
        transports: ["websocket"],
      }
    );

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("✅ Socket connected:", socketInstance.id);
      socketInstance.emit("user-connect", { userId: session?.userId });
      
    });

    return () => {
      socketInstance.disconnect();
      console.log("❌ Socket disconnected");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => useContext(SocketContext);
