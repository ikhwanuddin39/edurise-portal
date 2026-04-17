"use client";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData: FormData) => {
    setLoading(true);

    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Mencoba login dengan:", email, password);

    setTimeout(() => setLoading(false), 15000);
  };

  const logoSrc = "/saly-10.png";

  const eyeOpenSrc = "/icons/eye-open.svg";
  const eyeClosedSrc = "/icons/eye-closed.svg";

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
      <div className="hidden md:flex md:w-1/3 items-end justify-center">
        <div className="relative w-full h-full max-w-162.5 ">
          <Image
            src={logoSrc}
            alt="Ilustrasi EduRise"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="flex w-full md:w-2/3 items-center justify-center p-6 md:pl-14 md:pr-25">
        <form action={handleLogin} className="w-full  space-y-6">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-semibold font-heading text-primary">
              EduRise
            </h1>
            <p className="mt-2">
              Tingkatkan kemampuanmu, raih masa depan lebih baik
            </p>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-semibold font-heading">Masuk</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Image
                  src="/icons/mail.svg"
                  alt="Ikon Email"
                  width={20}
                  height={20}
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border border-disabled rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-secondary-text placeholder:text-slate-400"
                required
              />
            </div>

            <div className="relative">
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <Image
                  src={showPassword ? eyeOpenSrc : eyeClosedSrc}
                  alt={
                    showPassword
                      ? "Ikon Sembunyikan Password"
                      : "Ikon Tampilkan Password"
                  }
                  width={20}
                  height={20}
                />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full pl-4 pr-10 py-3 border border-disabled rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-secondary-text placeholder:text-slate-400"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-secondary-text"
                >
                  Ingat saya
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Lupa Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? "Menyiapkan ruang belajarmu..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
