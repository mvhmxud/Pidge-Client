import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import PirateSvg from "@/assets/Pirate.svg";
import { getSession } from "@/lib/utils/getSession";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Subz Chat",
  description:
    "Connect and chat with your friends in real-time using Subz Chat.",
};
const page = async () => {
  const session = await getSession();
  if (!session) return redirect("/");
  return (
    <main className="w-screen h-svh flex flex-col my-bg">
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
    </main>
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
