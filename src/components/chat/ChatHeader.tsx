import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import Avatar from "../Common/Avatar";
import type { User } from "@/types/types";
import Link from "next/link";
import { paths } from "@/lib/utils/paths";

interface ChatHeaderProps {
  user: Omit<User, "bio" | "lastActive" | "__v"> | null;
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  return (
    <div className="p-4 w-full border-b bg-sidebar flex justify-between items-center h-20 shadow-sm">
      {/* Left section: Avatar + Details */}
      <div className="flex items-center gap-4">
        <Avatar
          alt={user?.name}
          fallback={user?.username}
          imageUrl={user?.image}
          isActive={user?.isActive}
        />
        {/* Text info */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <Link className="cursor-pointer group " href={`${paths.profile}/${user?._id}`}>
              <h1 className="font-bold text-lg md:text-2xl group-hover:text-foreground/70 text-foreground tracking-tight">
                {user?.name}
              </h1>
            </Link>
          </div>
          <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground shadow text-xs md:text-sm font-medium">
            @{user?.username}
          </span>
        </div>
      </div>
      {/* Mobile: Menu button */}
      {isMobile && (
        <button
          onClick={() => setOpenMobile(true)}
          className="ml-4 cursor-pointer p-3 rounded-md hover:bg-muted outline-muted-foreground focus:outline-2 transition-all"
          aria-label="Open Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatHeader;
