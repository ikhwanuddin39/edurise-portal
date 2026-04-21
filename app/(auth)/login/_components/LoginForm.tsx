"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitting = useRef(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!password) {
      newErrors.password = "Password wajib diisi";
    } else if (password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!validate()) return;
    if (isSubmitting.current) return;
    setIsLoading(true);
    isSubmitting.current = true;
    setErrors({});

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message || "Login gagal" });
        setIsLoading(false);
        isSubmitting.current = false;
        return;
      }

      // Set flag agar welcome banner muncul
      sessionStorage.setItem("showWelcomeBanner", "true");

      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrors({ general: "Terjadi kesalahan. Coba lagi." });
      setIsLoading(false);
      isSubmitting.current = false;
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* General error */}
      {errors.general && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {errors.general}
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-bold text-secondary-text"
        >
          Email
        </label>
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-disabled">
            <MailIcon />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@gmail.com"
            disabled={isLoading}
            className={cn(
              "w-full rounded-lg border border-gray-300 px-3 py-3 pl-11 text-sm outline-none transition-colors font-medium text-secondary-text placeholder:text-disabled",
              "focus:border-primary focus:ring-1 focus:ring-primary",
              errors.email && "border-red-400",
              "disabled:bg-gray-50 disabled:text-disabled",
            )}
          />
        </div>
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-bold text-secondary-text"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            disabled={isLoading}
            className={cn(
              "w-full rounded-lg border border-gray-300 px-3 py-3 pr-11 text-sm outline-none transition-colors font-medium text-secondary-text placeholder:text-disabled",
              "focus:border-primary focus:ring-1 focus:ring-primary",
              errors.password && "border-red-400",
              "disabled:bg-gray-50 disabled:text-disabled",
            )}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-disabled hover:text-secondary-text"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 pb-1">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              defaultChecked
              className="peer appearance-none w-4.5 h-4.5 border-[1.5px] border-disabled rounded bg-white checked:bg-white checked:border-primary cursor-pointer transition-colors"
            />
            <svg
              className="absolute w-3.5 h-3.5 text-primary opacity-0 peer-checked:opacity-100 pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="text-sm font-bold text-secondary-text select-none">
            Ingat saya
          </span>
        </label>
        <a
          href="#"
          className="text-sm font-bold text-secondary-text hover:text-primary transition-colors"
        >
          Lupa password?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full rounded-lg py-3 mt-4 text-[15px] font-bold text-white transition-all",
          "bg-primary hover:opacity-90 active:scale-[0.99]",
          "disabled:cursor-not-allowed disabled:bg-disabled disabled:hover:opacity-100",
          "flex items-center justify-center gap-2",
        )}
      >
        {isLoading ? (
          <>
            <SpinnerIcon />
            Harap Tunggu...
          </>
        ) : (
          "Masuk"
        )}
      </button>
    </form>
  );
}

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <g
        stroke="#101828"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        clipPath="url(#clip0_40_485)"
      >
        <path d="M.833 10S4.167 3.333 10 3.333 19.167 10 19.167 10 15.833 16.667 10 16.667.833 10 .833 10"></path>
        <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"></path>
      </g>
      <defs>
        <clipPath id="clip0_40_485">
          <path fill="#fff" d="M0 0h20v20H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9 9 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M1 1l22 22"></path>
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#clip0_40_126)">
        <path
          stroke="#FCFCFD"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 1.333V4m0 8v2.667M3.287 3.287l1.886 1.886m5.654 5.654 1.886 1.886M1.333 8H4m8 0h2.667m-11.38 4.713 1.886-1.886m5.654-5.654 1.886-1.886"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_40_126">
          <path fill="#fff" d="M0 0h16v16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}
