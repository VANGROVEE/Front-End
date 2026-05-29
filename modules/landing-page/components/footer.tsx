"use client";

import { Globe, Leaf, Mail, Phone } from "lucide-react";

// Import Komponen Shadcn UI resmi
import { SocialButton } from "@/common/icons/SocialLink";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const developers = [
    { name: "Akhdaan", role: "AI Engineer", initial: "MA" },
    { name: "Albert", role: "AI Engineer", initial: "NA" },
    { name: "Putri", role: "Data Scientist", initial: "PP" },
    { name: "Mike", role: "Data Scientist", initial: "MV" },
    { name: "Aulia", role: "Full-Stack Dev", initial: "YA" },
    { name: "Rizal", role: "Full-Stack Dev", initial: "RS" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-slate-100 bg-[#FCFDF8] px-6 py-16 md:py-24">
      {/* Glow Ornamen untuk Vibe Modern */}
      <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-96 w-96 rounded-full bg-emerald-50 blur-[120px] opacity-70" />
      <div className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-green-50 blur-[100px] opacity-50" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* BRANDING SECTION */}
          <div className="col-span-1 space-y-6 md:col-span-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-200/50 transition-transform hover:rotate-6">
                <Leaf size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">
                VANGROVE
              </span>
            </div>
            <p className="max-w-sm text-base font-medium leading-relaxed text-slate-500">
              Membangun masa depan pertanian melalui kecerdasan spasial dan
              diagnosis AI presisi tinggi.{" "}
              <span className="text-emerald-600 font-semibold">
                Empowering farmers, digitally.
              </span>
            </p>

            {/* PERBAIKAN: Menggunakan Shadcn Button untuk Link Sosial Media */}
            <div className="flex gap-3">
              <SocialButton
                href="https://github.com/vangrove"
                platform="github"
              />
              <SocialButton
                href="https://linkedin.com/company/vangrove"
                platform="linkedin"
              />
              <a
                href="#"
                className="p-2.5 bg-white border border-slate-200 rounded-xl hover:text-green-600 hover:border-green-200 transition-all flex items-center justify-center shadow-sm"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="col-span-1 space-y-6 md:col-span-2">
            <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              Ekosistem
            </h5>
            <ul className="space-y-4 font-bold text-slate-600">
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Monitoring
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Diagnosis AI
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Sensus Lahan
                </a>
              </li>
            </ul>
          </div>

          {/* DEVELOPER TEAM GRID */}
          <div className="col-span-1 space-y-6 md:col-span-4">
            <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              Core Contributors
            </h5>
            <div className="grid grid-cols-2 gap-4">
              {developers.map((dev, idx) => (
                <div key={idx} className="group flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white text-[10px] font-black text-emerald-600 shadow-sm transition-transform group-hover:scale-110">
                    {dev.initial}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-black text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {dev.name}
                    </p>
                    <p className="text-[9px] font-bold uppercase tracking-tighter text-slate-400">
                      {dev.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="col-span-1 space-y-6 md:col-span-2">
            <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
              Hubungi
            </h5>
            <div className="space-y-4">
              <a
                href="mailto:info@vangrove.ai"
                className="flex items-center gap-3 text-slate-600 hover:text-emerald-600 transition-colors group"
              >
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Mail size={14} />
                </div>
                <span className="text-xs font-black italic">Support</span>
              </a>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                  <Phone size={14} />
                </div>
                <span className="text-xs font-black tracking-tighter">
                  +62-811-2233
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-12 bg-slate-100" />

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-emerald-100 bg-emerald-50/50 text-[10px] font-black text-emerald-700"
            >
              STABLE v2.4
            </Badge>
            <p className="text-[12px] font-bold text-slate-400">
              © 2026 <span className="text-slate-900">VANGROVE</span>{" "}
              Spatio-Temporal Intelligence.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-black text-slate-400">
            <a
              href="#"
              className="hover:text-slate-900 uppercase tracking-widest"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-slate-900 uppercase tracking-widest"
            >
              Terms
            </a>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="text-slate-400">Engineered with</span>
              <span className="text-slate-900">Bun</span>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span className="text-slate-900">Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
