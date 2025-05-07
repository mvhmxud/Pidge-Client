"use client";

import { FriendsManagement } from "@/components/friends/friends-managment";
import { Spinner } from "../ui/spinner";
import { useFriends } from "@/hooks/useFriends";
import { toast } from "sonner";
import BackButton from "../Common/BackButton";
import { Button } from "../ui/button";

export default function FriendsManagementPage() {
  const {
    friends,
    friendRequests,
    isLoading,
    error,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    sendFriendRequest,
    searchUsers,
    isMutating,
  } = useFriends();

  const handleRemoveFriend = async (id: string) => {
    await removeFriend(id);
    toast.success("Friendship ended");
  };

  // Handle accepting a friend request
  const handleAcceptRequest = async (id: string) => {
    const result = await acceptFriendRequest(id);
    toast.success(`${result.friend.username} is now your friend`);
  };

  // Handle rejecting a friend request
  const handleRejectRequest = async (id: string) => {
    await rejectFriendRequest(id);
    toast.success("Friend request rejected");
  };

  if (isLoading) {
    return <Spinner size="large" />;
  }

  if (error) {
    return (
      <div className=" relative flex h-[500px] w-full max-w-4xl items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-white">
        <BackButton>
          <Button className="absolute top-0 right-0">back</Button>
        </BackButton>
        <div className="text-center">
          <p className="text-red-500">{error.message}</p>
          <button
            className="mt-4 rounded-md bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <FriendsManagement
      friends={friends}
      friendRequests={friendRequests}
      onRemoveFriend={handleRemoveFriend}
      onAcceptRequest={handleAcceptRequest}
      onRejectRequest={handleRejectRequest}
      isLoading={isMutating}
      searchUsers={searchUsers}
      sendFriendRequest={sendFriendRequest}
    />
  );
}
