import ChatLayout from "@/components/chat/ChatLayout";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subz Chat",
  description: "Connect and chat with your friends in real-time using Subz Chat.",
};

const page = () => {
  return (
    <SidebarProvider>
      <ChatLayout />
    </SidebarProvider>
  );
};

export default page;

// import io, { Socket } from "socket.io-client";
// "use client"

// const [response , setRespone] = useState('')
// const [message , setMessage] = useState('')
// const [testSocket , setTestSocket] = useState<Socket | null>(null);
// useEffect(() => {
//   const testSocket = io(
//     process.env.NEXT_PUBLIC_API_URL + "/default"
//   );
//   setTestSocket(testSocket);

//   testSocket.on("connect", () => {
//    console.log("connected to socket");
//   });

//   testSocket.on("chat-join", (data) => {
//     setRespone(data);
//   });

//   testSocket.on("message", (data) => {
//     console.log(data.message)
//     setMessage(data);
//   });
//   return () => {
//     testSocket.close();

//   };
// }, []);
// const handleJoinChat = (message: string) => {
//   if (testSocket) {
//     testSocket.emit("chat-join", {
//      chatId : "fofaaaaa"
//     });
//   }
// };
// const handleSendMessage = (message: string) => {
//   if (testSocket) {
//     testSocket.emit("message", {
//       message: message,
//     });
//   }
// };
