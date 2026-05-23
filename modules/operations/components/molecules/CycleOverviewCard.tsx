import React, { useMemo } from "react";
import {
  Sprout,
  Calendar,
  CheckCircle2,
  Leaf,
  ActivitySquare,
  Timer,
  Droplets,
  Tractor,
} from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { PlantingCycle } from "../../types/cycle";
import { formatDate } from "../../utils/formatDate";
import { cn } from "@/lib/utils";
import { cy } from "date-fns/locale";
import { useCycles } from "../../hooks/cycle-hooks";
import { ActivityHeatmapCard } from "./ActivityHeatmapCard";

export interface HeatmapData {
  date: string;
  count: number;
  details: Record<string, number>;
  dominant_type: string;
}

export const CycleOverviewCard = ({ cycle }: { cycle: PlantingCycle }) => {
  const isHarvested = cycle.status === "HARVESTED";
  const activityCount = cycle.daily_activities?.length || 0;

  const { heatmapCalendar: heatmapData } = useCycles(cycle.id);

  const calculateAge = () => {
    if (!cycle.start_date) return 0;
    const start = new Date(cycle.start_date).getTime();
    const end =
      isHarvested && cycle.estimated_harvest
        ? new Date(cycle.estimated_harvest).getTime()
        : new Date().getTime();

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const plantAge = calculateAge();

  const last30Days = useMemo(() => {
    const days = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  }, []);

  const getHeatmapColor = (dominantType?: string) => {
    switch (dominantType) {
      case "WATERING":
        return "bg-blue-400 border-blue-500 shadow-blue-400/50";
      case "PLANTING":
        return "bg-green-500 border-green-600 shadow-green-500/50";
      case "FERTILIZING":
        return "bg-amber-400 border-amber-500 shadow-amber-400/50";
      case "HARVESTING":
        return "bg-purple-500 border-purple-600 shadow-purple-500/50";
      default:
        return "bg-slate-100 border-slate-200";
    }
  };

  return (
    <SpotlightCard
      className="rounded-[32px] border border-slate-100 bg-white shadow-sm h-full w-full"
      spotlightColor="rgba(22, 163, 74, 0.08)"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <CardContent className="p-8 relative z-10 flex flex-col h-full">
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-[20px] flex items-center justify-center shadow-inner border",
                  isHarvested
                    ? "bg-slate-50 border-slate-100 text-slate-400"
                    : "bg-green-100/50 border-green-200/50 text-green-600",
                )}
              >
                <Sprout size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                  {cycle.commodity.name || "Komoditas"}
                  {isHarvested && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md uppercase tracking-widest font-bold">
                      Panen
                    </span>
                  )}
                </h2>
                <p className="text-sm font-bold text-green-600 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                  <Leaf size={14} />
                  {cycle.variety || "Varietas Standar"}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center justify-end gap-1">
                <Timer size={12} /> Umur Tanaman
              </p>
              <div className="flex items-baseline justify-end gap-1">
                <span
                  className={cn(
                    "text-3xl font-black tracking-tighter",
                    isHarvested ? "text-slate-400" : "text-green-600",
                  )}
                >
                  {plantAge}
                </span>
                <span className="text-sm font-bold text-slate-500">Hari</span>
              </div>
            </div>
          </div>
          <div className="w-full border-t-2 border-dashed border-slate-100 my-6" />
        </div>

        <div className="flex-1 flex flex-col justify-center pb-6">
          <ActivityHeatmapCard cycle={cycle} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
          <div className="bg-slate-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:border-green-200 group">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 tracking-wider">
              <Calendar
                size={14}
                className="text-green-500 group-hover:scale-110 transition-transform"
              />{" "}
              Mulai Tanam
            </span>
            <p className="text-sm font-black text-slate-800 mt-1.5">
              {formatDate(cycle.start_date)}
            </p>
          </div>

          <div className="bg-slate-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:border-green-200 group">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 tracking-wider">
              <CheckCircle2
                size={14}
                className="text-green-500 group-hover:scale-110 transition-transform"
              />{" "}
              Est. Panen
            </span>
            <p className="text-sm font-black text-slate-800 mt-1.5">
              {cycle.estimated_harvest
                ? formatDate(cycle.estimated_harvest)
                : "-"}
            </p>
          </div>

          <div className="bg-slate-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:border-green-200 group">
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 tracking-wider">
              <Leaf
                size={14}
                className="text-green-500 group-hover:scale-110 transition-transform"
              />{" "}
              Metode
            </span>
            <p
              className="text-sm font-black text-slate-800 mt-1.5 truncate"
              title={cycle.planting_method || "Konvensional"}
            >
              {cycle.planting_method || "Konvensional"}
            </p>
          </div>

          <div className="bg-slate-50/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 transition-all hover:bg-white hover:border-blue-200 group relative overflow-hidden">
            <div className="absolute -right-2 -bottom-2 opacity-5">
              <ActivitySquare size={48} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 tracking-wider relative z-10">
              <ActivitySquare
                size={14}
                className="text-blue-500 group-hover:scale-110 transition-transform"
              />{" "}
              Total Aktivitas
            </span>
            <div className="flex items-baseline gap-1 mt-1.5 relative z-10">
              <p className="text-lg font-black text-slate-800 leading-none">
                {activityCount}
              </p>
              <span className="text-[10px] font-bold text-slate-500">Log</span>
            </div>
          </div>
        </div>
      </CardContent>
    </SpotlightCard>
  );
};
