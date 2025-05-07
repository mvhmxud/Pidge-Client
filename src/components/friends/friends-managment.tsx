"use client";

import type { User, FriendRequest } from "@/types/types";
import { FriendsList } from "./friends-list";
import { FriendRequests } from "./friend-requests";
import { UseMutationResult } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { paths } from "@/lib/utils/paths";
import Link from "next/link";

interface FriendsManagementProps {
  friends: User[];
  friendRequests: FriendRequest[];
  onRemoveFriend: (id: string) => Promise<void>;
  onAcceptRequest: (id: string) => Promise<void>;
  onRejectRequest: (id: string) => Promise<void>;
  sendFriendRequest: (id: string) => Promise<void>;
  isLoading?: boolean;
  searchUsers: UseMutationResult<any, Error, string, unknown>;
}

export function FriendsManagement({
  friends,
  friendRequests,
  onRemoveFriend,
  onAcceptRequest,
  onRejectRequest,
  sendFriendRequest,
  isLoading,
  searchUsers,
}: FriendsManagementProps) {
  return (
    <>
      <div className=" relative flex flex-col md:flex-row w-full max-w-4xl min-h-[500px] rounded-xl border border-zinc-800 bg-zinc-950 text-white mx-2">
        <Link href={paths.chat}>
          <Button
            variant={"outline"}
            className="absolute -top-12 right-1 cursor-pointer"
          >
            <ArrowLeft />
            Back
          </Button>
        </Link>
        <FriendsList
          friends={friends}
          onRemoveFriend={onRemoveFriend}
          isLoading={isLoading}
          searchUsers={searchUsers}
          sendFriendRequest={sendFriendRequest}
        />
        <div className="w-full h-px bg-zinc-800 md:hidden"></div>
        <FriendRequests
          friendRequests={friendRequests}
          onAcceptRequest={onAcceptRequest}
          onRejectRequest={onRejectRequest}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
