import React from "react";
import { Leaf, Star, BotMessageSquare, Camera } from "lucide-react";

export default function HeroSection() {
  return (
    <header className="pt-36 pb-20 px-6 bg-[#FCFDF8]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1.2fr,1fr] gap-12 items-center">
        {/* Left Content */}
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <BotMessageSquare size={16} />
            AGRITECH BERBASIS GEMINI AI
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-950 mb-6 leading-[0.95]">
            Growing the Future, <br />
            <span className="text-green-600">Diagnosing Today.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed">
            Vangrove adalah platform ekosistem pertanian modern yang
            menggabungkan manajemen lahan digital dengan kekuatan analisis visi
            AI untuk deteksi dini penyakit tanaman.
          </p>
          <div className="flex gap-4">
            <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-green-600 transition-all flex items-center gap-2 shadow-xl shadow-slate-200 hover:shadow-green-100">
              Mulai Monitoring <Leaf size={20} />
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-slate-50 transition">
              Demo AI
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative animate-fade-in-up delay-150">
          <div className="aspect-[5/6] bg-green-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-green-50 relative border-4 border-white">
            <div className="absolute inset-0 flex items-center justify-center text-green-300 font-black text-9xl">
              AGRI
            </div>
          </div>
          {/* Float Element (AI Score Card) */}
          <div className="absolute -bottom-10 -left-16 bg-white p-6 rounded-3xl shadow-2xl border border-slate-100 flex gap-4 items-center">
            <Camera className="text-green-600" size={32} />
            <div>
              <p className="text-xs text-slate-400">Diagnosis AI Terakhir</p>
              <p className="text-lg font-bold text-slate-900">Bercak Daun</p>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <span className="font-mono text-slate-500">(98.2% Conf.)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
