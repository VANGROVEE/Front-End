"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDaily } from "@/modules/operations/hooks/daily-hooks";
import { DailyActivity } from "@/modules/operations/types/activty";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sprout,
} from "lucide-react";
import { useState } from "react";
import { DashboardCycle } from "../../types/harvest";
import { DetailDropdown } from "./DetailDropdown";

// ── Activity Config ──────────────────────────────────────────
const activityConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  WATERING: { label: "Penyiraman", color: "text-blue-500", bg: "bg-blue-50" },
  OBSERVATION: {
    label: "Observasi",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  HARVESTING: {
    label: "Panen",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  PLANTING: { label: "Penanaman", color: "text-green-500", bg: "bg-green-50" },
  PEST_CONTROL: {
    label: "Pengendalian Hama",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  FERTILIZING: {
    label: "Pemupukan",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  SOIL_PREPARATION: {
    label: "Persiapan Tanah",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
};

const getConfig = (type: string) =>
  activityConfig[type] ?? {
    label: type,
    color: "text-slate-500",
    bg: "bg-slate-50",
  };

const formatDate = (dateString: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));

// ── Helper: Hitung statistik ─────────────────────────────────
const getActivityStats = (activities: DailyActivity[]) => {
  const typeCounts: Record<string, number> = {};
  activities.forEach((a) => {
    typeCounts[a.activity_type] = (typeCounts[a.activity_type] || 0) + 1;
  });

  const mostFrequent = Object.entries(typeCounts).sort(
    (a, b) => b[1] - a[1],
  )[0];

  const temps = activities
    .map((a) => a.weather_data?.temperature)
    .filter(Boolean) as number[];
  const humidities = activities
    .map((a) => a.weather_data?.humidity)
    .filter(Boolean) as number[];

  const avgTemp = temps.length
    ? (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1)
    : null;
  const avgHumidity = humidities.length
    ? Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length)
    : null;

  const firstDate = activities[activities.length - 1]?.activity_date;
  const lastDate = activities[0]?.activity_date;

  return {
    typeCounts,
    mostFrequent,
    avgTemp,
    avgHumidity,
    firstDate,
    lastDate,
  };
};

// ── Props ────────────────────────────────────────────────────
export interface CycleListItemProps {
  cycle: DashboardCycle;
  formatDate: (date: string) => string;
}

// ── Component ────────────────────────────────────────────────
export const CycleListItem = ({
  cycle,
  formatDate: fmtDate,
}: CycleListItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const isFailed = cycle.status === "FAILED";
  const isCompleted =
    cycle.status === "COMPLETED" || cycle.status === "HARVESTED";

  const { activities, isLoadingActivities } = useDaily({
    cycle_id: expanded ? cycle.id : undefined,
  });

  const stats =
    activities && activities.length > 0 ? getActivityStats(activities) : null;

  return (
    <div className="rounded-[28px] border border-slate-100 bg-white hover:border-slate-200 transition-all overflow-hidden">
      {/* ── Card Utama ── */}
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                isFailed
                  ? "bg-red-50 text-red-500"
                  : isCompleted
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-blue-50 text-blue-500",
              )}
            >
              {isFailed ? (
                <AlertCircle size={24} />
              ) : (
                <CheckCircle2 size={24} />
              )}
            </div>
            <div>
              <h3 className="font-black text-slate-800 uppercase text-sm tracking-tight">
                {cycle.commodity?.name}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                {cycle.variety || "Varietas Standar"}
              </p>
              <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
                <span className="bg-slate-50 px-1.5 py-0.5 rounded-md">
                  {fmtDate(cycle.start_date)}
                </span>
                <span>—</span>
                <span className="bg-slate-50 px-1.5 py-0.5 rounded-md">
                  {cycle.end_date ? fmtDate(cycle.end_date) : "Berjalan"}
                </span>
              </div>
            </div>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "text-[9px] font-black uppercase border-none px-2",
              isFailed
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-600",
            )}
          >
            {cycle.status}
          </Badge>
        </div>

        {isFailed && cycle.ai_explanation && (
          <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100 flex gap-3">
            <Sprout size={16} className="text-red-400 shrink-0" />
            <div className="space-y-1">
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">
                AI Failure Analysis
              </p>
              <p className="text-[11px] text-slate-600 leading-relaxed italic">
                {cycle.ai_explanation}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex gap-6">
            <div className="space-y-0.5">
              <p className="text-[8px] font-black text-slate-400 uppercase">
                Aktivitas
              </p>
              <p className="text-xs font-bold text-slate-700">
                {cycle.activity_count} Log
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[8px] font-black text-slate-400 uppercase">
                Total Hasil
              </p>
              <p className="text-xs font-black text-emerald-600">
                {cycle.total_yield || 0} Kg
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="h-8 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:bg-slate-50"
          >
            Detail
            {expanded ? (
              <ChevronUp size={14} className="ml-1" />
            ) : (
              <ChevronDown size={14} className="ml-1" />
            )}
          </Button>
        </div>
      </div>

      {/* ── Detail Dropdown ── */}
      {expanded && (
        <DetailDropdown
          isLoadingActivities={isLoadingActivities}
          activities={activities}
          stats={stats}
          formatDate={fmtDate}
          getConfig={getConfig}
        />
      )}
    </div>
  );
};
