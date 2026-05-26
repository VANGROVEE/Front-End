"use client";

import React from "react";
import {
  Sprout,
  Calendar,
  CheckCircle2,
  Leaf,
  ActivitySquare,
  Timer,
  Settings2,
  Pencil,
  AlertTriangle,
  ChevronDown,
  Lock,
} from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlantingCycle } from "../../types/cycle";
import { formatDate } from "../../utils/formatDate";
import { cn } from "@/lib/utils";
import { ActivityHeatmapCard } from "./ActivityHeatmapCard";
import { useCycles } from "../../hooks/cycle-hooks";
import { EmptyState } from "@/modules/report/components/molecules/EmptyState";

interface CycleOverviewCardProps {
  cycleId: string;
  onEdit?: (cycle: PlantingCycle) => void;
  onStatusUpdate?: (id: string, payload: { status: string }) => void;
}

export const CycleOverviewCard = ({
  cycleId,
  onEdit,
  onStatusUpdate,
}: CycleOverviewCardProps) => {
  const { cycleDetail: cycle } = useCycles(cycleId);

  const isHarvested = cycle?.status === "HARVESTED";
  const isFailed = cycle?.status === "FAILED";
  const activityCount = cycle?.daily_activities?.length || 0;

  const hasStartedActivities = activityCount > 0;

  const calculateAge = () => {
    if (!cycle?.start_date) return 0;
    const start = new Date(cycle?.start_date).getTime();
    const end =
      (isHarvested || isFailed) && cycle?.estimated_harvest
        ? new Date(cycle?.estimated_harvest).getTime()
        : new Date().getTime();

    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const plantAge = calculateAge();

  if (!cycle) {
    return <EmptyState message="data tidak ditemukan" />;
  }

  return (
    <TooltipProvider>
      <SpotlightCard
        className="rounded-[32px] border border-slate-100 bg-white shadow-sm h-full w-full relative group"
        spotlightColor="rgba(22, 163, 74, 0.08)"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50" />

        <CardContent className="p-6 lg:p-8 relative z-10 flex flex-col h-full gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div
                className={cn(
                  "w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center shadow-inner border transition-transform group-hover:rotate-3 duration-500",
                  isHarvested
                    ? "bg-slate-50 border-slate-100 text-slate-300"
                    : isFailed
                      ? "bg-red-50 border-red-100 text-red-400"
                      : "bg-green-50 border-green-100 text-green-600",
                )}
              >
                <Sprout size={32} strokeWidth={1.5} />
              </div>

              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl lg:text-2xl font-black text-slate-800 tracking-tight truncate uppercase">
                    {cycle?.commodity.name || "Komoditas"}
                  </h2>
                  {isHarvested && (
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-lg">
                      Berhasil Panen
                    </Badge>
                  )}
                  {isFailed && (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-lg">
                      Gagal Panen
                    </Badge>
                  )}
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] font-bold text-green-600 border-green-100 bg-green-50/50 gap-1.5 px-3 py-1 rounded-full"
                >
                  <Leaf size={12} />
                  {cycle?.variety || "Varietas Standar"}
                </Badge>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-slate-50 text-slate-500 border-none hover:bg-green-50 hover:text-green-600 transition-all font-bold text-[10px] uppercase tracking-widest shadow-none"
                >
                  <Settings2 size={14} className="stroke-[2.5]" />
                  Kelola Siklus
                  <ChevronDown size={12} className="opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-60 rounded-2xl p-2 shadow-2xl border-slate-100"
              >
                <div className="px-3 py-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Kontrol Data
                </div>

                {hasStartedActivities ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-3 p-3 rounded-xl opacity-50 cursor-not-allowed text-slate-400 font-bold text-xs bg-slate-50/50 select-none">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                          <Lock size={14} />
                        </div>
                        Ubah Detail Siklus
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="left"
                      className="bg-slate-900 text-white border-none rounded-lg text-[10px] font-bold px-3 py-2 shadow-xl z-[100]"
                    >
                      Data terkunci karena riwayat aktivitas sudah dimulai.
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <DropdownMenuItem
                    disabled={isFailed || isHarvested}
                    onClick={() => onEdit?.(cycle)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                      <Pencil size={14} />
                    </div>
                    Ubah Detail Siklus
                  </DropdownMenuItem>
                )}

                <DropdownMenuSeparator className="my-1 bg-slate-50" />

                <DropdownMenuItem
                  onClick={() =>
                    onStatusUpdate?.(cycle?.id, { status: "FAILED" })
                  }
                  disabled={isFailed || isHarvested}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer text-red-500 font-bold text-xs hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                    <AlertTriangle size={14} />
                  </div>
                  Laporkan Gagal Panen
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 rounded-[28px] p-5 flex items-center justify-between transition-colors hover:bg-white hover:border-green-100">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-green-500 shadow-sm border border-slate-50">
                <Timer size={20} strokeWidth={2.5} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                  Lama Budidaya
                </p>
                <p className="text-[10px] font-bold text-slate-500">
                  Durasi siklus dari penanaman
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 pr-2">
              <span
                className={cn(
                  "text-4xl font-black tracking-tighter leading-none transition-colors",
                  isHarvested || isFailed ? "text-slate-300" : "text-green-600",
                )}
              >
                {plantAge}
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Hari
              </span>
            </div>
          </div>

          <div className="flex-1 min-h-[140px] flex flex-col justify-center bg-white border border-slate-50 rounded-[28px] p-4 shadow-inner overflow-hidden">
            <ActivityHeatmapCard cycle={cycle} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-auto">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 transition-all hover:border-green-100 hover:shadow-sm">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.1em] flex items-center gap-2 mb-2">
                <Calendar size={12} className="text-green-500" /> Start
              </p>
              <p className="text-[11px] font-black text-slate-700 uppercase leading-none">
                {formatDate(cycle?.start_date)}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 transition-all hover:border-green-100 hover:shadow-sm">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.1em] flex items-center gap-2 mb-2">
                <CheckCircle2 size={12} className="text-green-500" /> Estimasi
              </p>
              <p className="text-[11px] font-black text-slate-700 uppercase leading-none">
                {cycle?.estimated_harvest
                  ? formatDate(cycle?.estimated_harvest)
                  : "-"}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 transition-all hover:border-green-100 hover:shadow-sm">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.1em] flex items-center gap-2 mb-2">
                <Leaf size={12} className="text-green-500" /> Metode
              </p>
              <p
                className="text-[11px] font-black text-slate-700 truncate uppercase leading-none"
                title={cycle?.planting_method || "Konvensional"}
              >
                {cycle?.planting_method || "Konvensional"}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 transition-all hover:border-blue-100 hover:shadow-sm">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.1em] flex items-center gap-2 mb-2">
                <ActivitySquare size={12} className="text-blue-500" /> Aktivitas
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-base font-black text-slate-800 leading-none">
                  {activityCount}
                </p>
                <span className="text-[9px] font-bold text-slate-400">
                  DATA
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </SpotlightCard>
    </TooltipProvider>
  );
};
