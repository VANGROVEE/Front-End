import { ArrowLeft, Home, Sprout } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FCFDF8] flex items-center justify-center px-6">
      {/* Background dekoratif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-50 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-50 rounded-full blur-[100px] -z-10 opacity-60" />

      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-green-50 rounded-[40px] flex items-center justify-center shadow-inner border border-green-100">
              <Sprout size={56} className="text-green-400" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100 shadow-sm">
              <span className="text-red-500 font-black text-sm">!</span>
            </div>
          </div>
        </div>

        {/* Angka 404 */}
        <div className="space-y-2">
          <p className="text-[120px] font-black text-green-100 leading-none select-none">
            404
          </p>
          <div className="-mt-6 space-y-3">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              Lahan Tidak Ditemukan
            </h1>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
              Seperti benih yang ditanam di tempat kosong — halaman yang kamu
              cari tidak ada atau sudah dipindahkan.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-100" />
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-green-300 rounded-full" />
            <div className="w-1.5 h-1.5 bg-green-200 rounded-full" />
          </div>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Tombol */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-200 active:scale-95 w-full sm:w-auto justify-center"
          >
            <Home size={16} />
            Kembali ke Beranda
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-white text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200 w-full sm:w-auto justify-center"
          >
            <ArrowLeft size={16} />
            Ke Dashboard
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-300 font-medium">
          © 2026 <span className="text-slate-400">VANGROVE</span> — Agritech
          Modern Indonesia
        </p>
      </div>
    </div>
  );
}
