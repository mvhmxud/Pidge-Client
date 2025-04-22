"use client";

import type { User, FriendRequest } from "@/types/types";
import { FriendsList } from "./friends-list";
import { FriendRequests } from "./friend-requests";
import { UseMutationResult } from "@tanstack/react-query";

interface FriendsManagementProps {
  friends: User[];
  friendRequests: FriendRequest[];
  onRemoveFriend: (id: string) => Promise<void>;
  onAcceptRequest: (id: string) => Promise<void>;
  onRejectRequest: (id: string) => Promise<void>;
  sendFriendRequest :  (id: string) => Promise<void>;
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
  searchUsers
}: FriendsManagementProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full max-w-4xl min-h-[500px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-white">
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
