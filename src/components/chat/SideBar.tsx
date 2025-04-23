import { Settings, Users } from "lucide-react";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Avatar from "../Common/Avatar";
// Sample user data
const users = [
  {
    id: "1",
    username: "@johndoe",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    isActive: true,
    lastMessage:
      "Hey, how's everything going lately? Haven't heard from you in a while.",
    lastMessageTime: "2m ago",
  },
  {
    id: "2",
    username: "@janedoe",
    name: "Jane Doe",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    isActive: true,
    lastMessage:
      "I was thinking we could catch up over coffee this weekend, what do you say?",
    lastMessageTime: "15m ago",
  },
  {
    id: "3",
    username: "@mikebrown",
    name: "Mike Brown",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    isActive: false,
    lastMessage:
      "Really appreciate you helping me out with that project, it meant a lot.",
    lastMessageTime: "2 days ago",
  },
  {
    id: "4",
    username: "@sarahsmith",
    name: "Sarah Smith",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    isActive: false,
    lastMessage:
      "Hey, just wanted to let you know I'll be sending those documents later tonight.",
    lastMessageTime: "1d ago",
  },
  {
    id: "5",
    username: "@alexjones",
    name: "Alex Jones",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
    isActive: true,
    lastMessage:
      "Let's make some time this week to talk, it's been way too long!",
    lastMessageTime: "3d ago",
  },
  {
    id: "6",
    username: "@emilywatson",
    name: "Emily Watson",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    isActive: false,
    lastMessage:
      "Just wrapped up the meeting—I'll share the notes with you tomorrow morning.",
    lastMessageTime: "5h ago",
  },
  {
    id: "7",
    username: "@brianclark",
    name: "Brian Clark",
    image: "https://randomuser.me/api/portraits/men/63.jpg",
    isActive: true,
    lastMessage:
      "The event went really well, I think you'd have enjoyed it a lot!",
    lastMessageTime: "10m ago",
  },
  {
    id: "8",
    username: "@lisamiller",
    name: "Lisa Miller",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    isActive: false,
    lastMessage:
      "Can we reschedule our call to Friday? I have back-to-back meetings today.",
    lastMessageTime: "6h ago",
  },
  {
    id: "9",
    username: "@tomanderson",
    name: "Tom Anderson",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    isActive: false,
    lastMessage:
      "I'll be on a flight most of the day, but I'll reply once I land.",
    lastMessageTime: "1d ago",
  },
  {
    id: "10",
    username: "@natalierich",
    name: "Natalie Rich",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    isActive: true,
    lastMessage:
      "That sounds perfect! I'm free after 6pm if that works for you too.",
    lastMessageTime: "30m ago",
  },
  {
    id: "11",
    username: "@kevinlopez",
    name: "Kevin Lopez",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    isActive: true,
    lastMessage:
      "Don't forget about the deadline tomorrow, let's stay on track.",
    lastMessageTime: "45m ago",
  },
  {
    id: "12",
    username: "@angelamartin",
    name: "Angela Martin",
    image: "https://randomuser.me/api/portraits/women/48.jpg",
    isActive: false,
    lastMessage:
      "Got the files you sent—I'll review them tonight and give you feedback.",
    lastMessageTime: "9h ago",
  },
  {
    id: "13",
    username: "@rickybennett",
    name: "Ricky Bennett",
    image: "https://randomuser.me/api/portraits/men/39.jpg",
    isActive: false,
    lastMessage:
      "Let's touch base next week and finalize the presentation details.",
    lastMessageTime: "4d ago",
  },
];

// Current user data
const currentUser = {
  id: "14",
  username: "@samanthawills",
  name: "Samantha Wills",
  image: "https://randomuser.me/api/portraits/women/21.jpg",
  isActive: true,
  lastMessage:
    "Just got home from work. I'll check everything and get back to you shortly.",
  lastMessageTime: "5m ago",
};

export function AppSidebar({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-4 border-b ">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          {!isCollapsed && <h1 className="text-xl font-bold">NEXT CHAT</h1>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="px-4 py-2">
              Friends messages
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {users.map((user) => (
                <SidebarMenuItem key={user.id}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-start z-0 cursor-pointer ${
                      isCollapsed
                        ? " items-center justify-center overflow-visible"
                        : "gap-3 p-3"
                    } h-auto`}
                  >
                    <div>
                      <Avatar
                        alt={user.name}
                        fallback={user.username}
                        imageUrl={user.image}
                        isActive={user.isActive}
                        size={!isCollapsed ? "md" : "sm"}
                      />
                      {!isCollapsed && (
                        <div className="flex flex-col flex-1 min-w-0 cursor-pointer">
                          <div className="flex justify-between items-center w-full">
                            <span
                              title={user.name}
                              className="font-medium max-w-38 truncate"
                            >
                              {user.name}
                            </span>
                            <span className="text-xs text-muted-foreground truncate ">
                              {user.lastMessageTime}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground truncate">
                            {user.username}
                          </span>
                          <p
                            title={user.lastMessage}
                            className="text-sm text-muted-foreground mt-1 truncate"
                          >
                            {user.lastMessage + "aaaaaaaaaaaaaaaaaaaaaaaaaaaa"}
                          </p>
                        </div>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        {isCollapsed ? (
          <div className="flex flex-col items-center gap-3">
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
            <div className="flex flex-col gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/friends">
                      <Users className="h-5 w-5" />
                      <span className="sr-only">Friends</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Friends</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/settings">
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Settings</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between transition-opacity duration-200">
            <div className="flex items-center gap-3">
              <Avatar
                alt={currentUser.name}
                fallback={currentUser.username}
                imageUrl={currentUser.image}
                // size="md"
              />
              <span className="font-medium text-sm">
                {currentUser.username}
              </span>
            </div>
            <div className="flex opacity-100 transition-opacity duration-200">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/friends">
                      <Users className="h-5 w-5" />
                      <span className="sr-only">Friends</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Friends</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/settings">
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Settings</span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>settings</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
