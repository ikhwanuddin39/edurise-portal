import React from "react";

interface StatItem {
  id: string;
  title: string;
  value: number;
  bgColor: string;
  iconColor: string;
  icon: React.ReactNode;
}

const STATS_DATA: StatItem[] = [
  {
    id: "diikuti",
    title: "Kursus diikuti",
    value: 957,
    bgColor: "bg-[#feeeea]",
    iconColor: "#ea580c",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="10 8 16 12 10 16 10 8"></polygon>
      </svg>
    ),
  },
  {
    id: "aktif",
    title: "Kursus aktif",
    value: 6,
    bgColor: "bg-[#e4f3ff]",
    iconColor: "#3b82f6",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M9 12l2 2 4-4"></path>
      </svg>
    ),
  },
  {
    id: "selesai",
    title: "Kursus selesai",
    value: 951,
    bgColor: "bg-[#e2f8eb]",
    iconColor: "#22c55e",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
        <path d="M4 22h16"></path>
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
      </svg>
    ),
  },
];

export function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {STATS_DATA.map((stat) => (
                <div key={stat.id} className={`${stat.bgColor} rounded-xl p-6 flex items-center gap-5 shadow-sm`}>
                    <div 
                        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"
                        style={{ color: stat.iconColor }}
                    >
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-2xl font-semibold text-gray-900 leading-tight">{stat.value}</p>
                        <h3 className="text-sm font-medium text-gray-600 mt-1">{stat.title}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}