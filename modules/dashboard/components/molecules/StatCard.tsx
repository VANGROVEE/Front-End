import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const StatCard = ({
  icon,
  label,
  value,
  status,
  color,
  isAlert,
}: any) => {
  const themes = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
    emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
  };

  const iconThemes = {
    blue: "bg-blue-500 shadow-blue-500/40",
    indigo: "bg-indigo-500 shadow-indigo-500/40",
    emerald: "bg-emerald-500 shadow-emerald-500/40",
    orange: "bg-orange-500 shadow-orange-500/40",
  };

  return (
    <Card className="bg-white/70 backdrop-blur-md border border-white/50 shadow-md rounded-[2.5rem] h-28 flex items-center justify-center transition-all hover:bg-white/90">
      <CardContent className="flex items-center gap-4 w-full">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white",
            iconThemes[color as keyof typeof iconThemes],
          )}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          {/* Hapus text-slate-500/80, ganti ke text-slate-600 yang solid agar tajam */}
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1 truncate">
            {label}
          </p>
          <div className="flex items-center justify-between gap-2">
            {/* Pertahankan text-slate-900 untuk value agar dominan */}
            <h4 className="text-xl font-black text-slate-900 tracking-tighter truncate uppercase">
              {value}
            </h4>
            {status && (
              <Badge
                variant="outline"
                className={cn(
                  "text-[8px] font-black uppercase border px-2 shrink-0 shadow-sm",
                  isAlert
                    ? "bg-red-500 text-white border-red-500 animate-pulse"
                    : themes[color as keyof typeof themes],
                )}
              >
                {status}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
