import React from "react";
import {
  Leaf,
  BotMessageSquare,
  Camera,
  ChevronRight,
  Zap,
} from "lucide-react";

export default function HeroSection() {
  return (
    <header className="relative pt-32 pb-24 px-6 bg-[#FCFDF8] overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-green-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-emerald-50 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr,1fr] gap-12 lg:gap-20 items-center relative z-10">
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-green-100 text-green-700 px-4 py-2 rounded-full text-[13px] font-bold mb-8 shadow-sm tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <BotMessageSquare size={16} />
            AGRITECH BERBASIS AI
          </div>

          <h1 className="text-5xl lg:text-[5.5rem] font-black tracking-[-0.04em] text-slate-900 mb-8 leading-[0.95] lg:leading-[0.85]">
            Growing the <span className="text-slate-400">Future,</span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent italic">
              Diagnosing Today.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-10 leading-relaxed">
            Vangrove menggabungkan{" "}
            <strong className="text-slate-900 font-semibold">
              manajemen lahan digital
            </strong>{" "}
            dengan kekuatan visi AI untuk deteksi dini penyakit tanaman secara
            real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="group bg-slate-950 text-white px-8 py-5 rounded-2xl text-lg font-bold hover:bg-green-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-slate-200 hover:shadow-green-200">
              Mulai Monitoring
              <Leaf
                size={20}
                className="group-hover:rotate-12 transition-transform"
              />
            </button>
            <button className="group bg-white border border-slate-200 text-slate-800 px-8 py-5 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              Demo AI
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="flex items-center gap-4 text-slate-400 border-t border-slate-100 pt-8">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 shadow-sm flex items-center justify-center overflow-hidden"
                >
                  <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">
              Bergabung dengan{" "}
              <span className="text-slate-900 font-bold">2,400+</span> petani
              cerdas
            </p>
          </div>
        </div>

        <div className="relative animate-in fade-in zoom-in duration-1000 delay-300 w-full max-w-[400px] lg:max-w-[450px] mx-auto lg:ml-auto">
          <div className="aspect-square bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-[3rem] overflow-hidden shadow-inner relative border-[8px] border-white ring-1 ring-slate-200/60">
            <div className="absolute inset-0 flex items-center justify-center text-green-200/40 font-black text-[8rem] lg:text-[10rem] select-none tracking-tighter uppercase">
              AI
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-green-200/20 via-transparent to-transparent" />

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>

          <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-white/95 backdrop-blur-md p-4 pr-8 rounded-[2.2rem] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-white flex gap-4 items-center animate-bounce-slow">
            <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-200 shrink-0">
              <Camera size={26} />
            </div>
            <div className="whitespace-nowrap">
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-0.5">
                Diagnosis Aktif
              </p>
              <p className="text-lg lg:text-xl font-black text-slate-900 leading-none mb-1.5">
                Bercak Daun
              </p>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    />
                  ))}
                </div>
                <span className="font-mono text-[11px] font-bold text-green-700 bg-green-100/50 px-2 py-0.5 rounded-full">
                  98.2% Accuracy
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -right-4 bg-slate-900 text-white p-4 rounded-[1.8rem] shadow-2xl animate-float ring-8 ring-white/50 backdrop-blur-sm">
            <Zap size={24} className="text-yellow-400 fill-yellow-400" />
          </div>

          <div className="absolute top-1/2 -right-8 w-16 h-16 bg-emerald-400/10 rounded-full blur-xl" />
        </div>
      </div>
    </header>
  );
}
