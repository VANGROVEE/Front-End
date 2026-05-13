import React from "react";
import { Leaf, Mail, Phone, Globe } from "lucide-react";
import { SocialButton } from "@/common/icons/SocialLink";

export default function Footer() {
  const developers = [
    { name: "Aulia", role: "Back End" },
    { name: "Surya", role: "Front End" },
    { name: "Akhdan", role: "Ai Engineer" },
    { name: "Albert", role: "Ai Engineer" },
    { name: "Mike", role: "Data Science" },
    { name: "Putri", role: "Data Science" },
  ];

  return (
    <footer className="py-20 px-6 bg-[#FCFDF8] border-t border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-[100px] -z-10 opacity-60" />

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-12 gap-12 text-sm relative z-10">
        <div className="col-span-2 md:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-green-200/50 transform hover:rotate-6 transition-transform">
              <Leaf size={26} fill="currentColor" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-950">
              VANGROVE
            </span>
          </div>
          <p className="text-slate-500 leading-relaxed max-w-sm text-base font-medium">
            Growing the future, diagnosing today. Ekosistem Agritech modern yang
            memberdayakan petani dengan teknologi AI presisi.
          </p>
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

        <div className="col-span-1 md:col-span-2 space-y-6">
          <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-2">
            Aplikasi
          </h5>
          <ul className="space-y-3 font-semibold text-slate-500">
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">
                Monitoring Lahan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">
                Diagnosis AI
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-600 transition-colors">
                Pustaka Penyakit
              </a>
            </li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-4 space-y-6">
          <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-2">
            Tim Pengembang
          </h5>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            {developers.map((dev, idx) => (
              <div key={idx} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform overflow-hidden flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
                  <span className="text-[10px] font-black text-green-600/50 uppercase">
                    {dev.name.substring(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-slate-800 leading-none mb-1 group-hover:text-green-600 transition-colors">
                    {dev.name}
                  </p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">
                    {dev.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 space-y-6">
          <h5 className="font-bold text-slate-900 uppercase tracking-widest text-[11px] border-b border-slate-100 pb-2">
            Hubungi Kami
          </h5>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-500 group cursor-pointer hover:text-green-600 transition-colors">
              <div className="p-2 bg-green-50 rounded-lg text-green-600">
                <Mail size={16} />
              </div>
              <span className="font-bold text-[13px]">info@vangrove.ai</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 group cursor-pointer hover:text-green-600 transition-colors">
              <div className="p-2 bg-green-50 rounded-lg text-green-600">
                <Phone size={16} />
              </div>
              <span className="font-bold text-[13px]">+62 812 3456</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-[13px] font-semibold text-slate-400">
            © 2026 <span className="text-slate-900">VANGROVE</span> Org.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-[12px] font-bold text-slate-400">
          <a
            href="#"
            className="hover:text-slate-900 transition-colors underline decoration-slate-200 underline-offset-4"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-slate-900 transition-colors underline decoration-slate-200 underline-offset-4"
          >
            Terms of Service
          </a>
          <div className="flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 text-slate-500">
            Build with <span className="text-slate-900">Next.js</span> &{" "}
            <span className="text-orange-600">Bun</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
