"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Check, CheckCheck, Pencil } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { MessageAttachment } from "./MessageAttachments";
import { MessageReactions } from "./MessageReactions";
import ReactionPicker from "./ReactionPicker";
import Avatar from "../Common/Avatar";

export interface Attachment {
  type: "image" | "video";
  url: string;
}

export interface Reaction {
  emoji: string;
  users: {
    _id: string;
    name?: string;
    image?: string;
  }[];
}

export interface User {
  _id: string;
  name?: string;
  avatar?: string;
}

export interface MessageProps {
  id: string;
  content: string;
  sender: User;
  readBy: User[];
  attachments?: Attachment[];
  isEdited?: boolean;
  reactions?: Reaction[];
  createdAt: Date;
  currentUserId: string;
  onReactionClick?: (emoji: string) => void;
}

export function Message({
  id,
  content,
  sender,
  readBy,
  attachments = [],
  isEdited = false,
  reactions = [],
  createdAt,
  currentUserId,
  onReactionClick,
}: MessageProps) {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const isSentByCurrentUser = sender._id === currentUserId;

  return (
    <div
      className={cn(
        "flex w-full max-w-[80%] gap-2",
        isSentByCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto",
        "mb-3"
      )}
    >
      {!isSentByCurrentUser && (
        // <Avatar className="h-8 w-8">
        //   <AvatarImage
        //     src={sender.avatar || "/placeholder.svg"}
        //     alt={sender.name || "User"}
        //   />
        //   <AvatarFallback>{sender.name?.charAt(0) || "U"}</AvatarFallback>
        // </Avatar>
        <div>
          <Avatar
            alt={sender.name}
            fallback={sender.name}
            imageUrl={sender.avatar}
            isActive
            size="sm"
          />
        </div>
      )}

      <div className=" relative flex flex-col gap-1 max-w-full">
        {/* Message bubble */}
        <div
          onMouseEnter={() => setShowReactionPicker(true)}
          onMouseLeave={() => setShowReactionPicker(false)}
          className={cn(
            "rounded-xl px-3 py-3 text-sm break-words whitespace-pre-wrap",
            isSentByCurrentUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          <p className="leading-snug">{content}</p>

          {attachments.length > 0 && (
            <div className="mt-1 grid gap-1">
              {attachments.map((attachment, index) => (
                <MessageAttachment key={index} attachment={attachment} />
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>{format(createdAt, "HH:mm")}</span>
              {isEdited && (
                <span className="flex items-center gap-0.5">
                  <Pencil className="h-3 w-3" />
                  <span>edited</span>
                </span>
              )}
            </div>

            {isSentByCurrentUser && (
              <div className="flex items-center">
                {readBy.length > 0 ? (
                  <CheckCheck className="h-3.5 w-3.5" />
                ) : (
                  <Check className="h-3.5 w-3.5" />
                )}
              </div>
            )}
          </div>
          {showReactionPicker && <ReactionPicker />}
        </div>

        {/* Reactions */}
        {reactions.length > 0 && (
          <MessageReactions
            reactions={reactions}
            currentUserId={currentUserId}
            onReactionClick={onReactionClick}
          />
        )}
      </div>
    </div>
  );
}
