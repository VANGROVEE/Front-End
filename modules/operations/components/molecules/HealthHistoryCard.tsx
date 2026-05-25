"use client";

import React, { useState } from "react";
import {
  Activity,
  PlusCircle,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  Flame,
  Calendar,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { useHealth } from "../../hooks/health-hooks";
import { AIAnalysisResultCard } from "./AIAnalysisResultCard";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export interface HealthReport {
  id: string;
  created_at: string | Date;
  image_url: string;
  disease_id?: string | null;
  confidence_score: number;
  gemini_insight?:
    | {
        disease_description?: string;
        causes?: string;
        treatment?: string[];
        prevention?: string[];
        recovery?: string;
        farmer_notes?: string | null;
      }
    | any;
  is_outbreak_trigger: boolean;
  disease?: {
    name: string;
    scientific_name?: string;
    description?: string;
    local_treatment?: string;
    preventive_action?: string;
  } | null;
}

interface HealthHistoryCardProps {
  cycleId: string;
  isAiSupported?: boolean;
  onAddReport: () => void;
}

export const HealthHistoryCard: React.FC<HealthHistoryCardProps> = ({
  cycleId,
  isAiSupported = true,
  onAddReport,
}) => {
  const { healthReports, isLoadingReports } = useHealth(cycleId);

  const [activeDetailedReport, setActiveDetailedReport] =
    useState<HealthReport | null>(null);

  const reports: HealthReport[] = healthReports || [];

  const formatTime = (dateString: string | Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  const formatGroupDate = (dateString: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateString));
  };

  const chronologicalReports = [...reports].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  const groupedReports = chronologicalReports.reduce(
    (groups, report) => {
      const dateKey = new Date(report.created_at).toISOString().split("T")[0];
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(report);
      return groups;
    },
    {} as Record<string, HealthReport[]>,
  );

  return (
    <>
      <SpotlightCard
        className="rounded-[32px] border border-slate-100 bg-white shadow-sm h-full flex flex-col overflow-hidden"
        spotlightColor="rgba(34, 197, 94, 0.08)"
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400/10 blur-3xl rounded-full pointer-events-none" />

        <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-50 relative z-10 space-y-0 p-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shadow-inner">
              <Activity size={20} />
            </div>
            <div className="space-y-0.5">
              <CardTitle className="text-base font-bold text-slate-800">
                Journey Kesehatan AI
              </CardTitle>
              <CardDescription className="text-xs text-slate-400 font-medium">
                Kronologi rekam medis tanaman Anda
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-4 flex-1  flex-col min-h-0 relative z-10 w-full overflow-hidden">
          <ScrollArea className="flex-1 w-full h-[460px] pr-3">
            {isLoadingReports ? (
              <div className="flex flex-col items-center justify-center text-center py-20 gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                <Loader2 className="h-7 w-7 animate-spin text-emerald-600 mb-1" />
                Sinkronisasi Rekam Medis...
              </div>
            ) : reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                <ImageIcon
                  className="text-slate-300 mb-3 animate-bounce"
                  size={36}
                />
                <p className="text-sm font-black text-slate-700">
                  Belum Ada Rekam Medis
                </p>
                <p className="text-xs text-slate-400 mt-1 max-w-[220px] leading-relaxed">
                  Mulai periksa kesehatan daun untuk memetakan grafik
                  perkembangan tanaman Anda disini.
                </p>
              </div>
            ) : (
              Object.entries(groupedReports).map(([dateKey, dayReports]) => (
                <div key={dateKey} className="space-y-4 relative mb-6">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-2 text-slate-400 font-black uppercase tracking-wider text-[10px] bg-slate-50 w-fit px-3 py-1.5 rounded-full border border-slate-100/80 sticky top-0 z-10 shadow-sm mix-blend-multiply"
                  >
                    <Calendar size={12} className="text-slate-500" />
                    {formatGroupDate(dateKey)}
                  </Badge>

                  <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-slate-100 pointer-events-none z-0" />

                  <div className="space-y-4 pl-1">
                    {dayReports.map((report) => {
                      const rawDesc =
                        report.gemini_insight?.disease_description || "";
                      const hasDisease =
                        rawDesc.includes("Blight") ||
                        rawDesc.includes("Mildew") ||
                        !!report.disease_id;
                      const isHealthy =
                        !hasDisease && !report.is_outbreak_trigger;

                      let titleDisplay = "Tanaman Sehat / Normal";
                      if (!isHealthy) {
                        if (rawDesc.includes("Early Blight"))
                          titleDisplay = "Tomato Early Blight";
                        else if (rawDesc.includes("Powdery Mildew"))
                          titleDisplay = "Tomato Powdery Mildew";
                        else
                          titleDisplay =
                            report.disease?.name ||
                            "Terdeteksi Masalah Patogen";
                      }

                      const summaryText =
                        report.gemini_insight?.disease_description ||
                        "Sampel citra daun berada dalam kondisi bersih dan sehat.";

                      return (
                        <div
                          key={report.id}
                          onClick={() => setActiveDetailedReport(report)}
                          className="flex items-start gap-4 relative z-10 group/item cursor-pointer"
                        >
                          <div
                            className={`w-2.5 h-2.5 rounded-full shrink-0 mt-3 ml-2.5 border-2 border-white ring-4 transition-all duration-300 group-hover/item:scale-125 ${
                              isHealthy
                                ? "bg-emerald-500 ring-emerald-100"
                                : report.is_outbreak_trigger
                                  ? "bg-red-600 ring-red-100 animate-pulse"
                                  : "bg-amber-500 ring-amber-100"
                            }`}
                          />

                          <div className="flex-1 flex gap-4 p-4 rounded-[24px] border border-slate-100 bg-white hover:border-slate-300 hover:shadow-md hover:shadow-slate-100/40 transition-all duration-300">
                            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-slate-100 shadow-inner">
                              <img
                                src={report.image_url}
                                alt="Foto tanaman"
                                className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover/item:scale-105"
                              />
                              <Badge className="absolute bottom-1 right-1 bg-black/70 backdrop-blur-sm text-white text-[9px] px-1.5 py-0.5 rounded-md font-mono font-bold hover:bg-black/70 border-none">
                                {Math.round(report.confidence_score * 100)}%
                              </Badge>
                            </div>

                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex flex-wrap justify-between items-start gap-2 mb-1.5">
                                {isHealthy ? (
                                  <Badge className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-none hover:bg-emerald-50">
                                    <CheckCircle2 size={10} /> Sehat
                                  </Badge>
                                ) : (
                                  <Badge
                                    className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-none ${
                                      report.is_outbreak_trigger
                                        ? "bg-red-50 text-red-700 border border-red-100 hover:bg-red-50"
                                        : "bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-50"
                                    }`}
                                  >
                                    <AlertTriangle size={10} /> {titleDisplay}
                                  </Badge>
                                )}

                                <span className="text-[10px] text-slate-400 font-black font-mono mt-0.5">
                                  {formatTime(report.created_at)} WIB
                                </span>
                              </div>

                              <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 pr-1">
                                {summaryText}
                              </p>

                              {report.is_outbreak_trigger && (
                                <Badge className="text-[9px] font-black bg-orange-500/10 text-orange-700 border border-orange-500/20 px-2 py-0.5 rounded-md mt-2 w-fit inline-flex items-center gap-1 uppercase tracking-tight animate-pulse shadow-none hover:bg-orange-500/10">
                                  <Flame
                                    size={10}
                                    className="fill-orange-700"
                                  />{" "}
                                  Karantina / Risiko Menular
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </CardContent>
      </SpotlightCard>

      {/* DIALOG POPUP UNTUK DETAIL DIAGNOSIS */}
      <Dialog
        open={!!activeDetailedReport}
        onOpenChange={(isOpen) => !isOpen && setActiveDetailedReport(null)}
      >
        <DialogContent className="max-w-3xl p-6 max-h-[90vh] overflow-y-auto rounded-[32px] custom-scrollbar ">
          {activeDetailedReport && (
            <AIAnalysisResultCard
              data={activeDetailedReport}
              onClose={() => setActiveDetailedReport(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
