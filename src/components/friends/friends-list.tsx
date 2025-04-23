"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, Trash2, UserPlus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@/types/types";
import CustomModal from "../Modal";
import UserSearch from "./user-search";
import { UseMutationResult } from "@tanstack/react-query";
import Avatar from "../Common/Avatar";

interface FriendsListProps {
  friends: User[];
  onRemoveFriend: (id: string) => Promise<void>;
  sendFriendRequest: (id: string) => Promise<void>;
  isLoading?: boolean;
  searchUsers: UseMutationResult<any, Error, string, unknown>;
}

export function FriendsList({
  friends,
  onRemoveFriend,
  isLoading,
  searchUsers,
  sendFriendRequest,
}: FriendsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleRemoveFriend = async (id: string) => {
    setIsProcessing((prev) => ({ ...prev, [`friend-${id}`]: true }));
    try {
      await onRemoveFriend(id);
    } finally {
      setIsProcessing((prev) => ({ ...prev, [`friend-${id}`]: false }));
    }
  };

  return (
    <>
      <div className="flex w-full md:w-1/2 flex-col border-r-0 md:border-r border-zinc-800 p-4 md:p-6 h-full">
        <h2 className="mb-4 md:mb-6 text-center text-xl md:text-2xl font-semibold">
          Friends List
        </h2>

        <div className="relative mb-4 md:mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-500" />
          <Input
            placeholder="search a friend"
            className="border-zinc-700 bg-transparent pl-10 text-zinc-400 placeholder:text-zinc-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[200px] md:h-[280px]">
            {filteredFriends.length > 0 ? (
              <div className="space-y-3 md:space-y-4 pr-4">
                {filteredFriends.map((friend) => (
                  <div
                    key={friend._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      
                      <Avatar
                        alt={friend.name}
                        fallback={friend.username}
                        imageUrl={friend.image}
                        isActive={friend.isActive}
                        size="sm"
                      />
                      <span className="text-sm md:text-base text-zinc-400">
                        {friend.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 md:h-8 md:w-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <MessageSquare className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 md:h-8 md:w-8 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                        onClick={() => handleRemoveFriend(friend._id)}
                        disabled={
                          isProcessing[`friend-${friend._id}`] || isLoading
                        }
                      >
                        {isProcessing[`friend-${friend._id}`] ? (
                          <div className="h-3 w-3 md:h-4 md:w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-white"></div>
                        ) : (
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-zinc-500">No friends found</p>
              </div>
            )}
          </ScrollArea>
        </div>

        <CustomModal
          trigger={
            <div className="relative mt-4 md:mt-6">
              <Input
                placeholder="send a friend request"
                className="border-zinc-700 bg-transparent pr-10 text-zinc-400 placeholder:text-zinc-500"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform text-zinc-400 hover:text-white"
              >
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
          }
          title="Add Friend"
        >
          <UserSearch
            isLoading={searchUsers.isPending}
            searchHandler={searchUsers.mutateAsync}
            sendFriendRequest={sendFriendRequest}
          />
        </CustomModal>
      </div>
    </>
  );
}
