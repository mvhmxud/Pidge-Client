"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FriendRequest } from "@/types/types";
import Avatar from "../Common/Avatar";

interface FriendRequestsProps {
  friendRequests: FriendRequest[];
  onAcceptRequest: (id: string) => Promise<void>;
  onRejectRequest: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export function FriendRequests({
  friendRequests,
  onAcceptRequest,
  onRejectRequest,
  isLoading,
}: FriendRequestsProps) {
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({});

  const handleAcceptRequest = async (id: string) => {
    setIsProcessing((prev) => ({ ...prev, [`accept-${id}`]: true }));
    try {
      await onAcceptRequest(id);
    } finally {
      setIsProcessing((prev) => ({ ...prev, [`accept-${id}`]: false }));
    }
  };

  const handleRejectRequest = async (id: string) => {
    setIsProcessing((prev) => ({ ...prev, [`reject-${id}`]: true }));
    try {
      await onRejectRequest(id);
    } finally {
      setIsProcessing((prev) => ({ ...prev, [`reject-${id}`]: false }));
    }
  };

  return (
    <div className="flex w-full md:w-1/2 flex-col p-4 md:p-6 h-full">
      <h2 className="mb-4 md:mb-6 text-center text-xl md:text-2xl font-semibold">
        Incoming requests
      </h2>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-[200px] md:h-[340px]">
          {friendRequests.length > 0 ? (
            <div className="space-y-3 md:space-y-4 pr-4">
              {friendRequests.map((request) => (
                <div
                  key={request._id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <Avatar
                      alt={request.name}
                      fallback={request.username}
                      imageUrl={request.image}
                      size="sm"
                    />
                    <span className="text-sm md:text-base text-zinc-400">
                      {request.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 md:h-8 md:w-8 text-zinc-400 hover:bg-zinc-800 hover:text-red-500"
                      onClick={() => handleRejectRequest(request._id)}
                      disabled={
                        isProcessing[`reject-${request._id}`] || isLoading
                      }
                    >
                      {isProcessing[`reject-${request._id}`] ? (
                        <div className="h-3 w-3 md:h-4 md:w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-white"></div>
                      ) : (
                        <X className="h-3 w-3 md:h-4 md:w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 md:h-8 md:w-8 text-zinc-400 hover:bg-zinc-800 hover:text-green-500"
                      onClick={() => handleAcceptRequest(request._id)}
                      disabled={
                        isProcessing[`accept-${request._id}`] || isLoading
                      }
                    >
                      {isProcessing[`accept-${request._id}`] ? (
                        <div className="h-3 w-3 md:h-4 md:w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-white"></div>
                      ) : (
                        <Check className="h-3 w-3 md:h-4 md:w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-zinc-500">No pending requests</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
