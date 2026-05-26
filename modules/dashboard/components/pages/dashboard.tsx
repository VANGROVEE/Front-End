"use client";

import { Dashboard3D } from "@/modules/dashboard/components/molecules/dashboard3D";
import { AnalyticsGrid } from "@/modules/dashboard/components/molecules/AnalyticsGrid";
import { TableDailyHarvest } from "@/modules/dashboard/components/molecules/TableDailyHarvest";
import { GrowthGauge } from "@/modules/dashboard/components/molecules/GrowthGauge";
import { TaskItem } from "@/modules/dashboard/components/molecules/TaskItem";
import { ChartFertilizer } from "@/modules/dashboard/components/molecules/ChartFertilizer";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div className="relative rounded-[40px] shadow-xl shadow-green-900/5 border border-slate-100 overflow-hidden bg-white">
          <Dashboard3D />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Peta Lahan
            </h3>
            <div className="h-32 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300">
              Map Placeholder
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Panen Hari Ini
              </h3>
              <button className="text-[10px] font-black underline text-green-600 hover:text-green-700">
                LIHAT SEMUA
              </button>
            </div>
            <TableDailyHarvest />
          </div>
        </div>

        <div className="pt-2">
          <AnalyticsGrid />
        </div>
      </div>

      <aside className="col-span-12 lg:col-span-3 space-y-6">
        <div className="bg-white p-8 rounded-[40px] shadow-sm flex flex-col min-h-[580px] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="flex justify-between items-center mb-4 relative z-10">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              AI Assistant
            </h3>
            <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-lg font-black tracking-tighter">
              95% ↗
            </span>
          </div>

          <GrowthGauge value={86} />

          <div className="mt-6 space-y-2 relative z-10">
            <TaskItem
              title="Siram Tanaman"
              desc="Plot A-12 butuh air"
              icon="💧"
            />
            <TaskItem
              title="Beri Pupuk"
              desc="Nutrisi tanah rendah"
              icon="🌱"
            />
            <TaskItem title="Cek Penyakit" desc="Deteksi dini daun" icon="🔍" />
          </div>

          <button className="mt-auto w-full bg-slate-950 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-green-600 transition-all transform active:scale-95 relative z-10">
            Buka AI Center
          </button>
        </div>

        <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
            Konsumsi Pupuk
          </h3>
          <ChartFertilizer />
        </div>
      </aside>
    </div>
  );
}
