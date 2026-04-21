"use client";

import { useState } from "react";
import { useToast } from "@/components/shared/ToastProvider";

export function ChangePasswordForm() {
  const toast = useToast();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast("Konfirmasi password tidak cocok", "error");
      return;
    }
    if (newPassword.length < 6) {
      toast("Password baru minimal 6 karakter", "error");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.message || "Gagal mengubah password", "error");
        return;
      }
      toast("Password berhasil diubah", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast("Terjadi kesalahan. Coba lagi.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <h2 className="text-[20px] font-semibold text-[#334155] font-heading mb-6">
        Ubah password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-[420px]">
        {/* Password Saat Ini */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-gray-700">
            Password saat ini
          </label>
          <div className="relative">
            <input
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Password saat ini"
              className="w-full border border-gray-300 rounded-md p-2.5 pr-10 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark-grey"
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        {/* Password Baru */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-gray-700">
            Password baru
          </label>
          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Password baru"
              className="w-full border border-gray-300 rounded-md p-2.5 pr-10 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark-grey"
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        {/* Konfirmasi Password */}
        <div className="space-y-1.5">
          <label className="text-[12px] font-semibold text-gray-700">
            Konfirmasi password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Konfirmasi password baru"
              className="w-full border border-gray-300 rounded-md p-2.5 pr-10 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark-grey"
            >
              <EyeIcon />
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-[13px] !mt-8 py-2.5 px-6 rounded-lg shadow-sm transition-all"
        >
          {isLoading ? "Menyimpan..." : "Ubah Password"}
        </button>
      </form>
    </section>
  );
}

function EyeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
