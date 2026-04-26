"use client";
import React, { useState } from "react";
import {
  Leaf,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FCFDF8] flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-600/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(22,163,74,0.15),transparent_60%)]" />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <Leaf size={22} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            VANGROVE
          </span>
        </div>

        {/* Center Content */}
        <div className="relative">
          <div className="text-6xl font-black text-white leading-none mb-6 select-none">
            DAFTAR
            <br />
            LAHAN
          </div>
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Mulai Perjalanan
            <br />
            Pertanian Modern.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
            Daftarkan diri dan kelola lahan pertanianmu dengan platform AI
            terdepan di Indonesia.
          </p>
        </div>

        {/* Feature List */}
        <div className="relative space-y-3">
          {[
            "Diagnosis penyakit tanaman dengan AI",
            "Peta lahan digital & sertifikasi",
            "Rekomendasi eco-farming berkelanjutan",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-slate-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
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
              Daftar
            </h1>
            <p className="text-slate-500">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Masuk disini
              </Link>
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Nama */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nama lengkap Anda"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* No HP */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                No. Handphone
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+62 812-xxxx-xxxx"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition placeholder:text-slate-300"
                />
              </div>
            </div>

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
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition placeholder:text-slate-300"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter"
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

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition placeholder:text-slate-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 accent-green-600 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-sm text-slate-500 cursor-pointer"
              >
                Saya setuju dengan{" "}
                <a
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Syarat Penggunaan
                </a>{" "}
                dan{" "}
                <a
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Kebijakan Privasi
                </a>
              </label>
            </div>

            {/* Submit */}
            <button className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-base hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-100">
              Daftar Sekarang <ArrowRight size={18} />
            </button>

            {/* Divider */}
            <div className="relative flex items-center gap-4 py-1">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium">atau</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Google Register */}
            <button className="w-full bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-semibold text-sm hover:bg-slate-50 transition flex items-center justify-center gap-3 shadow-sm">
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
              Daftar dengan Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
