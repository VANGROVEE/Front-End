import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, ChevronRight, Sprout } from "lucide-react";

export const CycleListItem = ({ cycle, formatDate }: any) => {
  const isFailed = cycle.status === "FAILED";
  const isCompleted =
    cycle.status === "COMPLETED" || cycle.status === "HARVESTED";

  return (
    <div className="p-5 rounded-[28px] border border-slate-100 bg-white space-y-4 hover:border-slate-200 transition-all">
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
            {isFailed ? <AlertCircle size={24} /> : <CheckCircle2 size={24} />}
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
                {formatDate(cycle.start_date)}
              </span>
              <span>—</span>
              <span className="bg-slate-50 px-1.5 py-0.5 rounded-md">
                {formatDate(cycle.end_date)}
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
        <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100 flex gap-3 animate-in slide-in-from-top-2">
          <Sprout size={16} className="text-red-400 shrink-0" />
          <div className="space-y-1">
            <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">
              AI Failure Analysis
            </p>
            <p className="text-[11px] text-slate-600 leading-relaxed italic">
              "{cycle.ai_explanation}"
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
          className="h-8 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:bg-slate-50"
        >
          Detail <ChevronRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};
