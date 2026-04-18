// components/shared/Navbar.tsx
// Server Component — tidak butuh "use client"
// Navbar hanya menerima data user dari layout, tidak ada interaktivitas langsung

import { User } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
// import { UserDropdown } from './UserDropdown'
// import type { SessionUser } from '@/types/auth'

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <h1 className="text-4xl font-semibold text-primary font-heading">
          EduRise
        </h1>

        <div className="flex items-center gap-4">
          <NotificationBell />
          <UserProfile />
        </div>
      </div>
    </header>
  );
}

// Sub-komponen kecil — tetap Server Component
function NotificationBell() {
  return (
    <button
      aria-label="Notifikasi"
      className="relative p-1 text-gray-500 hover:text-gray-700 transition-colors"
    >
      <Image src="/icons/bell.svg" alt="Bell" width={20} height={20} />
      {/* Red dot indicator */}
      <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
    </button>
  );
}

function UserProfile() {
  return (
    <button
      aria-label="User Profile"
      className="relative p-1 text-gray-500 hover:text-gray-700 transition-colors"
    >
      <Image
        src="/images/avatar.png"
        alt="User Profile"
        width={48}
        height={48}
      />
    </button>
  );
}
