
import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { UserProfile } from "./UserProfile";

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <Link href="/dashboard">
          <h1 className="text-4xl font-semibold text-primary font-heading cursor-pointer">
            EduRise
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <NotificationBell />
          <UserProfile user={user} />
        </div>
      </div>
    </header>
  );
}

function NotificationBell() {
  return (
    <button
      aria-label="Notifikasi"
      className="relative p-1 text-dark-grey hover:text-gray-700 transition-colors"
    >
      <Image src="/icons/bell.svg" alt="Bell" width={20} height={20} />
      <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
    </button>
  );
}

