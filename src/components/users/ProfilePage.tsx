import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import BackButton from "../Common/BackButton";
import Avatar from "../Common/Avatar";
interface UserData {
  username: string;
  name: string;
  image: string;
  onboarding: boolean;
  bio: string;
  isActive: boolean;
}

interface PageProps {
  user: UserData;
}

export default function ProfilePage({ user }: PageProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-col items-center">
        <Avatar
          fallback={user.username}
          alt={user.name + "image"}
          imageUrl={user.image}
          isActive={user.isActive}
          size="2xl"
        />
      </CardHeader>
      <CardContent className="space-y-2 text-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-muted-foreground bg-zinc-800 w-fit mx-auto px-1 rounded-md">@{user.username}</p>
        </div>
        <div className="pt-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            Bio
          </h3>
          <p className="text-sm min-w-96">
            {user.bio}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <BackButton>
          <Button variant={"outline"} className="flex gap-2 cursor-pointer">
            <span>
              <ArrowLeft />
            </span>
            Back
          </Button>
        </BackButton>
      </CardFooter>
    </Card>
  );
}
