"use client";
import React, { useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ImagePlus } from "lucide-react";
import { Input } from "../ui/input";
import { JWTPayload } from "jose";

interface ImageUploadProps {
  user: JWTPayload & {
    username?: string;
    image?: string;
  };
  image: File | null;
  setImage: (file: File | null) => void;
}

const ImageUpload = React.memo(
  ({ user, image, setImage }: ImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setImage(file || null);
    };

    return (
      <Avatar
        onClick={() => fileInputRef.current?.click()}
        className="size-24 self-center relative group hover:brightness-50 transition-all duration-300"
      >
        <Input
          onChange={handleFileChange}
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
        />
        <ImagePlus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 text-muted-foreground group-hover:text-white transition-all duration-300 hidden group-hover:block" />
        <AvatarImage
          src={
            image
              ? URL.createObjectURL(image)
              : user.image && user.image !== ""
              ? user.image
              : undefined
          }
        />
        <AvatarFallback className="uppercase">
          {user.username?.charAt(0) || ""}
        </AvatarFallback>
      </Avatar>
    );
  }
);

ImageUpload.displayName = "ImageUpload";
export default ImageUpload;
