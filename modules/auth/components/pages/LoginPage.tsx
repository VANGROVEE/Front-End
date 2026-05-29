"use client";
import { ArrowLeft, Leaf } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "../organisms/loginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FCFDF8] flex">
      <div className="hidden lg:flex w-1/2 bg-green-600 relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500 rounded-full translate-x-1/2 translate-y-1/2 opacity-50" />
          <div className="absolute top-1/3 -left-20 w-72 h-72 bg-green-700 rounded-full opacity-40" />
        </div>

        <div className="flex items-center gap-1.5">
          <img
            src="/img/logo.png"
            alt="Vangrove Logo"
            className="w-7 h-7 md:w-10 md:h-10 object-contain flex-shrink-0"
          />
          <span className="text-2xl font-extrabold tracking-tight text-white uppercase">
            VANGROVE
          </span>
        </div>

        <div className="relative">
          <div className="text-6xl font-black text-white/10 leading-none mb-6 select-none uppercase">
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

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Tombol Back */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-green-600 transition-colors font-semibold mb-8 w-fit"
          >
            <ArrowLeft size={16} />
            Kembali ke Beranda
          </Link>

          <div className="flex lg:hidden items-center gap-2 mb-10">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf size={20} className="text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-green-800 uppercase">
              VANGROVE
            </span>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight mb-2">
              Masuk
            </h1>
            <p className="text-slate-500 font-medium">
              Belum punya akun?{" "}
              <Link
                href="/auth/register"
                className="text-green-600 font-bold hover:underline"
              >
                Daftar sekarang
              </Link>
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
