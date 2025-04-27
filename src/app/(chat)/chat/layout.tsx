"use client";
import React from "react";
import { AppSidebar } from "@/components/chat/SideBar";
import { useSidebar } from "@/components/ui/sidebar";

const ChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { state, openMobile } = useSidebar();

  const isCollapsed = state === "collapsed";
  const currentUser = {
    _id: "680d754805a355d3799bcf8b",
    email: "mvhmud@gmail.com",
    name: "Mahmoud The Creator 👨🏾‍💻",
    username: "Mahmoud",
    image:
      "https://res.cloudinary.com/dncfl5cnv/image/upload/v1745712529/subz/issoamgfnxsk52fgykda.jpg",
    isAcive: true,
  };
  return (
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
  );
};

export default ChatLayout;
