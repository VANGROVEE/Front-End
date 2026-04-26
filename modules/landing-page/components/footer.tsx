import React from "react";
import { Leaf, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 px-6 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 text-sm">
        {/* Branding */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-600" size={24} />
            <span className="font-bold text-lg text-slate-950">VANGROVE</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            growing the future, diagnosing today. agritech ecosystem powered by
            gemini ai.
          </p>
        </div>

        {/* Aplikasi */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-900">Aplikasi</h5>
          <a
            href="#"
            className="block text-slate-600 hover:text-green-600 transition"
          >
            Monitoring Lahan
          </a>
          <a
            href="#"
            className="block text-slate-600 hover:text-green-600 transition"
          >
            Diagnosis AI
          </a>
          <a
            href="#"
            className="block text-slate-600 hover:text-green-600 transition"
          >
            Pustaka Penyakit
          </a>
        </div>

        {/* Perusahaan */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-900">Perusahaan</h5>
          <a
            href="#"
            className="block text-slate-600 hover:text-green-600 transition"
          >
            Tentang Vangrove
          </a>
          <a
            href="#"
            className="block text-slate-600 hover:text-green-600 transition"
          >
            Karir
          </a>
          <a
            href="#"
            className="block text-slate-600 hover:text-green-600 transition"
          >
            Kontak
          </a>
        </div>

        {/* Legal */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-900">Legal</h5>
          <a
            href="#"
            className="block text-slate-600 hover:text-green-600 transition"
          >
            Kebijakan Privasi
          </a>
          <a
            href="#"
            className="block text-slate-600 hover:text-green-600 transition"
          >
            Syarat Penggunaan
          </a>
        </div>

        {/* Kontak */}
        <div className="space-y-4">
          <h5 className="font-bold text-slate-900">Hubungi Kami</h5>
          <div className="flex items-center gap-2 text-slate-600">
            <Mail size={16} /> info@vangrove.ai
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone size={16} /> +62 812-3456-7890
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center mt-16 pt-8 border-t border-slate-100 text-xs text-slate-400">
        © 2026 VANGROVEE Organization. Build with Next.js & Bun.
      </div>
    </footer>
  );
}
