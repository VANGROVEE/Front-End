"use client";

import { useAuthStore } from "@/common/stores/use-auth-store";
import {
  Cpu,
  LayoutDashboard,
  Leaf,
  LogIn,
  Search,
  UserCircle,
} from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuthStore();
  

  return (
    <nav className="fixed w-full z-[100] top-0 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 shrink-0 group cursor-pointer"
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200/50 group-hover:rotate-6 transition-transform duration-300">
              <Leaf size={22} fill="currentColor" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-white rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            VAN<span className="text-green-600">GROVE</span>
          </span>
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex relative flex-1 max-w-md group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-600 transition-colors"
            size={18}
          />
          <input  
            type="text"
            placeholder="Cari penyakit, komoditas..."
            className="w-full bg-slate-100/50 border border-transparent rounded-2xl pl-12 pr-4 py-2.5 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-green-100 focus:border-green-200 transition-all duration-300 outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 md:gap-8">
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#monitoring"
              className="flex items-center gap-2 text-[13px] font-bold text-slate-600 hover:text-green-600 transition-colors"
            >
              <LayoutDashboard size={16} />
              Monitoring
            </Link>
            <Link
              href="#ai-center"
              className="flex items-center gap-2 text-[13px] font-bold text-slate-600 hover:text-green-600 transition-colors"
            >
              <Cpu size={16} />
              AI Center
            </Link>
          </div>

          <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

          {/* Conditional Rendering berdasarkan Auth State */}
          {user ? (
            <Link
              href="/dashboard"
              className="group flex items-center gap-3 bg-green-50 border border-green-100 pl-2 pr-4 py-1.5 rounded-2xl hover:bg-green-100 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-md shadow-green-200">
                {user.email?.charAt(0).toUpperCase() || (
                  <UserCircle size={18} />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-green-700 leading-none">
                  DASHBOARD
                </span>
                <span className="text-[10px] text-green-600/70 font-medium truncate max-w-[80px]">
                  {user.email}
                </span>
              </div>
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="group relative flex items-center gap-2 bg-slate-950 text-white px-6 py-2.5 rounded-2xl font-bold text-sm hover:bg-green-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-green-200 active:scale-95"
            >
              <LogIn
                size={16}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
