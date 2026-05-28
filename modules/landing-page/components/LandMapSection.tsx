"use client";
import { motion } from "framer-motion";
import { MousePointer2, Scan, ShieldCheck, Zap } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

// Shadcn Components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DashboardSkeleton } from "@/modules/dashboard/components/molecules/DashboardSkeleton";

const MapViewer = dynamic(() => import("./MapViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px]">
      <DashboardSkeleton />
    </div>
  ),
});

export default function LandMapSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const centerPosition: [number, number] = [-6.2, 106.816666];

  const mockLands = useMemo(
    () => [
      {
        id: "land-1",
        name: "Blok Mangrove Utama",
        position: [-6.21, 106.82] as [number, number],
        area_ha: 15.5,
        health_status: "NORMAL",
        address: "Pesisir Utara Sektor A",
        health_reports: [
          {
            id: "r1",
            confidence_score: 0.98,
            gemini_insight: {
              causes: "Optimasi Nutrisi",
              recovery: "Stabil",
              prevention: ["Monitoring"],
              treatment: ["Lanjutkan irigasi berkala"],
              disease_description: "Vegetasi Sehat",
            },
            is_outbreak_trigger: false,
            created_at: new Date().toISOString(),
          },
        ],
      },
      {
        id: "land-2",
        name: "Sektor Pembibitan B2",
        position: [-6.195, 106.81] as [number, number],
        area_ha: 3000,
        health_status: "WARNING",
        address: "Zona Konservasi Barat",
        health_reports: [
          {
            id: "r2",
            confidence_score: 0.94,
            gemini_insight: {
              causes: "Jamur",
              recovery: "Sedang",
              prevention: ["Fungisida"],
              treatment: ["Gunakan fungisida tembaga"],
              disease_description: "Early Blight Terdeteksi",
            },
            is_outbreak_trigger: true,
            created_at: new Date().toISOString(),
          },
        ],
      },
    ],
    [],
  );

  if (!isMounted) return null;

  return (
    <section
      id="monitoring"
      className="px-6 bg-white overflow-hidden py-24 border-y border-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* INFO SIDE (4/12 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8 w-full"
          >
            <div className="space-y-6">
              <Badge
                variant="outline"
                className="border-emerald-200 text-emerald-700 bg-emerald-50/50 py-1.5 px-4 rounded-full font-black uppercase tracking-[0.2em] text-[10px] gap-2 w-fit"
              >
                <Scan size={14} className="animate-pulse" />
                Spatial Intelligence
              </Badge>

              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Pantau Lahan <br />
                <span className="text-emerald-500 italic">Tanpa Batas.</span>
              </h2>

              <p className="text-slate-500 font-medium leading-relaxed max-w-md text-base lg:text-lg">
                Integrasi citra satelit dengan untuk analisis vegetasi presisi
                tinggi yang divisualisasikan secara real-time.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
              {[
                {
                  title: "Spatio-Temporal Mapping",
                  desc: "Konversi otomatis luas lahan ke poligon visual presisi.",
                  icon: ShieldCheck,
                },
                {
                  title: "Neural Disease Detection",
                  desc: "Insight Gemini AI langsung dari deteksi citra multispektral.",
                  icon: Zap,
                },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="border-slate-100 shadow-sm rounded-3xl overflow-hidden group hover:bg-slate-50/50 transition-colors"
                >
                  <CardContent className="p-5 flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon size={24} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-semibold leading-tight mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* MAP SIDE (7/12 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 w-full relative h-[500px] lg:h-[600px]"
          >
            {/* Ambient Glow */}
            <div className="absolute -inset-10 bg-emerald-100/30 rounded-full blur-[100px] -z-10 animate-pulse" />

            <div className="w-full h-full rounded-[3rem] border-[8px] lg:border-[12px] border-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] overflow-hidden relative">
              {/* TOP HUD OVERLAY */}
              <div className="absolute top-6 left-6 z-[400] pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1">
                      Signal Active
                    </span>
                    <span className="text-[11px] font-bold text-white tracking-tight italic">
                      Engine-Core v2.4
                    </span>
                  </div>
                </div>
              </div>

              {/* MAP ENGINE */}
              <div className="w-full h-full bg-slate-50">
                <MapViewer
                  lands={mockLands}
                  centerPosition={centerPosition}
                  zoom={13}
                />
              </div>

              {/* BOTTOM HUD LEGEND */}
              <div className="absolute bottom-6 inset-x-6 z-[400] pointer-events-none flex justify-center">
                <div className="bg-white/95 backdrop-blur-md border border-slate-100 p-4 rounded-3xl shadow-xl pointer-events-auto flex items-center gap-6 max-w-full">
                  <div className="hidden sm:block">
                    <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest mb-1">
                      Telemetry Origin
                    </p>
                    <p className="text-[11px] font-mono font-black text-slate-800">
                      {centerPosition[0]}° S, {centerPosition[1]}° E
                    </p>
                  </div>

                  <Separator
                    orientation="vertical"
                    className="h-8 bg-slate-100 hidden sm:block"
                  />

                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-100 shrink-0">
                      <MousePointer2 size={16} className="animate-pulse" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase text-slate-800 tracking-tighter leading-none">
                        Interactive Map
                      </p>
                      <span className="text-emerald-600 font-bold tracking-widest text-[8px] uppercase">
                        Tap for AI Insights
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
