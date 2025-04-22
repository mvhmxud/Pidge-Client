import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import type { User, FriendRequest } from "@/types/types";
import { toast } from "sonner";
import { AxiosError } from "axios";

export function useFriends() {
  const {
    data,
    isLoading,
    error,
    refetch: refetchFriends,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const response = await api.get("/api/users/user/relations");
      return response.data as {
        friends: User[];
        friendRequests: FriendRequest[];
      };
    },
  });

  const acceptFriendRequest = useMutation({
    mutationFn: async (requestId: string) => {
      const response = await api.put(`/api/users/user/accept-friend-request`, {
        requestId,
      });
      return response.data;
    },
    onSuccess: () => {
      refetchFriends();
    },
    onError: (error) => {
      toast.error("Error accepting friend request", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    },
  });

  const rejectFriendRequest = useMutation({
    mutationFn: async (requestId: string) => {
      const response = await api.put(`api/users/user/reject-friend-request`, {
        requestId,
      });
      return response.data;
    },
    onSuccess: () => {
      refetchFriends();
    },
    onError: (error) => {
      toast.error("Error rejecting friend request", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    },
  });

  const removeFriend = useMutation({
    mutationFn: async (friendId: string) => {
      const response = await api.delete(`/api/users/user/friend`, {
        data: { friendId },
      });
      return response.data;
    },
    onSuccess: () => {
      refetchFriends();
    },
    onError: (error) => {
      toast.error("Error removing friend", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    },
  });

  const searchUsers = useMutation({
    mutationFn: async (searchTerm: string) => {
      const res = await api.get(`/api/users/search?q=${searchTerm}`);
      return res.data;
    },
    onError: (err) => {
      toast.error("Something went wrong While searching for a user", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    },
  });

  const sendFriendRequest = useMutation({
    mutationFn: async (friendId: string) => {
      const response = await api.post(`api/users/user/friend-request`, {
        friendId,
      });
      return response.data;
    },
    onSuccess: (res) => {
      toast.success("Friend Request sent successfully");  
    },
    onError: (error: AxiosError | Error) => {
      toast.error(
        error instanceof AxiosError
          ? error.response?.data.message
          : error.message
      );
    },
  });

  return {
    friends: data?.friends ?? [],
    friendRequests: data?.friendRequests ?? [],
    isLoading,
    error,
    acceptFriendRequest: acceptFriendRequest.mutateAsync,
    rejectFriendRequest: rejectFriendRequest.mutateAsync,
    removeFriend: removeFriend.mutateAsync,
    sendFriendRequest: sendFriendRequest.mutateAsync,
    searchUsers: searchUsers,
    isMutating:
      acceptFriendRequest.isPending ||
      rejectFriendRequest.isPending ||
      removeFriend.isPending,
  };
}
