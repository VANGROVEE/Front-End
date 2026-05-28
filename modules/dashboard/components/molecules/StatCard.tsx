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
    blue: "bg-blue-500/20 text-blue-600 border-blue-200/50",
    indigo: "bg-indigo-500/20 text-indigo-600 border-indigo-200/50",
    emerald: "bg-emerald-500/20 text-emerald-600 border-emerald-200/50",
    orange: "bg-orange-500/20 text-orange-600 border-orange-200/50",
  };

  const iconThemes = {
    blue: "bg-blue-600 shadow-blue-200",
    indigo: "bg-indigo-600 shadow-indigo-200",
    emerald: "bg-emerald-600 shadow-emerald-200",
    orange: "bg-orange-600 shadow-orange-200",
  };

  return (
    <Card className="bg-white/40 backdrop-blur-md border-white/20 shadow-xl rounded-[2.5rem] h-28 flex items-center transition-all hover:bg-white/60">
      <CardContent className="p-6 flex items-center gap-4 w-full">
        <div
          className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white",
            iconThemes[color as keyof typeof iconThemes],
          )}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500/80 mb-1 truncate">
            {label}
          </p>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xl font-black text-slate-900 tracking-tighter truncate uppercase">
              {value}
            </h4>
            {status && (
              <Badge
                variant="outline"
                className={cn(
                  "text-[8px] font-black uppercase border-none px-2 shrink-0",
                  isAlert
                    ? "bg-red-500 text-white animate-pulse"
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
