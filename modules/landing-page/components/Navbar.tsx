import React from "react";
import { Leaf, Search } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
            <Leaf size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-black  from-green-800 to-green-600">
            VANGROVE
          </span>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex relative w-80">
          <input
            type="text"
            placeholder="Cari penyakit, komoditas, lahan..."
            className="w-full bg-slate-50 border border-slate-100 rounded-full pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-green-100 focus:border-green-200 transition"
          />
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
        </div>

        {/* Links & CTA */}
        <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#monitoring" className="hover:text-green-600 transition">
            Monitoring
          </a>
          <a href="#ai-center" className="hover:text-green-600 transition">
            AI Center
          </a>
          <button className="bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-slate-900 transition shadow-md shadow-green-100">
            Daftar Lahan
          </button>
        </div>
      </div>
    </nav>
  );
}
