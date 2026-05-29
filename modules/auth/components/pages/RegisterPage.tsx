"use client";
import { ArrowLeft, Leaf } from "lucide-react";
import Link from "next/link";
import { RegisterForm } from "../organisms/registerForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FCFDF8] flex">
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-600/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(22,163,74,0.15),transparent_60%)]" />
        </div>

        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <Leaf size={22} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white uppercase">
            VANGROVE
          </span>
        </div>

        <div className="relative">
          <div className="text-6xl font-black text-white/10 leading-none mb-6 select-none uppercase">
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

        <div className="relative space-y-4">
          {[
            "Diagnosis penyakit tanaman dengan AI",
            "Peta lahan digital & sertifikasi",
            "Rekomendasi eco-farming berkelanjutan",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-900/20">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-slate-300 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
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
              Daftar Akun
            </h1>
            <p className="text-slate-500 font-medium">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login"
                className="text-green-600 font-bold hover:underline"
              >
                Masuk disini
              </Link>
            </p>
          </div>

          <RegisterForm />

          <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed italic">
            Dengan mendaftar, Anda menyetujui{" "}
            <span className="text-slate-600 font-bold underline cursor-pointer">
              Syarat Penggunaan
            </span>{" "}
            dan{" "}
            <span className="text-slate-600 font-bold underline cursor-pointer">
              Kebijakan Privasi
            </span>{" "}
            Vangrove.
          </p>
        </div>
      </div>
    </div>
  );
}
