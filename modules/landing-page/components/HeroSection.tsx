"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BotMessageSquare, Leaf } from "lucide-react";

export default function HeroSection() {
  return (
    <header className="relative pt-32 px-6 bg-[#FCFDF8] overflow-hidden min-h-[80vh] flex items-center">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-green-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr,1fr] gap-16 lg:gap-20 items-center relative z-10 w-full">
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000 ease-out">
          <Badge
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-green-200 text-green-700 px-4 py-2 rounded-full text-xs md:text-[13px] font-bold mb-8 shadow-sm tracking-wide flex items-center gap-2.5 w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <BotMessageSquare size={16} className="text-emerald-600" />
            AGRITECH BERBASIS AI
          </Badge>

          <h1 className="text-5xl lg:text-[5.5rem] font-black tracking-tighter text-slate-900 mb-6 leading-[1.05] lg:leading-[0.95]">
            Growing the <span className="text-slate-400">Future,</span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent italic pr-2">
              Diagnosing Today.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 max-w-xl mb-10 leading-relaxed font-medium">
            Vangrove menggabungkan{" "}
            <strong className="text-slate-900 font-bold">
              manajemen lahan digital
            </strong>{" "}
            dengan kekuatan visi AI untuk deteksi dini penyakit tanaman secara
            real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              className="group h-14 px-8 rounded-2xl bg-slate-950 hover:bg-emerald-600 text-white text-lg font-bold transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-emerald-200/50"
            >
              Mulai Monitoring
              <Leaf
                size={20}
                className="ml-2 group-hover:rotate-12 transition-transform"
              />
            </Button>
          </div>

          <div className="flex items-center gap-4 text-slate-500 border-t border-slate-200/60 pt-8">
            <div className="flex -space-x-3">
              {[
                "https://i.pravatar.cc/100?img=11",
                "https://i.pravatar.cc/100?img=12",
                "https://i.pravatar.cc/100?img=33",
              ].map((src, i) => (
                <Avatar
                  key={i}
                  className="w-10 h-10 border-2 border-white shadow-sm"
                >
                  <AvatarImage src={src} alt="Petani" />
                  <AvatarFallback className="bg-slate-200 text-xs">
                    P
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm font-medium">
              Bergabung dengan{" "}
              <span className="text-slate-900 font-bold">2,400+</span> petani
              cerdas
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
