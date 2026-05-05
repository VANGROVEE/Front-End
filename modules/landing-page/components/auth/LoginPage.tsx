"use client";
import React, { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axios";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const { data: response } = await axios.post("/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        Cookies.set("token", response.data.token, {
          expires: 5 / (60 * 24),
          secure: false,
          sameSite: "Lax",
        });
        console.log("Token tersimpan:", Cookies.get("token"));
      }

      window.location.href = "/home";
    } catch (err) {
      const error = err as {
        response?: {
          data?: { message?: string; errors?: Record<string, string[]> };
        };
      };

      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join("\n");
        setError(errorMessages);
      } else {
        const message =
          error.response?.data?.message ||
          "Terjadi kesalahan koneksi ke server";
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFDF8] flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex w-1/2 bg-green-600 relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full translate-x-1/2 translate-y-1/2 opacity-50" />
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-green-700 rounded-full opacity-40" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Leaf size={22} className="text-green-600" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            VANGROVE
          </span>
        </div>

        {/* Center Content */}
        <div className="relative">
          <div className="text-6xl font-black text-white/10 leading-none mb-6 select-none">
            AGRI
            <br />
            TECH
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Selamat Datang
            <br />
            Kembali, Petani.
          </h2>
          <p className="text-green-100 text-lg leading-relaxed max-w-sm">
            Pantau lahan, diagnosa penyakit tanaman, dan kelola pertanian modern
            Anda dengan teknologi AI.
          </p>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-4">
          {[
            { value: "125+", label: "Lahan Aktif" },
            { value: "95%", label: "Akurasi AI" },
            { value: "3 dtk", label: "Diagnosis" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20"
            >
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-green-100 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-10">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf size={20} className="text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-green-800">
              VANGROVE
            </span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight mb-2">
              Masuk
            </h1>
            <p className="text-slate-500">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-green-600 font-semibold hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <a
                  href="#"
                  className="text-xs text-green-600 hover:underline font-medium"
                >
                  Lupa password?
                </a>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-base hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100 mt-2 disabled:bg-green-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  Masuk <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">atau</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Google Login */}
            <button
              type="button"
              className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-semibold text-sm hover:bg-slate-50 transition flex items-center justify-center gap-3 shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path
                  fill="#FFC107"
                  d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.5 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.5 5C9.5 39.5 16.3 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.2 5.2C40.5 35.5 44 30.2 44 24c0-1.3-.1-2.7-.4-4z"
                />
              </svg>
              Masuk dengan Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
