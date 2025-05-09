import {
  Meh,
  Settings,
  Users,
  UserPlus,
  AlertCircle,
  RotateCw,
  Paperclip,
  Bird,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Avatar from "../Common/Avatar";
import { paths } from "@/lib/utils/paths";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/auth";
import { useChat } from "@/context/chat";
import Dropdown from "../Common/DropDown";
import { signOut } from "@/lib/utils/signOut";

const ClientOnlyDateFormatter = dynamic(
  () => import("@/lib/utils/formate-date"),
  { ssr: false }
);

interface ChatMember {
  _id: string;
  username: string;
  name: string;
  image: string;
  isActive?: boolean;
}

interface LastMessage {
  _id: string;
  content: string;
  createdAt: string;
  sender: ChatMember;
}

interface Chat {
  _id: string;
  chatType: string;
  member: ChatMember;
  lastMessage: LastMessage;
}

interface AppSidebarProps {
  isCollapsed: boolean;
  isMobile: boolean;
  toggleSideBar: () => void;
}

export function AppSidebar({
  isCollapsed,
  toggleSideBar,
}: AppSidebarProps) {
  const session = useAuth();
  const { friends, setFriends } = useChat();
  const currentUser = {
    _id: session?.userId as string,
    email: session?.email as string,
    name: session?.name as string,
    username: session?.username as string,
    image: session?.image as string,
    isAcive: true,
  };
  const {
    data: chats = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Chat[]>({
    queryKey: ["chats", currentUser._id],
    queryFn: async () => {
      const res = await (
        await api.get("api/chats/direct-chats")
      ).data.formattedChats;
      setFriends(res);
      return res;
    },
    staleTime: 60 * 1000,
    retry: 2,
    refetchOnMount: "always",
  });

  const renderChats = () => {
    if (isLoading) {
      return (
        <SidebarMenu>
          {Array.from({ length: 5 }).map((_, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton className="flex items-center gap-3 p-3 h-auto">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-muted border-2 border-background" />
                </div>
                {!isCollapsed && (
                  <div className="flex-1 ml-3 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
                    <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      );
    }

    if (isError) {
      return (
        <SidebarMenu>
          <div className="flex flex-col items-center justify-center p-6 text-center h-64">
            <AlertCircle className="w-12 h-12 text-destructive mb-4" />
            <h3 className="text-lg font-medium mb-2">Failed to load chats</h3>
            <p className="text-muted-foreground text-sm mb-4">
              {error instanceof Error ? error.message : "Network error"}
            </p>
            <Button
              variant="outline"
              onClick={() => refetch()}
              className="gap-2"
            >
              <RotateCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </SidebarMenu>
      );
    }

    if (!chats.length && !isLoading) {
      return (
        <SidebarMenu>
          <div className="flex flex-col items-center justify-center p-6 text-center h-64">
            <Meh size={80} className="text-muted-foreground opacity-80 mb-4" />
            <h3 className="text-lg font-medium mb-2">No conversations yet</h3>
            <p className="text-muted-foreground text-sm mb-4 max-w-xs">
              Start chatting by adding friends
            </p>
            <Button variant="outline" asChild>
              <Link href={paths.friends} className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Add Friends
              </Link>
            </Button>
          </div>
        </SidebarMenu>
      );
    }

    return (
      <SidebarMenu>
        {!isLoading &&
          friends.map(({ _id, member, lastMessage }) => (
            <SidebarMenuItem key={_id}>
              <Link
                href={`${paths.chat}/${_id}`}
                className={`flex items-start cursor-pointer hover:bg-muted rounded-lg ease-in  ${
                  isCollapsed ? "justify-center" : "gap-3 p-3"
                } h-auto`}
              >
                <div className="flex items-center w-full">
                  <Avatar
                    alt={member?.name}
                    fallback={member?.username}
                    imageUrl={member?.image}
                    isActive={member?.isActive}
                    size={isCollapsed ? "sm" : "md"}
                  />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0 ml-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium truncate max-w-[120px]">
                          {member?.name}
                        </span>
                        {lastMessage && (
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            <ClientOnlyDateFormatter
                              dateString={lastMessage.createdAt}
                            />
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground truncate mt-1 flex items-center gap-1">
                        {lastMessage ? (
                          <>
                            {lastMessage.sender._id === currentUser._id && (
                              <span className="text-primary">You : </span>
                            )}
                            {lastMessage.content ? (
                              lastMessage.content
                            ) : (
                              <Paperclip className="mt-2" size={15} />
                            )}
                          </>
                        ) : (
                          <span className="italic">No messages yet</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </SidebarMenuItem>
          ))}
      </SidebarMenu>
    );
  };

  const Footer = () => (
    <div
      className={
        isCollapsed
          ? "flex flex-col items-center gap-3"
          : "flex items-center justify-between"
      }
    >
      <div className="flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar
              alt={currentUser.name}
              fallback={currentUser.username}
              imageUrl={currentUser.image}
              size="sm"
            />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{currentUser.username}</p>
          </TooltipContent>
        </Tooltip>
        {!isCollapsed && (
          <Link
            className="cursor-pointer hover:text-foreground/70"
            href={`${paths.profile}/${currentUser._id}`}
          >
            <span className="font-medium text-sm">{currentUser.username}</span>
          </Link>
        )}
      </div>
      <div
        className={`flex flex-row ${
          !isCollapsed ? "md:flex-row" : " md:flex-col" //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        } gap-2`}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <Link href={paths.friends}>
                <Users className="h-5 w-5" />
                <span className="sr-only">Friends</span>
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Friends</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Dropdown
              title="Settings"
              items={[
                {
                  title: "Edit My Info",
                  content: (
                    <Link className="w-full" href={paths.editProfile}>
                      Edit Profile
                    </Link>
                  ),
                },
                {
                  title: "Sign Out",
                  content: (
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="flex items-center gap-2 cursor-pointer w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm leading-none">Sign Out</span>
                      </button>
                    </form>
                  ),
                },
              ]}
            >
              <Button className="cursor-pointer" variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </Dropdown>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <span
            onClick={toggleSideBar}
            className="text-xl font-bold capitalize flex gap-2 items-center cursor-pointer"
          >
            <Bird />
            {!isCollapsed && <h1>pidge</h1>}
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && chats.length > 1 && (
            <SidebarGroupLabel className="px-4 py-2">
              Friends messages
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>{renderChats()}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <Footer />
      </SidebarFooter>
    </Sidebar>
  );
}
