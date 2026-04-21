import { User } from "@/types/user";
import { readUserProfile } from "@/lib/data/userProfileStore";
import Image from "next/image";

interface ProfileHeaderProps {
    user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    const profile = readUserProfile();
    const avatarSrc = profile.avatarUrl ?? "/images/avatar.png";

    return (
        <div className="mx-auto max-w-7xl w-full flex items-center gap-6 p-10">
            <div className="relative w-[110px] h-[110px] rounded-full overflow-hidden">
                <Image
                    src={avatarSrc}
                    alt="Profile"
                    fill
                    className="object-cover"
                    unoptimized
                />
            </div>
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-medium font-heading leading-8">{user.name}</h1>
                <p className="text-lg leading-7">{user.email}</p>
            </div>
        </div>
    );
}