"use client";
import React, { useState } from "react";
import { Leaf, Mail, Lock, Eye, EyeOff, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import axios from "@/lib/axios";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null); // reset error tiap user mengetik
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validasi client-side
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Semua field wajib diisi");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Password tidak sama");
      return;
    }

    if (form.password.length < 8) {
      setError("Password minimal 8 karakter");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirm,
      });

      // Redirect ke login setelah berhasil
      window.location.href = "/login";
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } } };
      const message =
        error.response?.data?.message || "Terjadi kesalahan koneksi ke server";
      setError(message);
    } finally {
      setLoading(false);
    }
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama */}
            <div>
              <label>Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-3" size={18} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  placeholder="masukan nama lengkap"
                  onChange={handleChange}
                  className="w-full pl-10 py-3 border rounded-xl"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label>Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3" size={18} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="masukan @ email"
                  onChange={handleChange}
                  className="w-full pl-10 py-3 border rounded-xl"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label>Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  placeholder="masukan password"
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-3 border rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label>Konfirmasi Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3" size={18} />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="konfirmasi password"
                  className="w-full pl-10 pr-10 py-3 border rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3"
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
                <span className="text-green-600 font-semibold">
                  Syarat Penggunaan
                </span>{" "}
                dan{" "}
                <span className="text-green-600 font-semibold">
                  Kebijakan Privasi
                </span>
              </label>
            </div>

            {/* Submit (HANYA SATU) */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              {loading ? "Mendaftar..." : "Daftar Sekarang"}{" "}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
