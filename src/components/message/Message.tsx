"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Check, CheckCheck, Loader, Pencil } from "lucide-react";
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
  image?: string;
}

export interface MessageProps {
  _id: string;
  content: string;
  sender: User;
  readBy: User[];
  attachments?: Attachment[];
  isEdited?: boolean;
  reactions?: Reaction[];
  createdAt: Date;
  currentUserId: string;
  onReactionClick?: (emoji: string) => void;
  pending: boolean | false;
}

export function Message({
  content,
  sender,
  readBy,
  attachments = [],
  isEdited = false,
  reactions = [],
  createdAt,
  currentUserId,
  pending,
  onReactionClick,
}: MessageProps) {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const isSentByCurrentUser = sender._id === currentUserId;

  return (
    <div
      className={cn(
        "flex w-full lg:max-w-[80%] gap-2 ",
        isSentByCurrentUser ? "ml-auto flex-row-reverse" : "mr-auto",
        "mb-3"
      )}
    >
      {!isSentByCurrentUser && (
        <div>
          <Avatar
            alt={sender.name}
            fallback={sender.name}
            imageUrl={sender.image}
            isActive
            size="sm"
          />
        </div>
      )}

      <div className=" relative flex flex-col gap-1 max-w-full lg:max-w-[90%]">
        {/* Message bubble */}
        <div
          onMouseEnter={() => !pending && setShowReactionPicker(true)}
          onMouseLeave={() => !pending && setShowReactionPicker(false)}
          className={cn(
            "rounded-xl px-3 py-3 text-sm break-words whitespace-pre-wrap w-full",
            pending ? "opacity-50 grayscale animate-pulse" : "",
            isSentByCurrentUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          <p
            className={`leading-snug mb-2 ${
              attachments.length > 0 ? "max-w-96" : ""
            }`}
          >
            {content}
          </p>

          {attachments.length > 0 && (
            <MessageAttachment attachments={attachments} />
          )}

          {/* Footer */}
          <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground overflow-visible">
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
              <div className="flex items-center ">
                {readBy.length > 0 ? (
                  <CheckCheck className="h-3.5 w-3.5" />
                ) : !pending ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <Loader className="h-3.5 w-3.5 animate-spin" />
                )}
              </div>
            )}
          </div>
          {showReactionPicker && (
            <ReactionPicker
              position={sender._id === currentUserId ? "left" : "right"}
            />
          )}
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
