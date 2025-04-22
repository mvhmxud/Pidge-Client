import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@/types/types";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import useDebounce from "@/hooks/useDebounce";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UsersSearchProps {
  searchHandler: UseMutateAsyncFunction<any, Error, string, unknown>;
  isLoading: boolean;
  sendFriendRequest: (id: string) => Promise<void>;
}

type SearchUsers = Omit<User, "isActive" | "lastActive" | "_v">;

const SearchUsers: React.FC<UsersSearchProps> = ({
  searchHandler,
  isLoading,
  sendFriendRequest,
}) => {
  const [users, setUsers] = useState<SearchUsers[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSendRequest = async (userId: string, username: string) => {
    try {
      await sendFriendRequest(userId);
    } catch (err) {
      return;
    }
    toast.success(`Friend request sent to ${username}`);
  };

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchTerm.trim()) {
        try {
          const res = await searchHandler(debouncedSearchTerm);
          setUsers(res?.users || []);
        } catch (error) {
          toast.error("Failed to search users");
          setUsers([]);
        }
      } else {
        setUsers([]);
      }
    };

    performSearch();
  }, [debouncedSearchTerm, searchHandler]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full space-y-4 max-h-[500px] overflow-y-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-zinc-500" />
        <Input
          className="border-zinc-700 bg-transparent pl-10 text-zinc-400 placeholder:text-zinc-500"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="space-y-2">
        {isLoading && (
          <div
            className="flex justify-center py-4"
            role="status"
            aria-label="Loading users"
          >
            <Spinner size={"medium"} />
          </div>
        )}
        {!isLoading &&
          users &&
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">{user.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {user.username}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSendRequest(user._id, user.username)}
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send Request to {user.username}</span>
              </Button>
            </div>
          ))}
        {!isLoading && !users.length && !searchTerm && (
          <p className="text-center text-sm text-muted-foreground py-4">
            Search for a user to add as a friend
          </p>
        )}
        {!isLoading && searchTerm && users?.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchUsers;
