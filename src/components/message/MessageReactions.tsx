"use client"
import type { Reaction } from "./Message"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils/cn"

interface MessageReactionsProps {
  reactions: Reaction[]
  currentUserId: string
  onReactionClick?: (emoji: string) => void
}

export function MessageReactions({ reactions, currentUserId, onReactionClick }: MessageReactionsProps) {
  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {reactions.map((reaction, index) => {
        const hasReacted = reaction.users.some((user) => user._id === currentUserId)

        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onReactionClick?.(reaction.emoji)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs transition-colors",
                    hasReacted ? "bg-primary/20 hover:bg-primary/30" : "bg-muted hover:bg-muted/80",
                  )}
                >
                  <span>{reaction.emoji}</span>
                  <span>{reaction.users.length}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>{reaction.users.map((user) => user.name || "User").join(", ")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      })}
    </div>
  )
}
