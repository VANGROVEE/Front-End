"use client";

import React from "react";
import {
  Droplets,
  Calendar,
  ThermometerSun,
  Wind,
  Plus,
  Sprout,
  Zap,
  Beaker,
  Search,
  CheckCircle2,
  MoreHorizontal,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const getActivityIcon = (type: string) => {
  const iconProps = { size: 16 };
  switch (type) {
    case "PLANTING":
      return <Sprout {...iconProps} />;
    case "WATERING":
      return <Droplets {...iconProps} />;
    case "FERTILIZING":
      return <Beaker {...iconProps} />;
    case "PEST_CONTROL":
      return <Zap {...iconProps} />;
    case "OBSERVATION":
      return <Search {...iconProps} />;
    case "HARVESTING":
      return <CheckCircle2 {...iconProps} />;
    default:
      return <MoreHorizontal {...iconProps} />;
  }
};

const translateActivityType = (type: string) => {
  switch (type) {
    case "PLANTING":
      return "Penanaman";
    case "WATERING":
      return "Penyiraman";
    case "FERTILIZING":
      return "Pemupukan";
    case "PEST_CONTROL":
      return "Pengendalian Hama";
    case "OBSERVATION":
      return "Observasi Lahan";
    case "HARVESTING":
      return "Pemanenan";
    default:
      return type.replace("_", " ");
  }
};

const renderCycleStatusBadge = (status: string) => {
  const baseClass =
    "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border-none shadow-none";
  switch (status) {
    case "COMPLETED":
      return (
        <Badge className={cn(baseClass, "bg-slate-100 text-slate-600")}>
          Selesai
        </Badge>
      );
    case "HARVESTED":
      return (
        <Badge
          className={cn(
            baseClass,
            "bg-emerald-50 text-emerald-700 border border-emerald-100",
          )}
        >
          Masa Panen
        </Badge>
      );
    case "FAILED":
      return (
        <Badge
          className={cn(
            baseClass,
            "bg-slate-100 text-slate-500 border border-slate-200",
          )}
        >
          Gagal Panen
        </Badge>
      );
    default:
      return (
        <Badge
          className={cn(
            baseClass,
            "bg-blue-50 text-blue-700 border border-blue-100",
          )}
        >
          Tanaman
        </Badge>
      );
  }
};

interface ActivityTimelineProps {
  activities: any[];
  cycleStatus?: string;
  onAddActivity: () => void;
}

export const ActivityTimeline = ({
  activities = [],
  cycleStatus = "PLANTING",
  onAddActivity,
}: ActivityTimelineProps) => {
  const isLocked = cycleStatus === "FAILED" || cycleStatus === "COMPLETED";

  return (
    <Card className="rounded-[32px] border-none bg-white shadow-sm flex-1 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between px-8 pt-8 pb-6">
        <div className="space-y-1">
          <CardTitle className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            Daily Activities{" "}
            {isLocked && <Lock size={12} className="text-slate-300" />}
          </CardTitle>
          <p className="text-[10px] font-bold text-slate-300">
            Log pemantauan harian lahan Anda
          </p>
        </div>

        {isLocked ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-not-allowed">
                <Button
                  disabled
                  variant="secondary"
                  size="sm"
                  className="h-9 rounded-2xl bg-slate-50 text-slate-400 font-black text-[11px] px-5 opacity-60"
                >
                  <Lock size={14} className="mr-1.5" /> Catat Aktivitas
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 text-white text-[10px] font-bold rounded-lg border-none shadow-xl">
              Siklus telah berakhir. Data riwayat dikunci untuk evaluasi.
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            onClick={onAddActivity}
            variant="secondary"
            size="sm"
            className="h-9 rounded-2xl bg-green-50 text-green-700 hover:bg-green-100 font-black text-[11px] px-5 transition-all active:scale-95 shadow-none"
          >
            <Plus size={14} className="mr-1.5 stroke-[3]" /> Catat Aktivitas
          </Button>
        )}
      </CardHeader>

      <CardContent className="px-8 pb-10">
        <ScrollArea className="flex-1 w-full h-[460px] pr-3">
          {activities.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-50 rounded-[24px]">
              <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center">
                <Calendar size={32} className="opacity-20" />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-slate-400">
                  Belum Ada Catatan
                </p>
                <p className="text-[11px] font-medium text-slate-300">
                  Aktivitas akan muncul di sini setelah dicatat
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-100 before:to-transparent">
              {activities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-2xl border-4 border-white bg-green-50 text-green-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    {getActivityIcon(activity.activity_type)}
                  </div>

                  <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm group-hover:border-green-200 group-hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Badge className="border-0 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-green-100 text-green-700 hover:bg-green-100 shadow-none">
                          {translateActivityType(activity.activity_type)}
                        </Badge>

                        {activity.cycle && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-bold text-slate-700">
                              {activity.cycle.commodity?.name}
                            </span>
                            {renderCycleStatusBadge(activity.cycle.status)}
                          </div>
                        )}
                      </div>

                      <time className="text-[10px] font-black text-slate-300 bg-slate-50 px-2 py-0.5 rounded-lg uppercase tracking-widest">
                        {new Date(activity.activity_date).toLocaleTimeString(
                          "id-ID",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </time>
                    </div>

                    <p className="text-sm font-semibold text-slate-600 mb-4 leading-relaxed">
                      {activity.notes || "Tidak ada catatan tambahan."}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                      {activity.amount && (
                        <Badge
                          variant="outline"
                          className="text-[10px] font-black text-slate-500 border-slate-100 bg-slate-50/50 rounded-lg"
                        >
                          VOLUME: {activity.amount} {activity.unit || ""}
                        </Badge>
                      )}
                      {activity.weather_data && (
                        <div className="flex gap-1.5 ml-auto">
                          <Badge
                            variant="outline"
                            className="text-[10px] font-bold text-orange-500 bg-orange-50/50 border-orange-100 rounded-lg gap-1"
                          >
                            <ThermometerSun size={10} strokeWidth={3} />
                            {activity.weather_data.temperature}°C
                          </Badge>
                          <Badge
                            variant="outline"
                            className="text-[10px] font-bold text-blue-500 bg-blue-50/50 border-blue-100 rounded-lg gap-1"
                          >
                            <Wind size={10} strokeWidth={3} />
                            {activity.weather_data.wind_speed} km/h
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
