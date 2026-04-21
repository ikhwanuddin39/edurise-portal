import Link from "next/link";
import Image from "next/image";

const SOCIAL_LINKS = [
    {
        label: "LinkedIn",
        icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />,
        extra: <><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
    },
    {
        label: "Instagram",
        icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
    },
    {
        label: "Facebook",
        icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    },
    {
        label: "YouTube",
        icon: <><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></>,
    },
    {
        label: "Twitter/X",
        icon: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />,
    },
];

const LINK_GROUPS = [
    {
        title: "4 Kategori teratas",
        links: ["Pemrograman", "Keuangan", "Desain", "Bisnis"],
    },
    {
        title: "Tautan",
        links: ["Tentang kami", "Kontak kami", "Bergabung dengan kami"],
    },
    {
        title: "Bantuan",
        links: ["Pusat bantuan", "FAQs", "Syarat & ketentuan", "Kebijakan privasi"],
    },
];

const DOWNLOAD_BUTTONS = [
    {
        label: "App Store",
        sublabel: "Download on the",
        icon: <Image src="/icons/app-store.png" alt="App Store" width={28} height={28} />,
    },
    {
        label: "Google Play",
        sublabel: "GET IT ON",
        icon: <Image src="/icons/google-play.png" alt="Google Play" width={28} height={28} />,
    },
];


function SocialIcon({ label, icon, extra }: { label: string; icon: React.ReactNode; extra?: React.ReactNode }) {
    return (
        <a href="#" aria-label={label} className="w-9 h-9 rounded-full bg-[#363B4766] flex items-center justify-center text-white hover:bg-primary transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {icon}
                {extra}
            </svg>
        </a>
    );
}

function FooterLinkGroup({ title, links }: { title: string; links: string[] }) {
    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-lg font-semibold mb-1">{title}</h4>
            {links.map((text) => (
                <Link key={text} href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {text}
                </Link>
            ))}
        </div>
    );
}

function DownloadButton({ label, sublabel, icon }: { label: string; sublabel: string; icon: React.ReactNode }) {
    return (
        <button className="flex items-center gap-3 bg-[#334155] hover:bg-gray-700 px-5 py-2.5 rounded-lg border border-gray-700 transition-colors">
            {icon}
            <div className="flex flex-col items-start leading-none gap-0.5">
                <span className="text-[10px] text-gray-300">{sublabel} tes</span>
                <span className="text-[15px] font-semibold text-white">{label}</span>
            </div>
        </button>
    );
}

// ─── Component ───────────────────────────────────────────────────────────────

import React from "react";

export function Footer() {
    return (
        <footer className="bg-[#1e293b] pt-16 pb-8 border-t border-[#363B4766] w-full">
            <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between gap-12 text-white">

                {/* Brand & Socials */}
                <div className="flex flex-col gap-6 max-w-xs">
                    <h2 className="text-3xl font-bold font-heading text-primary">EduRise</h2>
                    <p className="text-[14px] text-gray-400 leading-relaxed font-medium">
                        Tingkatkan kemampuanmu, raih masa depan lebih baik
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                        {SOCIAL_LINKS.map((s) => (
                            <SocialIcon key={s.label} {...s} />
                        ))}
                    </div>
                </div>

                {/* Link Groups */}
                <div className="flex gap-16 flex-wrap">
                    {LINK_GROUPS.map((group) => (
                        <FooterLinkGroup key={group.title} {...group} />
                    ))}
                </div>

                {/* Download Buttons */}
                <div className="flex flex-col gap-5">
                    <h4 className="text-[15px] font-semibold">Download EduRise di</h4>
                    {DOWNLOAD_BUTTONS.map((btn) => (
                        <DownloadButton key={btn.label} {...btn} />
                    ))}
                </div>

            </div>

            {/* Copyright */}
            <div className="border-t border-[#334155] mt-12 pt-6">
                <p className="text-center text-[13px] text-gray-400 font-medium">
                    © 2025 - EduRise. All rights reserved
                </p>
            </div>
        </footer>
    );
}
