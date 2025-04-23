"use client"

import { useState } from "react"
import Image from "next/image"
import type { Attachment } from "./Message"

interface MessageAttachmentProps {
  attachment: Attachment
}

export function MessageAttachment({ attachment }: MessageAttachmentProps) {
  const [isLoading, setIsLoading] = useState(true)

  if (attachment.type === "image") {
    return (
      <div className="relative rounded-md overflow-hidden">
        <Image
          src={attachment.url || "/placeholder.svg"}
          alt="Image attachment"
          width={1000}
          height={1000}
          className={`max-h-[300px] w-auto object-contain transition-opacity duration-200 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
        />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <span className="text-xs text-muted-foreground">Loading image...</span>
          </div>
        )}
      </div>
    )
  }

  if (attachment.type === "video") {
    return <video src={attachment.url} controls className="max-h-[300px] w-full rounded-md" />
  }

  return null
}
