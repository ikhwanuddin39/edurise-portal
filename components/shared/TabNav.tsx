"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function TabNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Daftar kursus", href: "/courses" },
    { name: "Profil saya", href: "/profile" },
  ];

  return (
    <nav className="flex space-x-8">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "py-5 w-42 text-center text-base font-normal border-b-2 transition-colors duration-200",
              isActive
                ? "border-primary text-gray-900 font-semibold"
                : "border-transparent text-gray-400 hover:text-dark-grey",
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
