import Image from "next/image";
import { serverFetch } from "@/lib/api/serverFetch";

interface StatItem {
  id: string;
  title: string;
  value: number;
}

const STAT_STYLES: Record<
  string,
  { bgColor: string; iconColor: string; icon: string }
> = {
  diikuti: {
    bgColor: "#FEB27340",
    iconColor: "#ea580c",
    icon: "/icons/play-circle.png",
  },
  aktif: {
    bgColor: "#84CAFF40",
    iconColor: "#3b82f6",
    icon: "/icons/check-square.png",
  },
  selesai: {
    bgColor: "#6CE9A640",
    iconColor: "#22c55e",
    icon: "/icons/trophy.png",
  },
};

export async function StatsCards() {
  const { stats } = await serverFetch("/api/dashboard/stats");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      {stats.map((stat: StatItem) => {
        const style = STAT_STYLES[stat.id] ?? {
          bgColor: "bg-gray-100",
          iconColor: "#6b7280",
          icon: null,
        };
        return (
          <div
            key={stat.id}
            className="rounded-xl p-6 flex items-center gap-5 shadow-sm"
            style={{ backgroundColor: style.bgColor }}
          >
            <div
              className="w-14 h-14 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm"
              style={{ color: style.iconColor }}
            >
              <Image
                src={style.icon}
                alt="Kursus diikuti"
                width={24}
                height={24}
              />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900 leading-tight">
                {stat.value.toLocaleString("id-ID")}
              </p>
              <h3 className="text-sm font-medium text-dark-grey mt-1">
                {stat.title}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-[100px] bg-gray-100 animate-pulse rounded-xl"
        />
      ))}
    </div>
  );
}
