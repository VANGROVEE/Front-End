import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Leaf, Scale } from "lucide-react";

export const CycleSummaryContent = ({ data, aiResponse }: any) => (
  <div className="space-y-7">
    <section className="flex items-start justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-50 rounded-lg">
            <Leaf size={16} className="text-emerald-600" />
          </div>
          <h3 className="text-base font-bold tracking-tight text-slate-900">
            Laporan Siklus {data.commodity_name}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          {data.land_name} •{" "}
          <span className="text-emerald-600">Siklus Berjalan Baik</span>
        </p>
      </div>
      <Badge className="bg-emerald-500 rounded-full">{data.status}</Badge>
    </section>

    <section className="bg-slate-900 rounded-2xl p-5 text-white flex items-center justify-between relative overflow-hidden">
      <div className="flex items-center gap-6 z-10">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Total Produksi
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black">
              {data.harvest?.total_yield_kg || 0}
            </span>
            <span className="text-xs font-bold text-emerald-400">KG</span>
          </div>
        </div>
        <Separator orientation="vertical" className="h-8 bg-white/20" />
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Masa Tanam
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black">{data.duration_days}</span>
            <span className="text-xs font-bold text-blue-400">HARI</span>
          </div>
        </div>
      </div>
      <Scale size={60} className="absolute -right-4 opacity-10 rotate-12" />
    </section>
  </div>
);
