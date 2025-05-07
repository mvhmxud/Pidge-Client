import ChatComponent from "@/components/chat/ChatComponent";
export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    chatId: string;
  };
}
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const page = async ({ params }: PageProps) => {
  const { chatId } = await params;
  const chatData = await fetchChatData(chatId);
  if (!chatData) notFound();
   return (
    <ChatComponent
      chatId={chatId}
      selectedChatId={chatData.chatInfo._id}
      user={chatData.chatInfo.user}
      messages={chatData.messages}
    />
  );
};

export default page;

async function fetchChatData(chatId: string) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value; // get the 'token' cookie

    const res = await fetch(
      `${process.env.PUBLIC_API_URL}/api/chats/${chatId}/messages`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`, // manually send it
        },
      }
    );

    if (!res.ok) {
      console.log(res);
      throw new Error("Failed to fetch chat data");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
