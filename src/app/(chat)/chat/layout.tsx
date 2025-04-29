"use client";
import React, { useEffect } from "react";
import { AppSidebar } from "@/components/chat/SideBar";
import { useSidebar } from "@/components/ui/sidebar";
import { ChatProvider } from "@/context/chat";
import io, { Socket } from "socket.io-client";

const ChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { state, openMobile } = useSidebar();

  const isCollapsed = state === "collapsed";
  const currentUser = {
    _id: "680f5f27e7f60c85e08527c1",
    email: "mvhmud@gmail.com",
    name: "Mahmoud The Creator 👨🏾‍💻",
    username: "Mahmoud",
    image:
      "https://res.cloudinary.com/dncfl5cnv/image/upload/v1745712529/subz/issoamgfnxsk52fgykda.jpg",
    isAcive: true,
  };

  useEffect(() => {
    const testSocket = io(process.env.NEXT_PUBLIC_API_URL + "/default", {
      auth: {
        _id: currentUser._id,
      },
    });

    return () => {
      testSocket.close();
    };
  }, []);

  return (
    <ChatProvider>
      <div className="w-screen max-h-svh flex dark:bg-background">
        {/* SideBar */}
        <div className={`hidden md:block`}>
          <AppSidebar currentUser={currentUser} isCollapsed={isCollapsed} />
        </div>
        {/* Mobile Sidebar and Chat Layout */}
        <div className="md:hidden flex flex-col h-[calc(100vh-4rem)]">
          {openMobile && (
            <div className="w-full">
              <AppSidebar currentUser={currentUser} isCollapsed={isCollapsed} />
            </div>
          )}
        </div>
        {children}
      </div>
    </ChatProvider>
  );
};

export default ChatLayout;
