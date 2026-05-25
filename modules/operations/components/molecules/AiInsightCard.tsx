import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Wrench,
  HeartPulse,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const AiInsightCard = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-700">
      <div
        className={cn(
          "p-5 rounded-[28px] border flex items-center justify-between shadow-sm",
          data.is_dangerous
            ? "bg-red-50/50 border-red-100"
            : "bg-emerald-50/50 border-emerald-100",
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "p-3 rounded-2xl text-white shadow-lg",
              data.is_dangerous ? "bg-red-600" : "bg-emerald-600",
            )}
          >
            {data.is_dangerous ? (
              <AlertTriangle size={24} />
            ) : (
              <ShieldCheck size={24} />
            )}
          </div>
          <div>
            <h4
              className={cn(
                "text-sm font-black uppercase tracking-tight",
                data.is_dangerous ? "text-red-900" : "text-emerald-900",
              )}
            >
              {data.disease_name}
            </h4>
            <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">
              Akurasi AI: {Math.round(data.confidence_score * 100)}%
            </p>
          </div>
        </div>
        {data.is_dangerous && (
          <Badge className="bg-red-600 animate-pulse text-[9px]">KRITIS</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-[24px] bg-slate-50 border border-slate-100 space-y-3">
          <div className="flex items-center gap-2 text-slate-400">
            <FileText size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Gejala & Penyebab
            </span>
          </div>
          <p className="text-[11px] font-medium leading-relaxed text-slate-600 italic">
            "{data.insight.disease_description}"
          </p>
          <p className="text-[11px] text-slate-500 font-bold border-t pt-2">
            {data.insight.causes}
          </p>
        </div>

        <div className="p-5 rounded-[24px] bg-blue-50/30 border border-blue-100 space-y-3">
          <div className="flex items-center gap-2 text-blue-600">
            <Wrench size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Tindakan Kuratif
            </span>
          </div>
          <ul className="space-y-2">
            {data.insight.treatment.map((t: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-2 text-[11px] font-bold text-blue-900 leading-snug"
              >
                <div className="w-4 h-4 rounded bg-blue-600 text-white flex items-center justify-center text-[9px] shrink-0 mt-0.5">
                  {i + 1}
                </div>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2 p-5 rounded-[24px] bg-emerald-50/30 border border-emerald-100 flex items-start gap-4">
          <HeartPulse className="text-emerald-600 shrink-0" size={20} />
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-700 tracking-widest">
              Analisis Pemulihan
            </span>
            <p className="text-[11px] font-medium text-emerald-800/80 leading-relaxed">
              {data.insight.recovery}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
