"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/shared/ToastProvider";
import type { NotificationSettings } from "@/types/user";
import { cn } from "@/lib/utils/cn";

export function EmailNotifSettings({
  initialSettings,
}: {
  initialSettings: NotificationSettings;
}) {
  const toast = useToast();
  const router = useRouter();
  const [settings, setSettings] =
    useState<NotificationSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  function handleToggle(key: keyof NotificationSettings, value: boolean) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error();

      toast("Pengaturan email berhasil disimpan", "success");
      router.refresh();
    } catch {
      toast("Gagal menyimpan pengaturan. Silakan coba lagi.", "error");
    } finally {
      setIsSaving(false);
    }
  }

  const isEnabled = settings.emailEnabled;

  return (
    <div className="space-y-6">
      <h3 className="text-[18px] font-semibold text-[#334155] font-heading mb-4">
        Pengaturan pemberitahuan email
      </h3>

      {/* Main Toggle */}
      <div className="flex items-center gap-3">
        <Toggle
          checked={isEnabled}
          onChange={(v) => handleToggle("emailEnabled", v)}
          activeColor="bg-primary"
        />
        <span
          className={cn(
            "text-[14px] font-medium transition-colors",
            isEnabled ? "text-primary" : "text-gray-400",
          )}
        >
          Pemberitahuan email {isEnabled ? "aktif" : "tidak aktif"}
        </span>
      </div>

      {/* Sub Settings */}
      <div className="space-y-4 pt-1">
        {[
          {
            key: "emailWeeklyReport" as const,
            label: "Laporan belajar kursus per minggu",
          },
          { key: "emailCertificate" as const, label: "Pencapaian sertifikat" },
          {
            key: "emailNewCourse" as const,
            label: "Rekomendasi kursus terbaru",
          },
        ].map(({ key, label }) => (
          <label
            key={key}
            className={cn(
              "flex items-center gap-3",
              !isEnabled && "opacity-50 cursor-not-allowed",
            )}
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={settings[key]}
                onChange={(e) => handleToggle(key, e.target.checked)}
                disabled={!isEnabled}
                className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[4px] border-2 border-gray-300 bg-white checked:border-primary checked:bg-primary transition-all"
              />
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span
              className={cn(
                "text-[13px] font-medium",
                isEnabled && settings[key] ? "text-primary" : "text-dark-grey",
              )}
            >
              {label}
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSaving}
        className="mt-4 px-5 py-2 bg-primary text-white rounded-lg text-[13px] font-medium hover:opacity-90 disabled:opacity-50 transition-all"
      >
        {isSaving ? "Menyimpan..." : "Simpan pengaturan"}
      </button>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  activeColor,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  activeColor: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        checked ? activeColor : "bg-gray-300",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}
