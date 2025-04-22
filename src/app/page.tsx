import { getSession } from "@/lib/utils/getSession";
import React from "react";
import UserProfile from "@/components/userProfile";
import { signOut } from "@/lib/utils/signOut";
import { redirect } from "next/navigation";
import { paths } from "@/lib/utils/paths";
import Link from "next/link";
export const revalidate = 0;
const page = async () => {
  const session = await getSession();
  if (!session) redirect(paths.login);
  if (session.onboarding) redirect("/onboarding"); // temporarly disabled untill we have a onboarding page 

  return (
    <div className=" flex flex-col items-center justify-center h-screen p-4">
      <div className="mb-8">
        <UserProfile {...session} />
      </div>
      <div className="flex flex-col items-center gap-4">
        {session && (
          <form action={signOut}>
            <button type="submit" className="px-4 py-2  rounded">
              Sign Out
            </button>
          </form>
        )}
      </div>
      <Link href={paths.onboarding}>Onboarding</Link>
      <Link href={paths.friends}>Friends</Link>
    </div>
  );
};

export default page;
