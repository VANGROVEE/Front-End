import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatColor = "emerald" | "blue" | "amber";

export interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
  color: StatColor;
}
export const StatCard = ({
  icon,
  label,
  value,
  unit,
  color,
}: StatCardProps) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
  };
  return (
    <Card className="rounded-[28px] border-none shadow-sm bg-white p-6">
      <div
        className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center mb-4",
          colors[color],
        )}
      >
        {icon}
      </div>
      <div className="flex items-baseline gap-1">
        <h2 className="text-3xl font-black text-slate-900">{value}</h2>
        <span className="text-xs font-bold text-slate-400 uppercase">
          {unit}
        </span>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
        {label}
      </p>
    </Card>
  );
};
