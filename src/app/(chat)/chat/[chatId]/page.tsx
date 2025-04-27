    import ChatComponent from "@/components/chat/ChatComponent";
    // import api from "@/lib/axios";

    interface PageProps {
    params: {
        chatId: string;
    };
    }

    // async function fetchChatData(chatId: string) {
    //     console.log(chatId)
    // try {
    //     const res = await fetch(
    //     `http://localhost:8080/api/chats/${chatId}/messages`,
    //     {
    //         method: "GET",
    //         credentials: "include",
    //         headers: {
    //         "Content-Type": "application/json",
    //         },
    //     }
    //     );

    //     if (!res.ok) throw new Error("Failed to fetch chat data");
    //         return await res.json();
    // } catch (error) {
    //     console.log(error);
    // }
    // }

    const page = async ({ params: { chatId } }: PageProps) => {
    // const chatData = await fetchChatData(chatId);
    // console.log(chatData);
    return <ChatComponent />;
    };

    export default page;
