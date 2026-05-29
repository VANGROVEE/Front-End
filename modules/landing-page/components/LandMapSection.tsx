"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DashboardSkeleton } from "@/modules/dashboard/components/molecules/DashboardSkeleton";
import { motion } from "framer-motion";
import { Crosshair, MousePointer2, Scan, ShieldCheck, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { mockLands } from "../const/data";

const MapViewer = dynamic(() => import("./MapViewer"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});

export default function LandMapSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const centerPosition: [number, number] = [-6.2, 106.816666];

  if (!isMounted) return null;

  return (
    <section
      id="monitoring"
      className="relative px-6 py-24 bg-[#FCFDF8] overflow-hidden border-y border-slate-100"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-10"
          >
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="border-emerald-200 text-emerald-700 bg-emerald-50/50 py-1.5 px-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] gap-2 w-fit shadow-sm"
              >
                <Scan size={14} className="animate-pulse text-emerald-500" />
                Spatial Intelligence
              </Badge>

              <h2 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[0.95]">
                Pantau Lahan <br />
                <span className="bg-gradient-to-r from-emerald-600 to-green-400 bg-clip-text text-transparent italic">
                  Tanpa Batas.
                </span>
              </h2>

              <p className="text-slate-500 font-medium leading-relaxed max-w-md text-lg">
                Integrasi citra satelit multispektral untuk analisis vegetasi
                presisi tinggi yang divisualisasikan secara{" "}
                <span className="text-slate-900 font-bold underline decoration-emerald-300 underline-offset-4">
                  real-time
                </span>
                .
              </p>
            </div>

            <div className="grid gap-4 w-full">
              {[
                {
                  title: "Spatio-Temporal Mapping",
                  desc: "Konversi otomatis koordinat lahan ke poligon visual presisi.",
                  icon: ShieldCheck,
                  color: "text-blue-600",
                  bg: "bg-blue-50",
                },
                {
                  title: "Neural Disease Detection",
                  desc: "Insight AI berbasis visi komputer dari deteksi citra satelit.",
                  icon: Zap,
                  color: "text-amber-600",
                  bg: "bg-amber-50",
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="border-slate-100 shadow-sm rounded-3xl overflow-hidden group hover:border-emerald-200 hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-6 flex gap-5 items-center">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500",
                        item.bg,
                        item.color,
                      )}
                    >
                      <item.icon size={28} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black uppercase text-slate-800 tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="lg:col-span-7 w-full relative group"
          >
            <div className="absolute -inset-4 bg-emerald-100/20 rounded-[4rem] blur-3xl -z-10 group-hover:bg-emerald-200/30 transition-colors duration-1000" />

            <div className="w-full aspect-[4/5] lg:aspect-square max-h-[700px] rounded-[3.5rem] border-[12px] border-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden relative ring-1 ring-slate-200/60">
              <div className="absolute top-8 left-8 z-[400] pointer-events-none">
                <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] shadow-2xl flex items-center gap-4">
                  <div className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em] leading-none mb-1">
                      Signal Active
                    </span>
                    <span className="text-xs font-mono font-bold text-white/90 tracking-tight italic">
                      Engine-Core v2.4.0
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full h-full grayscale-[0.2] contrast-[1.1] brightness-[1.05]">
                <MapViewer
                  lands={mockLands}
                  centerPosition={centerPosition}
                  zoom={13}
                />
              </div>

              <div className="absolute bottom-8 inset-x-8 z-[400] pointer-events-none">
                <div className="bg-white/95 backdrop-blur-xl border border-white p-2 pl-6 rounded-[2.5rem] shadow-2xl pointer-events-auto flex items-center justify-between group/hud transition-transform hover:scale-[1.02] duration-500">
                  <div className="hidden sm:flex items-center gap-3">
                    <Crosshair size={16} className="text-slate-400" />
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">
                        Telemetry Origin
                      </p>
                      <p className="text-[11px] font-mono font-black text-slate-800">
                        {centerPosition[0]}° S / {centerPosition[1]}° E
                      </p>
                    </div>
                  </div>

                  <Separator
                    orientation="vertical"
                    className="h-10 bg-slate-100 mx-4 hidden sm:block"
                  />

                  <div className="flex items-center gap-4 bg-emerald-600 p-3 pr-8 rounded-full text-white shadow-lg shadow-emerald-200 transition-all group-hover/hud:bg-emerald-500">
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                      <MousePointer2 size={18} className="animate-bounce" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-black uppercase tracking-tighter leading-none">
                        Interactive Map
                      </p>
                      <span className="text-[9px] font-bold opacity-80 uppercase tracking-widest">
                        Explore Insights
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[size:100%_4px,3px_100%] z-[300] opacity-20" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
