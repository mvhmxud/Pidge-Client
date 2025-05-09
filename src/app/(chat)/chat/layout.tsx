"use client";
import React from "react";
import { AppSidebar } from "@/components/chat/SideBar";
import { useSidebar } from "@/components/ui/sidebar";
import { ChatProvider } from "@/context/chat";
import { SocketProvider } from "@/context/socket";

const ChatLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { state, openMobile, toggleSidebar } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <SocketProvider>
      <ChatProvider>
        <div className="w-screen max-h-svh flex dark:bg-background relative">
          {/* SideBar */}
          <div className={`hidden md:block`}>
            <AppSidebar
              isMobile={openMobile}
              toggleSideBar={toggleSidebar}
              isCollapsed={isCollapsed}
            />
          </div>
          {/* Mobile Sidebar and Chat Layout */}
          <div className="md:hidden flex flex-col h-[calc(100vh-4rem)]">
            {openMobile && (
              <div className="w-full">
                <AppSidebar
                  isMobile={openMobile}
                  toggleSideBar={toggleSidebar}
                  isCollapsed={isCollapsed}
                />
              </div>
            )}
          </div>
          {children}
        </div>
      </ChatProvider>
    </SocketProvider>
  );
};

export default ChatLayout;
