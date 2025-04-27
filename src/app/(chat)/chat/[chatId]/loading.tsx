import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <main className="w-full h-full flex flex-col border-l">
      {/* Chat header skeleton */}
      <div className="border-b p-4 flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Messages area skeleton */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* Incoming message skeleton */}
        <div className="flex items-start gap-3">
          <Skeleton className="h-9 w-9 rounded-full mt-1" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-64" />
          </div>
        </div>

        {/* Outgoing message skeleton */}
        <div className="flex justify-end">
          <div className="space-y-2 max-w-xs">
            <Skeleton className="h-4 w-32 ml-auto" />
            <Skeleton className="h-12 w-64" />
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="flex items-center space-x-1">
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-2 w-2 rounded-full" />
          </div>
        </div>
      </div>

      {/* Message input skeleton */}
      <div className="border-t p-4">
        <div className="relative flex items-center">
          <Skeleton className="h-10 w-full rounded-full" />
          <div className="absolute right-2 flex space-x-1">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    </main>
  );
};

export default Loading;
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
