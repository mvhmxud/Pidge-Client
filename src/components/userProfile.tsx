import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
// turn this to a navbar component
const UserProfile = React.memo((user: any) => {
  return (
    <div className="flex flex-col items-center text-white">
      <Avatar className="w-24 h-24">
        <AvatarImage  src={user.image} />
        <AvatarFallback>
          <User />
        </AvatarFallback>
      </Avatar>

      <h1>Welcome {user.username}</h1>
      <h2>{user.name}</h2>
      <h3> {user.userId}</h3>
      <h4> {user.bio}</h4>
    </div>
  );
});

export default UserProfile;
