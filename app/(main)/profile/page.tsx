import { Suspense } from "react";
import { serverFetch } from "@/lib/api/serverFetch";
import { AccountForm } from "./components/AccountForm";
import { ChangePasswordForm } from "./components/ChangePasswordForm";
import { EmailNotifSettings } from "./components/EmailNotifSettings";
import { WhatsappNotifSettings } from "./components/WhatsappNotifSettings";
import { ProfileSkeleton } from "./components/ProfileSkeleton";

export default function ProfilePage() {
    return (
        <Suspense fallback={<ProfileSkeleton />}>
            <ProfileContent />
        </Suspense>
    );
}

async function ProfileContent() {
    const profile = await serverFetch("/api/profile");
    const notifications = profile.notifications;

    return (
        <div className="mx-auto max-w-7xl px-10 pt-10 pb-20">
            <AccountForm initialData={profile} />

            <ChangePasswordForm />

            <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-10">
                <div className="flex-1">
                    <EmailNotifSettings initialSettings={notifications} />
                </div>
                <div className="flex-1">
                    <WhatsappNotifSettings initialSettings={notifications} />
                </div>
            </div>
        </div>
    );
}
