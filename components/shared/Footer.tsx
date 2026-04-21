import Link from "next/link";
import Image from "next/image";

const SOCIAL_LINKS = [
    {
        label: "LinkedIn",
        iconPath: "/icons/linkedin.png",
        url: "https://www.linkedin.com/feed/"
    },
    {
        label: "Instagram",
        iconPath: "/icons/instragarm.png", // Note: intentional typo in filename as provided
        url: "https://www.instagram.com/"
    },
    {
        label: "Facebook",
        iconPath: "/icons/facebook.png",
        url: "https://www.facebook.com/"
    },
    {
        label: "YouTube",
        iconPath: "/icons/youtube.png",
        url: "https://www.youtube.com/"
    },
    {
        label: "Twitter/X",
        iconPath: "/icons/x.png",
        url: "https://www.x.com/"
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


function SocialIcon({ label, iconPath, url }: { label: string; iconPath: string; url: string }) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-full bg-[#363B4766] flex items-center justify-center text-white hover:bg-primary transition-colors">
            <div className="relative w-5 h-5">
                <Image src={iconPath} alt={label} fill className="object-contain" />
            </div>
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
