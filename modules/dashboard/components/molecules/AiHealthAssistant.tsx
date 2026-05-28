"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Calendar,
  Filter,
  MapPinned,
  Sparkles,
  Tag,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useSpatialAnalysis } from "../../hooks/useSpatial";
import { HealthReport, LandHealthGroup } from "../../types/analyze.type";
import { HealthTaskItem } from "./HealthTaskItem";

export const AiHealthAssistant = () => {
  const { reports: data, isLoading } = useSpatialAnalysis();
  const [selectedLand, setSelectedLand] = useState<string>("all");

  const landGroups = (data as unknown as LandHealthGroup[]) || [];

  const landOptions = useMemo(
    () => landGroups.map((g) => g.land_name),
    [landGroups],
  );

  const filteredAndGroupedData = useMemo(() => {
    const baseData =
      selectedLand === "all"
        ? landGroups
        : landGroups.filter((g) => g.land_name === selectedLand);

    return baseData.map((land) => {
      const diseaseGroups = land.reports.reduce(
        (acc: Record<string, HealthReport[]>, report) => {
          const diseaseName =
            report.gemini_insight?.disease_description?.split(".")[0] ||
            "Unknown Analysis";
          if (!acc[diseaseName]) acc[diseaseName] = [];
          acc[diseaseName].push(report);
          return acc;
        },
        {},
      );

      return {
        ...land,
        diseaseGroups,
      };
    });
  }, [selectedLand, landGroups]);

  if (isLoading) {
    return (
      <Card className="bg-white/40 backdrop-blur-2xl p-8 rounded-[40px] border border-white/60 h-full min-h-[580px] flex flex-col space-y-6">
        <div className="shrink-0 space-y-2">
          <Skeleton className="h-8 w-40 rounded-lg" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="flex-1 space-y-8 pt-4">
          <Skeleton className="h-24 w-full rounded-3xl" />
          <Skeleton className="h-24 w-full rounded-3xl" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/40 backdrop-blur-2xl p-8 rounded-[40px] shadow-2xl flex flex-col h-full  border border-white/60 relative overflow-hidden transition-all duration-500">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 shrink-0 space-y-6 mb-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2">
              <Sparkles
                size={14}
                className="animate-pulse fill-emerald-500/20"
              />
              AI Diagnostics
            </h3>
            <p className="text-xl font-black text-slate-800 tracking-tighter uppercase italic">
              Health{" "}
              <span className="text-emerald-500 not-italic">Monitor</span>
            </p>
          </div>
        </div>

        <Select value={selectedLand} onValueChange={setSelectedLand}>
          <SelectTrigger className="w-full bg-white/50 border-white/60 rounded-xl text-[10px] font-bold uppercase h-10 shadow-sm transition-all hover:bg-white/80">
            <div className="flex items-center gap-2">
              <Filter size={12} className="text-emerald-600" />
              <SelectValue placeholder="Lokasi Lahan" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-xl border-white/60 bg-white/90 backdrop-blur-xl">
            <SelectItem
              value="all"
              className="text-[10px] font-bold uppercase cursor-pointer"
            >
              Semua Lahan
            </SelectItem>
            {landOptions.map((name) => (
              <SelectItem
                key={name}
                value={name}
                className="text-[10px] font-bold uppercase cursor-pointer"
              >
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-h-0 relative z-10 w-full ">
        <ScrollArea className="h-[650px] w-full">
          <div className="space-y-12 pb-6 pr-4">
            {filteredAndGroupedData.map((land) => (
              <div key={land.land_name} className="space-y-8">
                <div className="flex items-center gap-2 sticky top-0 bg-white/80 backdrop-blur-sm py-2 z-20 transition-all">
                  <div className="bg-slate-900 p-1.5 rounded-lg text-white shrink-0 shadow-md">
                    <MapPinned size={12} />
                  </div>
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest truncate">
                    {land.land_name}
                  </span>
                  <Separator className="flex-1 bg-slate-200" />
                </div>

                <div className="space-y-8 pl-2">
                  {Object.entries(land.diseaseGroups).map(
                    ([diseaseName, reports]) => (
                      <div key={diseaseName} className="space-y-4">
                        <div className="flex items-center gap-2 opacity-70">
                          <Tag size={10} className="text-emerald-600" />
                          <h5 className="text-[9px] font-black text-slate-500 uppercase tracking-tighter italic">
                            {diseaseName}
                          </h5>
                        </div>

                        <div className="space-y-3 pl-2 border-l-2 border-slate-100/50">
                          {reports.map((report) => (
                            <div key={report.id} className="space-y-2">
                              <div className="relative group">
                                {report.is_outbreak_trigger && (
                                  <div className="absolute -left-[11px] top-1/2 -translate-y-1/2 w-1 h-10 bg-red-500 rounded-full  shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                                )}
                                <HealthTaskItem
                                  title={
                                    report.cycle?.commodity_name || "Vegetation"
                                  }
                                  desc={
                                    report.gemini_insight?.treatment?.[0] ||
                                    "Lakukan observasi."
                                  }
                                  confidence={report.confidence_score}
                                />
                              </div>
                              <p className="text-[8px] font-bold text-slate-400 uppercase ml-14 flex items-center gap-1 transition-all group-hover:text-slate-600">
                                <Calendar size={10} />
                                {new Date(report.created_at).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-100 relative z-10 shrink-0">
        <div className="p-4 bg-emerald-50/50 rounded-[2rem] border border-emerald-100 flex items-center gap-3 transition-colors hover:bg-emerald-50">
          <AlertCircle size={16} className="text-emerald-600 shrink-0" />
          <p className="text-[9px] font-bold text-emerald-800 uppercase tracking-tighter leading-tight">
            AI memantau {landGroups.length} sektor penanaman aktif secara
            real-time.
          </p>
        </div>
      </div>
    </Card>
  );
};
