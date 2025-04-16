import { getSession } from "@/utils/getSession";
import React from "react";
import GoogleLoginButton from "@/components/GoogleButton";
import UserProfile from "@/components/userProfile";
import { signOut } from "@/utils/signOut";

const page = async () => {
  const session = await getSession();
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome</h1>
          <GoogleLoginButton />
        </div>
      </div>
    );
  }
  return (
    <div className=" flex flex-col items-center justify-center h-screen p-4">
      <div className="mb-8">
        <UserProfile {...session} />
      </div>
      <div className="flex flex-col items-center gap-4">
        {!session && <GoogleLoginButton />}
        {session && <form action={signOut}>
          <button type="submit" className="px-4 py-2  rounded">Sign Out</button>
        </form>}
      </div>
    </div>
  );
};

export default page;
