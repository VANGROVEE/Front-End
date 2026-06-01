"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Home, Lock, LogIn, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  // Efek untuk countdown otomatis
  useEffect(() => {
    if (countdown <= 0) {
      router.push("/auth/login");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen bg-[#FCFDF8] flex items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-[120px] -z-10 opacity-40" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-50 rounded-full blur-[100px] -z-10 opacity-40" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <div className="flex justify-center">
          <div className="relative group">
            <div className="w-28 h-28 bg-white rounded-[32px] flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-red-100 transition-colors duration-500">
              <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center">
                <Lock size={40} className="text-red-500" strokeWidth={1.5} />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm animate-bounce">
              <ShieldAlert size={18} className="text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
            Akses Ditolak
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed max-w-xs mx-auto text-sm">
            Sesi kamu telah berakhir atau kamu belum login. Silakan masuk
            kembali ke platform.
          </p>
        </div>

        <Card className="border-slate-100 shadow-sm bg-white/50 backdrop-blur-sm rounded-[24px] overflow-hidden">
          <CardContent className="p-6 space-y-4 text-left">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Auto Redirecting
              </span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {countdown}s
              </span>
            </div>

            <Progress
              value={(countdown / 10) * 100}
              className="h-1.5 bg-slate-100"
            />
            <p className="text-[11px] text-slate-400 leading-tight">
              Kamu akan diarahkan ke halaman login secara otomatis untuk
              memperbarui sesi.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            asChild
            className="h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95"
          >
            <Link href="/auth/login">
              <LogIn className="mr-2 h-4 w-4" /> Login Sekarang
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-95"
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Beranda
            </Link>
          </Button>
        </div>

        <div className="pt-4">
          <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.2em]">
            © 2026 Vangrove — Agritech Modern
          </p>
        </div>
      </div>
    </div>
  );
}
