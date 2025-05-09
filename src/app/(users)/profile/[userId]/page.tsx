import ProfilePage from "@/components/users/ProfilePage";
import { paths } from "@/lib/utils/paths";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getSession } from "@/lib/utils/getSession";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const getUser = async (userId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Cookie: `token=${token}` }),
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  return {
    username: data.username,
    name: data.name,
    image: data.image,
    onboarding: data.onboarding,
    bio: data.bio,
    isActive: data.isActive,
  };
};

export const revalidate = 0;

const Page = async ({ params }: PageProps) => {
  const { userId } = await params;
  const session = await getSession();

  if (!session) redirect(paths.login);
  if (!userId) redirect(paths.chat);

  const userData = await getUser(userId);

  if (!userData.username) return notFound();

  return (
    <div className="w-full min-h-screen grid place-content-center">
      <ProfilePage user={userData} />
    </div>
  );
};

export default Page;
