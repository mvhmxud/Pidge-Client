import { EditProfileForm } from "@/components/users/EditProfile";
import { getSession } from "@/lib/utils/getSession";
import React from "react";

const page = async () => {
  const session = await getSession();
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-background">
      <EditProfileForm  user={session} className=" w-[90vw] lg:w-[25vw]" />
    </div>
  );
};

export default page;
