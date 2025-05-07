export interface UserToken {
  userId: string;
  name: string;
  username: string;
  image: string;
  iat: number;
  exp: number;
}

export interface User {
  bio: string;
  image: string;
  isActive: boolean;
  lastActive: Date | null;
  name: string;
  username: string;
  __v: number;
  _id: string;
}

export interface FriendRequest {
  image: string;
  name: string;
  username: string;
  _id: string;
}

export interface ChatMember {
  userId: string;
  email: string;
  name: string;
  username: string;
  image?: string;
  isActive?: boolean;
  onboarding?: boolean;
}
