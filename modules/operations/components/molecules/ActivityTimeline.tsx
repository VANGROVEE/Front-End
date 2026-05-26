"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Beaker,
  CheckCircle2,
  Droplets,
  Lock,
  MoreHorizontal, // Tidak terpakai
  Plus,
  Search,
  Sprout,
  Zap,
} from "lucide-react";
import React from "react";

import { EmptyState } from "@/modules/report/components/molecules/EmptyState";
import { useDaily } from "../../hooks/daily-hooks";

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
  cycleId: string;
  cycleStatus?: string;
  onAddActivity: () => void;
}

export const ActivityTimeline = ({
  cycleId,
  cycleStatus = "PLANTING",
  onAddActivity,
}: ActivityTimelineProps) => {
  const isLocked = cycleStatus === "FAILED" || cycleStatus === "COMPLETED";
  const { activities, isLoadingActivities } = useDaily({ cycle_id: cycleId });

  if (isLoadingActivities) {
    return (
      <div className="p-8 text-center animate-pulse text-slate-400 font-bold">
        Memuat Timeline...
      </div>
    );
  }

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
        {!isLocked && (
          <Button onClick={onAddActivity} variant="secondary" size="sm">
            <Plus size={14} className="mr-1.5 stroke-[3]" /> Catat Aktivitas
          </Button>
        )}
      </CardHeader>

      <CardContent className="px-8 pb-10">
        {!activities || activities.length === 0 ? (
          <div className="py-12 flex justify-center">
            <EmptyState message="Belum ada aktivitas harian yang dicatat." />
          </div>
        ) : (
          <ScrollArea className="flex-1 w-full h-[500px] pr-3">
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-100 before:to-transparent">
              {activities.map((activity, index) => {
                const currentDate = new Date(
                  activity.activity_date,
                ).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                // Cek apakah tanggal berbeda dengan aktivitas sebelumnya untuk memunculkan label tanggal
                const showDateLabel =
                  index === 0 ||
                  new Date(
                    activities[index - 1].activity_date,
                  ).toDateString() !==
                    new Date(activity.activity_date).toDateString();

                return (
                  <React.Fragment key={activity.id}>
                    {showDateLabel && (
                      <div className="relative flex justify-center mb-8 mt-4">
                        <span className="relative z-10 bg-slate-50 px-4 py-1.5 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 shadow-sm">
                          {currentDate}
                        </span>
                      </div>
                    )}

                    <div
                      className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-in fade-in slide-in-from-bottom-2 duration-500"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-2xl border-4 border-white bg-green-50 text-green-600 shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                        {getActivityIcon(activity.activity_type)}
                      </div>

                      <div className="w-[calc(100%-3.5rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm group-hover:border-green-200 group-hover:shadow-md transition-all duration-300">
                        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <Badge className="border-0 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-green-100 text-green-700">
                              {translateActivityType(activity.activity_type)}
                            </Badge>
                            <span className="text-[10px] font-bold text-slate-400">
                              {new Date(
                                activity.activity_date,
                              ).toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {activity.cycle?.status &&
                            renderCycleStatusBadge(activity.cycle.status)}
                        </div>

                        <p className="text-sm font-semibold text-slate-600 mb-4 leading-relaxed">
                          {activity.notes || "Penyiraman rutin dilakukan."}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                          {activity.amount && (
                            <Badge
                              variant="outline"
                              className="text-[9px] font-black text-slate-500 bg-slate-50/50"
                            >
                              VOL: {activity.amount} {activity.unit || "L"}
                            </Badge>
                          )}
                          <span className="text-[9px] font-bold text-slate-300 ml-auto flex items-center gap-1">
                            ID: {activity.id.split("-")[0].toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
