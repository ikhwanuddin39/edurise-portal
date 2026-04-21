"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface WelcomeBannerProps {
    userName?: string | null;
}

export function WelcomeBanner({ userName }: WelcomeBannerProps) {
    const pathname = usePathname();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("showWelcomeBanner") === "true") {
            setShow(true);
            sessionStorage.removeItem("showWelcomeBanner");
        }
    }, []);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if (pathname !== "/dashboard" && pathname !== "/") return null;
    if (!show) return null;

    const displayName = userName?.split(" ")[0] ?? "kamu";

    return (
        <div className="w-full bg-[#6ce598] py-3 flex items-center justify-center border-b border-[#5bd085] animate-in slide-in-from-top-2 fade-in duration-500 ease-out">
            <p className="text-[14px] font-semibold text-gray-900 text-center tracking-wide">
                Selamat datang kembali, {displayName} 🌱 Minggu baru, semangat baru! Yuk lanjutkan perjalanan belajarmu 🚀
            </p>
        </div>
    );
}
