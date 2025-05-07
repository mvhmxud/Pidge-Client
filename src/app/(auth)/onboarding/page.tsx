import { OnBoardingForm } from "@/components/auth/onboarding-form";
import UserProfile from "@/components/userProfile";
import { getSession } from "@/lib/utils/getSession";
import { paths } from "@/lib/utils/paths";
import { redirect } from "next/navigation";
import React from "react";

const Onboarding = async () => {
  const session = await getSession();
  if (!session) {
    redirect(paths.login);
  }
  // if (!session.onboarding) {
  //   redirect("/");
  // }
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-background">
      <OnBoardingForm user={session} className=" w-[90vw] lg:w-[25vw]" />
    </div>
  );
};

export default Onboarding;
