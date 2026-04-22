import { Navbar } from "@/components/shared/Navbar";
import { ProfileHeader } from "@/components/shared/ProfileHeader";
import { TabNav } from "@/components/shared/TabNav";
import { getSessionUser } from "@/lib/auth/Session";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Footer } from "@/components/shared/Footer";
import { WelcomeBanner } from "@/app/(main)/dashboard/components/WelcomeBanner";
import { ToastProvider } from "@/components/shared/ToastProvider";

export default async function MainLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col font-sans">
        {user && <Navbar user={user} />}

        <WelcomeBanner userName={user?.name} />
        <div className="bg-white border-b border-gray-100">
          <div className="mx-auto max-w-7xl">
            {user && <ProfileHeader user={user} />}
            <div className="px-10">
              <TabNav />
            </div>
          </div>
        </div>
        <main className="flex-1 w-full pb-20">
          {children}
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
