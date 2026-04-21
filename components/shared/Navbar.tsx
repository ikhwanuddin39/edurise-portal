import { User } from "@/types/user";
import Image from "next/image";

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <h1 className="text-4xl font-semibold text-primary font-heading">
          EduRise
        </h1>

        <div className="flex items-center gap-4">
          <NotificationBell />
          <UserProfile avatarUrl={user.avatarUrl} />
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

function UserProfile({ avatarUrl }: { avatarUrl?: string | null }) {
  const src = avatarUrl ?? "/images/avatar.png";
  return (
    <button
      aria-label="User Profile"
      className="relative p-1 text-dark-grey hover:text-gray-700 transition-colors"
    >
      <div className="relative w-12 h-12 rounded-full overflow-hidden">
        <Image
          src={src}
          alt="User Profile"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </button>
  );
}
