"use client";

import React, { useMemo } from "react";
import { ActivityCalendar, type ThemeInput } from "react-activity-calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ActivitySquare,
  Loader2,
  Droplets,
  Sprout,
  Tractor,
  Bug,
  Wheat,
  LayoutGrid,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { useCycles } from "../../hooks/cycle-hooks";
import { HeatmapData, PlantingCycle } from "../../types/cycle";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { startOfDay, isBefore, format, eachDayOfInterval } from "date-fns";

export const ActivityHeatmapCard = ({ cycle }: { cycle: PlantingCycle }) => {
  const { heatmapCalendar: heatmapData, isLoading: isLoadingHeatmap } =
    useCycles(cycle?.id);

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
    const start = startOfDay(new Date(cycle.start_date));
    const end = startOfDay(new Date());

    const allDays = eachDayOfInterval({ start, end });
    const emptyMap: Record<string, any> = {};
    allDays.forEach((day) => {
      emptyMap[format(day, "yyyy-MM-dd")] = {
        count: 0,
        level: 0,
        metadata: { dominant_type: "NONE" },
      };
    });

    const rawActivities = heatmapData || [];
    rawActivities.forEach((item) => {
      const level =
        item.count === 0 ? 0 : item.count === 1 ? 1 : item.count <= 3 ? 2 : 4;
      emptyMap[item.date] = {
        date: item.date,
        count: item.count,
        level: level,
        metadata: { dominant_type: item.dominant_type },
      };
    });

    return Object.entries(emptyMap)
      .map(([date, val]) => ({
        date,
        ...val,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [heatmapData, cycle]);

  return (
    <TooltipProvider delayDuration={0}>
      <Card className="rounded-[32px] border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-xl">
              <ActivitySquare size={20} />
            </div>
            <div>
              <CardTitle className="text-base font-black uppercase tracking-tight">
                Timeline Aktivitas
              </CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase text-slate-400">
                Riwayat perawatan dari awal tanam hingga kini
              </CardDescription>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">
            Awal Siklus <ChevronRight size={10} /> Progress Hari Ini
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-4">
          {isLoadingHeatmap ? (
            <div className="flex h-[160px] w-full flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[24px] bg-slate-50/50">
              <Loader2 size={24} className="mb-2 animate-spin text-green-500" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Menyinkronkan Kalender...
              </p>
            </div>
          ) : (
            <ScrollArea className="w-full whitespace-nowrap rounded-[24px] border border-slate-100 bg-slate-50/30 p-6">
              <div className="min-w-fit">
                <ActivityCalendar
                  data={formattedData}
                  blockSize={13}
                  blockRadius={4}
                  blockMargin={5}
                  fontSize={12}
                  theme={{ light: ["#f1f5f9", "#22c55e"] }}
                  showWeekdayLabels
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
                  }}
                  renderBlock={(block, activity) => {
                    const metadata = (activity as any)?.metadata;
                    const dominantType = metadata?.dominant_type || "NONE";

                    const customColor = getColorForActivity(
                      dominantType,
                      activity?.level || 0,
                    );

                    return (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {React.cloneElement(
                            block as React.ReactElement<
                              React.SVGProps<SVGRectElement>
                            >,
                            {
                              style: {
                                fill: customColor,
                              },
                              className:
                                "hover:scale-110 transition-all duration-200 cursor-pointer",
                            },
                          )}
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          className="p-3 bg-slate-900 border-slate-800 text-white rounded-xl shadow-2xl z-50"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 border-b border-slate-700 pb-1 mb-1">
                              <CalendarDays
                                size={12}
                                className="text-emerald-400"
                              />
                              <span className="text-[10px] font-black uppercase tracking-wider">
                                {/* Tambahkan pengecekan date agar tidak error invalid date */}
                                {activity?.date
                                  ? new Date(activity.date).toLocaleDateString(
                                      "id-ID",
                                      {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      },
                                    )
                                  : "Tanpa Tanggal"}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                              <span className="text-[10px] font-medium text-slate-400">
                                Total:
                              </span>
                              <span className="text-xs font-black text-emerald-400">
                                {activity?.count || 0} Aktivitas
                              </span>
                            </div>

                            {/* Pastikan metadata dan dominant_type ada sebelum dirender */}
                            {dominantType !== "NONE" && (
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-[10px] font-medium text-slate-400">
                                  Dominan:
                                </span>
                                <Badge className="text-[8px] h-4 bg-slate-800 border-slate-700 uppercase font-black text-white">
                                  {dominantType}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }}
                />
              </div>
              <ScrollBar orientation="horizontal" className="mt-2" />
            </ScrollArea>
          )}

          {/* LEGEND / KETERANGAN */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge
              variant="outline"
              className="text-[9px] font-black uppercase border-none text-slate-400 p-0 mr-2 tracking-widest"
            >
              Kategori Dominan:
            </Badge>
            <LegendItem
              color="bg-blue-500"
              icon={<Droplets size={10} />}
              label="Siram"
            />
            <LegendItem
              color="bg-green-500"
              icon={<Sprout size={10} />}
              label="Tanam"
            />
            <LegendItem
              color="bg-amber-500"
              icon={<Tractor size={10} />}
              label="Pupuk"
            />
            <LegendItem
              color="bg-red-500"
              icon={<Bug size={10} />}
              label="Hama"
            />
            <LegendItem
              color="bg-violet-500"
              icon={<Wheat size={10} />}
              label="Panen"
            />
            <LegendItem
              color="bg-indigo-500"
              icon={<LayoutGrid size={10} />}
              label="Lainnya"
            />
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

const LegendItem = ({
  color,
  icon,
  label,
}: {
  color: string;
  icon: React.ReactNode;
  label: string;
}) => (
  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors group cursor-default">
    <div className={cn("w-2.5 h-2.5 rounded-[3px] shadow-sm", color)} />
    <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors flex items-center gap-1">
      {label}
    </span>
  </div>
);
