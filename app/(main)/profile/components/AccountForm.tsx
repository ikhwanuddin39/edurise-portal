"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/shared/ToastProvider";

interface AccountFields {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  jobTitle: string;
}

const DEFAULT_AVATAR = "/images/avatar.png";

interface AccountFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    jobTitle: string;
    avatarUrl: string | null;
  };
}

export function AccountForm({ initialData }: AccountFormProps) {
  const toast = useToast();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [fields, setFields] = useState<AccountFields>({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    username: initialData.username,
    email: initialData.email,
    phone: initialData.phone,
    jobTitle: initialData.jobTitle,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Avatar state — use saved avatar if available
  const [avatarPreview, setAvatarPreview] = useState<string>(
    initialData.avatarUrl ?? DEFAULT_AVATAR,
  );
  const [isUploading, setIsUploading] = useState(false);

  function handleChange(key: keyof AccountFields, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  function handlePhoneChange(raw: string) {
    let digits = raw.replace(/[^\d]/g, "");
    if (digits.startsWith("62")) digits = digits.slice(2);
    if (digits.startsWith("0")) digits = digits.slice(1);
    const formatted = "+62 " + digits;
    setFields((prev) => ({ ...prev, phone: formatted }));
    const valid = /^\+62 \d{9,12}$/.test(formatted);
    setPhoneError(
      digits.length > 0 && !valid
        ? "Format tidak valid. Contoh: +62 81234567890"
        : null,
    );
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (!file.type.startsWith("image/")) {
      toast("Hanya file gambar yang diperbolehkan", "error");
      return;
    }
    if (file.size > 1024 * 1024) {
      toast("Ukuran file maksimal 1MB", "error");
      return;
    }

    // Instant local preview
    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);

    // Upload to server
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.message || "Gagal mengupload foto", "error");
        setAvatarPreview(DEFAULT_AVATAR);
        return;
      }
      // Use server URL for final display
      setAvatarPreview(data.avatarUrl);
      toast("Foto profil berhasil diupload", "success");
      router.refresh();
    } catch {
      toast("Terjadi kesalahan saat upload", "error");
      setAvatarPreview(DEFAULT_AVATAR);
    } finally {
      setIsUploading(false);
      // reset input so same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    const validPhone = /^\+62 \d{9,12}$/.test(fields.phone);
    if (!validPhone) {
      setPhoneError("Format tidak valid. Contoh: +62 81234567890");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile/account", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      toast("Profil berhasil disimpan", "success");
      router.refresh();
    } catch {
      toast("Gagal menyimpan profil. Coba lagi.", "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section>
      <h2 className="text-[20px] font-semibold text-[#334155] font-heading mb-6">
        Akun
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-10">
          {/* Avatar Upload Container */}
          <div className="border border-gray-100 rounded-xl flex flex-col items-center justify-center p-6 w-full max-w-[280px] h-fit bg-white">
            <div className="w-56 h-56 bg-gray-200 rounded-xl overflow-hidden relative group">
              <Image
                src={avatarPreview}
                alt="Avatar"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Overlay button */}
              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-x-0 bottom-0 h-10 bg-black/60 flex items-center justify-center cursor-pointer hover:bg-black/80 transition-colors disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <span className="text-white text-xs font-semibold flex items-center gap-2">
                    <svg
                      className="animate-spin w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Mengupload...
                  </span>
                ) : (
                  <span className="text-white text-xs font-semibold flex items-center gap-2 tracking-wide">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Unggah foto diri
                  </span>
                )}
              </button>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <p className="text-dark-grey text-[11px] font-medium mt-5 text-center max-w-[180px] leading-relaxed">
              Ukuran gambar harus di bawah 1MB dan rasio gambar harus 1:1
            </p>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-5 max-w-[550px]">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 space-y-1.5">
                <label className="text-[12px] font-semibold text-gray-700">
                  Nama depan
                </label>
                <input
                  type="text"
                  value={fields.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2.5 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-[12px] font-semibold text-gray-700">
                  Nama belakang
                </label>
                <input
                  type="text"
                  value={fields.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2.5 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={fields.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2.5 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={fields.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2.5 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-gray-700">
                Nomor whatsapp
              </label>
              <input
                type="tel"
                value={fields.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="+62 81234567890"
                className={`w-full border rounded-md p-2.5 text-[13px] outline-none focus:ring-1 transition-colors ${
                  phoneError
                    ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                    : "border-gray-300 focus:border-primary focus:ring-primary"
                }`}
              />
              {phoneError && (
                <p className="text-[11px] text-red-500 mt-1">{phoneError}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-gray-700">
                Jabatan
              </label>
              <input
                type="text"
                value={fields.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2.5 text-[13px] outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-[13px] !mt-8 py-2.5 px-8 rounded-lg shadow-sm transition-all"
            >
              {isLoading ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
