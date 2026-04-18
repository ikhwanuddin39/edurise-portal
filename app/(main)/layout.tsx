import { Navbar } from "@/components/shared/Navbar";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { TabNav } from "@/components/shared/TabNav";
import { getSessionUser } from "@/lib/auth/Session";
import { ReactNode } from "react";

export default async function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getSessionUser(); // fetch session di server
  console.log(user);

  return (
    <>
      {user && <Navbar user={user} />}
      {user && <ProfileHeader user={user} />}
      <TabNav />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
