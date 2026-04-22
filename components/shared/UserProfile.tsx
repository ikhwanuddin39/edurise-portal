'use client'

import { User } from "@/types/user";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function UserProfile({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const avatarSrc = user.avatarUrl ?? "/images/avatar.png";

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="User Profile"
                className="relative p-1 text-dark-grey hover:text-gray-700 transition-colors focus:outline-none"
            >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-transparent hover:border-primary transition-all">
                    <Image
                        src={avatarSrc}
                        alt="User Profile"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    <button
                        onClick={() => {
                            setIsOpen(false);
                            router.push("/profile");
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Profil Saya
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                        Keluar
                    </button>
                </div>
            )}
        </div>
    );
}