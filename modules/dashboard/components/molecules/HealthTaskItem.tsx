// modules/dashboard/components/molecules/HealthTaskItem.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // Optional: jika ingin visual progress
import { cn } from "@/lib/utils";

interface HealthTaskItemProps {
  title: string;
  desc: string;
  confidence: number;
}

export const HealthTaskItem = ({
  title,
  desc,
  confidence,
}: HealthTaskItemProps) => {
  const score = Math.round(confidence * 100);
  const isCritical = score < 95; // Contoh logika: di bawah 95% butuh perhatian lebih

  return (
    <div className="group relative flex items-start gap-4 p-3 rounded-[22px] bg-white/50 backdrop-blur-md border border-white/80 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 w-full min-w-0 ring-1 ring-black/[0.03]">
      {/* Visual Accuracy Indicator - Menggunakan gaya Avatar Shadcn */}
      <div className="relative shrink-0">
        <div
          className={cn(
            "w-12 h-12 rounded-[18px] flex flex-col items-center justify-center border shadow-inner transition-all",
            score >= 95
              ? "bg-emerald-500 border-emerald-400 text-white"
              : "bg-amber-50 border-amber-100 text-amber-600",
          )}
        >
          <span className="text-[11px] font-black leading-none">{score}</span>
          <span className="text-[6px] font-bold uppercase tracking-tighter opacity-80">
            Acc
          </span>
        </div>

        {/* Pulsing Dot untuk High Alert */}
        {isCritical && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-1.5 pt-0.5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-tight line-clamp-2 italic">
            {title}
          </h4>

          {/* Badge Status Shadcn */}
          <Badge
            variant="outline"
            className={cn(
              "text-[7px] px-1.5 py-0 border-none font-black tracking-widest",
              score >= 95
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700",
            )}
          >
            {score >= 95 ? "VERIFIED" : "LOW_ACC"}
          </Badge>
        </div>

        {/* Description/Treatment */}
        <p className="text-[9px] text-slate-500 font-bold leading-relaxed line-clamp-2 italic opacity-80 break-words">
          {desc}
        </p>

        {/* Mini Progress Bar (Improvement visual Shadcn) */}
        <div className="pt-1 overflow-hidden">
          <Progress
            value={score}
            className="h-[2px] bg-slate-100"
            // Color logic inline or via CSS
          />
        </div>
      </div>
    </div>
  );
};
