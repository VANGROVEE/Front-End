"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAiRecommendation } from "@/modules/ai-recomendation/hooks/useAiRecommendation";
import {
  BrainCircuit,
  Lightbulb,
  Loader2,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { DashboardCycle } from "../../types/harvest";

interface CycleFailureContentProps {
  data: DashboardCycle;
  aiResponse: any;
}

export const CycleFailureContent = ({
  data,
  aiResponse,
}: CycleFailureContentProps) => {
  if (data.status !== "FAILED") return null;

  const { useFailureAnalysis } = useAiRecommendation({
    cycle_id: data.id,
    type: "FAILURE_ANALYSIS",
  });

  const { mutate: runAnalysis, isPending: isAnalyzing } = useFailureAnalysis();
  const hasResponse = !!aiResponse?.analisis_kegagalan;

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    runAnalysis(data.id);
  };

  return (
    <div className="w-full transition-all duration-300">
      <Alert className="relative overflow-hidden bg-white border-rose-100 rounded-2xl p-6 shadow-sm border-l-4 border-l-rose-500">
        {/* Background Accent Decor */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <BrainCircuit size={80} className="text-rose-900" />
        </div>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 rounded-xl text-rose-600 ring-1 ring-rose-100">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <AlertTitle className="text-xs font-bold uppercase tracking-wider text-rose-800 m-0">
                AI Failure Investigation
              </AlertTitle>
              <p className="text-[11px] text-slate-400 font-medium">
                Auto-diagnostic system
              </p>
            </div>
          </div>

          {hasResponse && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-[11px] font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700"
              onClick={handleAction}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <Loader2 className="h-3 w-3 animate-spin mr-2" />
              ) : (
                <RefreshCcw className="h-3 w-3 mr-2" />
              )}
              Refresh Analysis
            </Button>
          )}
        </div>

        <AlertDescription className="relative z-10">
          {hasResponse ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Analysis Result */}
              <div className="relative group">
                <div className="absolute -left-1 top-0 bottom-0 w-1 bg-rose-100 rounded-full group-hover:bg-rose-200 transition-colors" />
                <p className="text-sm text-slate-700 leading-relaxed font-medium italic pl-5">
                  &ldquo;{aiResponse.analisis_kegagalan}&rdquo;
                </p>
              </div>

              {/* Mitigation Steps */}
              {aiResponse.rekomendasi_perbaikan_masa_depan && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                      Rencana Mitigasi
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {aiResponse.rekomendasi_perbaikan_masa_depan.map(
                      (item: string, i: number) => (
                        <div
                          key={i}
                          className="group flex items-start gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100 hover:border-rose-100 hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 group-hover:scale-125 transition-transform" />
                          <span className="text-[12px] text-slate-600 leading-snug font-medium">
                            {item}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty State / Initial Action */
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center space-y-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 transition-all">
              <div className="relative">
                <div className="absolute inset-0 bg-rose-200 blur-xl opacity-20 animate-pulse" />
                <div className="relative p-4 bg-white rounded-2xl shadow-sm border border-rose-50 text-rose-500">
                  <BrainCircuit className="h-8 w-8" />
                </div>
              </div>

              <div className="max-w-[280px] space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  Butuh Insight Tambahan?
                </p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Siklus ini gagal. Biarkan AI menganalisis data sensor untuk
                  menemukan penyebab akar masalahnya.
                </p>
              </div>

              <Button
                size="default"
                className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200 px-8 rounded-full h-10 text-xs font-bold transition-all hover:scale-105 active:scale-95"
                onClick={handleAction}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Mulai Investigasi AI
                  </>
                )}
              </Button>
            </div>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};
