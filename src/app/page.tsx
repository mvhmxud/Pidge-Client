import { getSession } from "@/lib/utils/getSession";
import { redirect } from "next/navigation";
import { paths } from "@/lib/utils/paths";

const page = async () => {
  const session = await getSession();
  if (!session) redirect(paths.login);
  if (session.onboarding) redirect(paths.onboarding);
  redirect(paths.chat);
};

export default page;
