"use client";

import React, { useMemo } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { CardContent } from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import {
  ActivitySquare,
  Loader2,
  Info,
  Droplets,
  Sprout,
  Tractor,
  Bug,
  Wheat,
} from "lucide-react";
import { useCycles } from "../../hooks/cycle-hooks";
import { HeatmapData, PlantingCycle } from "../../types/cycle";
import { cn } from "@/lib/utils";

export const ActivityHeatmapCard = ({ cycle }: { cycle: PlantingCycle }) => {
  const { heatmapCalendar: heatmapData, isLoadingHeatmap } = useCycles(
    cycle?.id,
  );

  const getColorForActivity = (type: string, level: number) => {
    if (level === 0) return "#f1f5f9";
    switch (type) {
      case "WATERING":
        return "#3b82f6";
      case "PLANTING":
        return "#22c55e";
      case "FERTILIZING":
        return "#f59e0b";
      case "PEST_CONTROL":
        return "#ef4444";
      case "HARVESTING":
        return "#8b5cf6";
      case "MAINTENANCE":
        return "#6366f1";
      default:
        return "#94a3b8";
    }
  };

  const formattedData = useMemo(() => {
    let rawData: HeatmapData[] = heatmapData || [];

    if (rawData.length === 0 && cycle?.daily_activities?.length > 0) {
      const activityMap: Record<string, { count: number; types: any }> = {};

      cycle.daily_activities.forEach((act: any) => {
        const date = new Date(act.activity_date).toISOString().split("T")[0];
        if (!activityMap[date]) {
          activityMap[date] = { count: 0, types: {} };
        }
        activityMap[date].count += 1;
        activityMap[date].types[act.activity_type] =
          (activityMap[date].types[act.activity_type] || 0) + 1;
      });

      rawData = Object.entries(activityMap).map(([date, val]) => ({
        date,
        count: val.count,
        dominant_type: Object.keys(val.types)[0],
        details: val.types,
      }));
    }

    if (rawData.length === 0) {
      const today = new Date().toISOString().split("T")[0];
      return [{ date: today, count: 0, level: 0 as const }];
    }

    const getLevel = (count: number) => {
      if (count === 0) return 0;
      if (count === 1) return 1;
      if (count <= 3) return 2;
      if (count <= 5) return 3;
      return 4;
    };

    return rawData.map((item) => ({
      date: item.date,
      count: item.count,
      level: getLevel(item.count) as 0 | 1 | 2 | 3 | 4,
      metadata: { dominant_type: item.dominant_type },
    }));
  }, [heatmapData, cycle]);

  return (
    <>
      <CardContent className=" relative flex flex-col h-full">
        {/* HEADER */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-md font-black text-slate-800 tracking-tight flex items-center gap-2">
              <ActivitySquare className="text-green-500" size={12} />
              Heatmap Aktivitas Lahan
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto pb-4 custom-scrollbar">
          {isLoadingHeatmap ? (
            <div className="flex h-[180px] w-full flex-col items-center justify-center text-slate-400">
              <Loader2 size={32} className="mb-4 animate-spin text-green-500" />
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Sinkronisasi Data Heatmap...
              </p>
            </div>
          ) : (
            <div className="min-w-[750px] bg-slate-50/50 p-6 rounded-[24px] border border-slate-100/60 shadow-inner">
              <ActivityCalendar
                data={formattedData}
                blockSize={11}
                blockRadius={4}
                blockMargin={5}
                fontSize={12}
                renderBlock={(block, activity) => {
                  const type =
                    (activity as any).metadata?.dominant_type || "OTHER";
                  const customColor = getColorForActivity(type, activity.level);

                  return React.cloneElement(block as React.ReactElement, {
                    style: { fill: customColor },
                    className:
                      "hover:scale-125 hover:z-10 transition-transform duration-200 cursor-help drop-shadow-sm",
                  });
                }}
                labels={{
                  months: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "Mei",
                    "Jun",
                    "Jul",
                    "Ags",
                    "Sep",
                    "Okt",
                    "Nov",
                    "Des",
                  ],
                  weekdays: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
                  totalCount: `{{count}} aktivitas tercatat pada siklus ini`,
                }}
                showWeekdayLabels
                theme={{
                  light: ["#f1f5f9", "#22c55e"],
                }}
              />
            </div>
          )}
        </div>

        {/* LEGEND / KETERANGAN */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <span className="text-slate-300">Keterangan:</span>

          <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-default">
            <div className="w-3 h-3 rounded-[4px] bg-blue-500 shadow-sm shadow-blue-500/20" />
            <Droplets size={12} className="text-blue-500" /> Siram
          </div>

          <div className="flex items-center gap-1.5 hover:text-green-600 transition-colors cursor-default">
            <div className="w-3 h-3 rounded-[4px] bg-green-500 shadow-sm shadow-green-500/20" />
            <Sprout size={12} className="text-green-500" /> Tanam
          </div>

          <div className="flex items-center gap-1.5 hover:text-amber-600 transition-colors cursor-default">
            <div className="w-3 h-3 rounded-[4px] bg-amber-500 shadow-sm shadow-amber-500/20" />
            <Tractor size={12} className="text-amber-500" /> Pupuk
          </div>

          <div className="flex items-center gap-1.5 hover:text-red-600 transition-colors cursor-default">
            <div className="w-3 h-3 rounded-[4px] bg-red-500 shadow-sm shadow-red-500/20" />
            <Bug size={12} className="text-red-500" /> Hama
          </div>

          <div className="flex items-center gap-1.5 hover:text-violet-600 transition-colors cursor-default">
            <div className="w-3 h-3 rounded-[4px] bg-violet-500 shadow-sm shadow-violet-500/20" />
            <Wheat size={12} className="text-violet-500" /> Panen
          </div>
        </div>
      </CardContent>
    </>
  );
};
