"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { useAiRecommendation } from "@/modules/ai-recomendation/hooks/useAiRecommendation";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { DashboardCycle } from "../../types/harvest";
import { DetailDropdown } from "./DetailDropdown";

interface CycleListItemProps {
  cycle: DashboardCycle;
  formatDate: (date: string) => string;
}

export const CycleListItem = ({
  cycle,
  formatDate: fmtDate,
}: CycleListItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { id } = cycle as { id: string };

  const { useFailureAnalysis } = useAiRecommendation({
    cycle_id: id,
    type: "FAILURE_ANALYSIS",
  });

  const { mutate: runAnalysis, isPending: isAnalyzing } = useFailureAnalysis();

  const isFailed = cycle.status === "FAILED";
  const isCompleted = ["COMPLETED"].includes(cycle.status);

  const handleRunAnalysis = (e: React.MouseEvent) => {
    e.stopPropagation();
    runAnalysis(cycle.id);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn(
        "rounded-[28px] border transition-all duration-500 overflow-hidden bg-white",
        isOpen
          ? "border-slate-200 shadow-md translate-y-[-2px]"
          : "border-slate-100 hover:border-slate-200 shadow-sm",
      )}
    >
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div
              className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500",
                isFailed
                  ? "bg-rose-50 text-rose-500"
                  : isCompleted
                    ? "bg-emerald-50 text-emerald-500"
                    : "bg-blue-50 text-blue-500",
                isOpen && "scale-110 rotate-3",
              )}
            >
              {isFailed ? (
                <AlertCircle size={22} />
              ) : (
                <CheckCircle2 size={22} />
              )}
            </div>

            <div>
              <h3 className="font-black text-slate-800 uppercase text-sm tracking-tight leading-tight">
                {cycle.commodity?.name || "Komoditas Tanpa Nama"}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                {cycle.variety || "Varietas Standar"}
              </p>

              <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100/50">
                  {fmtDate(cycle.start_date)}
                </span>
                <span className="text-slate-300">→</span>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-md border",
                    cycle.end_date
                      ? "bg-slate-50 border-slate-100/50"
                      : "bg-blue-50 border-blue-100 text-blue-600",
                  )}
                >
                  {cycle.end_date ? fmtDate(cycle.end_date) : "Aktif"}
                </span>
              </div>
            </div>
          </div>

          <Badge
            variant="outline"
            className={cn(
              "text-[9px] font-black uppercase border-none px-2.5 py-1 rounded-full",
              isFailed
                ? "bg-rose-100 text-rose-600"
                : "bg-emerald-100 text-emerald-600",
            )}
          >
            {cycle.status}
          </Badge>
        </div>

        {isFailed && (
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={12} className="text-rose-500" />
                Investigasi Kegagalan AI
              </p>
              <Button
                size="xs"
                variant="outline"
                className="h-7 text-[9px] font-bold uppercase border-rose-200 text-rose-600 hover:bg-rose-100"
                onClick={handleRunAnalysis}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <Loader2 size={10} className="animate-spin mr-1" />
                ) : null}
                {cycle.ai_explanation ? "Perbarui Analisis" : "Mulai Analisis"}
              </Button>
            </div>

            {cycle.ai_explanation ? (
              <p className="text-[11px] text-slate-600 italic leading-relaxed">
                &ldquo;{cycle.ai_explanation}&rdquo;
              </p>
            ) : (
              <p className="text-[10px] text-slate-400 italic">
                Siklus gagal. Klik tombol di atas untuk menjalankan investigasi
                dari AI.
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex gap-6">
            <div className="space-y-0.5">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                Log Aktivitas
              </p>
              <p className="text-xs font-bold text-slate-700">
                {cycle.activity_count || 0} Kali
              </p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                Hasil Panen
              </p>
              <p className="text-xs font-black text-emerald-600">
                {cycle.total_yield || 0} Kg
              </p>
            </div>
          </div>

          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-9 rounded-xl text-[10px] font-black uppercase transition-all gap-2",
                isOpen
                  ? "bg-slate-100 text-slate-800"
                  : "text-slate-400 hover:bg-slate-50",
              )}
            >
              {isOpen ? "Tutup" : "Detail Laporan"}
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform duration-500",
                  isOpen && "rotate-180",
                )}
              />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <DetailDropdown
          cycleId={cycle.id}
          isFailed={isFailed}
          cycleData={cycle}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};
