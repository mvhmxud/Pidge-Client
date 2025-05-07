import React from "react";
import { Avatar as Container, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils/cn";

interface AvatarProps {
  imageUrl?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  isActive?: boolean;
  className?: string;
  alt?: string;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-14 w-14",
  "2xl": "h-20 w-20",
} as const;

const Avatar = ({
  imageUrl,
  fallback,
  size = "md",
  isActive,
  className,
  alt,
}: AvatarProps) => {
  return (
    <div className="relative inline-block">
      <Container title={fallback} className={cn(sizeMap[size], className)}>
        <AvatarImage
          src={imageUrl}
          alt={alt || fallback || "Avatar"}
          className="object-cover"
        />
        <AvatarFallback className="uppercase">
          {fallback?.charAt(0)}
        </AvatarFallback>
      </Container>
      {isActive && (
        <Badge className="absolute bottom-0 right-0 w-3 h-3 p-0 bg-green-500 border-2 border-background rounded-full" />
      )}
    </div>
  );
};

export default Avatar;
