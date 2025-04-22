"use client";
import React from "react";
import { AppSidebar } from "./SideBar";
import { SidebarProvider, useSidebar } from "../ui/sidebar";
import { Menu } from "lucide-react";
import ChatComponent from "./ChatComponent";

const ChatLayout = () => {
  const { state, openMobile, setOpenMobile, toggleSidebar } = useSidebar();

  const isCollapsed = state === "collapsed";

  return (
    <div className="h-screen w-screen flex dark:bg-background">
      {/* SideBar */}
      <div className={`hidden md:block`}>
        <AppSidebar isCollapsed={isCollapsed} />
      </div>
      {/* Mobile Sidebar and Chat Layout */}
      <div className="md:hidden flex flex-col h-[calc(100vh-4rem)]">
        {openMobile && (
          <div className="w-full">
            <AppSidebar isCollapsed={isCollapsed} />
          </div>
        )}
      </div>
      <ChatComponent />
    </div>
  );
};

export default ChatLayout;
