import { Home, Lock, LogIn } from "lucide-react";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#FCFDF8] flex items-center justify-center px-6">
      {/* Background dekoratif */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-[120px] -z-10 opacity-40" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-50 rounded-full blur-[100px] -z-10 opacity-40" />

      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 bg-red-50 rounded-[40px] flex items-center justify-center shadow-inner border border-red-100">
              <Lock size={56} className="text-red-400" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-50 rounded-2xl flex items-center justify-center border border-yellow-100 shadow-sm">
              <span className="text-yellow-500 font-black text-sm">🔒</span>
            </div>
          </div>
        </div>

        {/* Angka 401 */}
        <div className="space-y-2">
          <p className="text-[120px] font-black text-red-100 leading-none select-none">
            401
          </p>
          <div className="-mt-6 space-y-3">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              Akses Ditolak
            </h1>
            <p className="text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
              Seperti lahan yang terkunci — kamu perlu izin untuk masuk ke area
              ini. Silakan login terlebih dahulu.
            </p>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-left flex gap-3">
          <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center shrink-0">
            <Lock size={14} className="text-red-500" />
          </div>
          <div>
            <p className="text-xs font-black text-red-600 uppercase tracking-wider mb-1">
              Mengapa ini terjadi?
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sesi kamu telah berakhir atau kamu belum login. Login kembali
              untuk melanjutkan akses ke platform Vangrove.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-100" />
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
            <div className="w-1.5 h-1.5 bg-red-300 rounded-full" />
            <div className="w-1.5 h-1.5 bg-red-200 rounded-full" />
          </div>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Tombol */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-200 active:scale-95 w-full sm:w-auto justify-center"
          >
            <LogIn size={16} />
            Login Sekarang
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 bg-white text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200 w-full sm:w-auto justify-center"
          >
            <Home size={16} />
            Ke Beranda
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
