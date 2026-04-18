import { User } from "@/types/user";
import Image from "next/image";

interface ProfileHeaderProps {
    user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
    return (
        <div className="mx-auto max-w-5xl w-full flex items-center gap-6 p-10">
            <Image src={"/images/avatar.png"} alt="Profile" width={110} height={110} className="rounded-full" unoptimized />
            <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-medium font-heading leading-8">{user.name}</h1>
                <p className="text-lg leading-7">{user.email}</p>
            </div>
        </div>
    );
}