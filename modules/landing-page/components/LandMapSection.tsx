"use client";
import { MousePointer2 } from "lucide-react";
import dynamic from "next/dynamic";

const MapViewer = dynamic(() => import("./MapViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-slate-50 animate-pulse text-slate-500 font-medium">
      Memuat Peta Lahan...
    </div>
  ),
});

interface FarmLand {
  id: number;
  name: string;
  coord: [number, number];
  status: string;
}

export default function LandMapSection() {
  const centerPosition: [number, number] = [-6.2, 106.816666];

  const farmLands: FarmLand[] = [
    {
      id: 1,
      name: "Lahan Mangrove A1",
      coord: [-6.21, 106.82],
      status: "Sehat",
    },
    {
      id: 2,
      name: "Area Pembibitan B2",
      coord: [-6.195, 106.81],
      status: "Butuh Air",
    },
  ];

  return (
    <section id="monitoring" className="px-6 bg-white overflow-hidden py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr,2.5fr] gap-16 items-start">
          <div className="lg:sticky lg:top-32"></div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-green-50/50 rounded-[3.5rem] -z-10 group-hover:bg-green-100/50 transition-colors duration-500" />

            <div className="aspect-[16/10] lg:aspect-[21/10] w-full rounded-[3rem] border-[10px] border-white shadow-2xl overflow-hidden relative z-10">
              <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                    Sistem Koordinat Aktif
                  </span>
                </div>
              </div>

              <MapViewer
                centerPosition={centerPosition}
                farmLands={farmLands}
              />

              <div className="absolute bottom-6 left-6 z-[1000] bg-slate-900/90 backdrop-blur-md px-6 py-4 rounded-2xl text-white shadow-2xl flex gap-8 items-center border border-white/10">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                    Lat / Long
                  </p>
                  <p className="text-sm font-mono tracking-tighter">
                    6.2000° S, 106.8166° E
                  </p>
                </div>
                <div className="h-8 w-[1px] bg-white/20" />
                <div className="flex items-center gap-2">
                  <MousePointer2 size={16} className="text-green-400" />
                  <p className="text-xs font-bold">Klik Marker untuk Data AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
