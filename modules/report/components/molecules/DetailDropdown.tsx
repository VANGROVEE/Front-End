"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DailyActivity } from "@/modules/operations/types/activty";
import {
  Activity,
  CalendarDays,
  Droplet,
  Hash,
  Thermometer,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────
interface ActivityStats {
  typeCounts: Record<string, number>;
  mostFrequent: [string, number];
  avgTemp: string | null;
  avgHumidity: number | null;
  firstDate: string | undefined;
  lastDate: string | undefined;
}

interface DetailDropdownProps {
  isLoadingActivities: boolean;
  activities: DailyActivity[] | undefined;
  stats: ActivityStats | null;
  formatDate: (date: string) => string;
  getConfig: (type: string) => { label: string; color: string; bg: string };
}

// ── Component ────────────────────────────────────────────────
export const DetailDropdown = ({
  isLoadingActivities,
  activities,
  stats,
  formatDate,
  getConfig,
}: DetailDropdownProps) => {
  // ── Loading State ──
  if (isLoadingActivities) {
    return (
      <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-5">
        <div className="flex items-center justify-center py-8">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // ── Empty State ──
  if (!activities || activities.length === 0) {
    return (
      <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-5">
        <div className="text-center py-8">
          <Activity size={28} className="text-slate-200 mx-auto mb-2" />
          <p className="text-xs text-slate-400 font-medium">
            Belum ada aktivitas tercatat
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-5 space-y-5">
      {/* ── Ringkasan Statistik ── */}
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">
          Ringkasan
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Card className="rounded-2xl border-slate-100 shadow-none">
            <CardContent className="p-3 text-center">
              <div className="w-7 h-7 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                <Hash size={13} className="text-slate-500" />
              </div>
              <p className="text-lg font-black text-slate-800">
                {activities.length}
              </p>
              <p className="text-[9px] font-black text-slate-400 uppercase">
                Total Log
              </p>
            </CardContent>
          </Card>

          {stats?.mostFrequent && (
            <Card
              className={cn(
                "rounded-2xl border-slate-100 shadow-none",
                getConfig(stats.mostFrequent[0]).bg,
              )}
            >
              <CardContent className="p-3 text-center">
                <div className="w-7 h-7 bg-white/60 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                  <Activity
                    size={13}
                    className={getConfig(stats.mostFrequent[0]).color}
                  />
                </div>
                <p className="text-lg font-black text-slate-800">
                  {stats.mostFrequent[1]}x
                </p>
                <p className="text-[9px] font-black text-slate-500 uppercase">
                  {getConfig(stats.mostFrequent[0]).label}
                </p>
              </CardContent>
            </Card>
          )}

          {stats?.avgTemp && (
            <Card className="rounded-2xl border-slate-100 shadow-none bg-amber-50">
              <CardContent className="p-3 text-center">
                <div className="w-7 h-7 bg-white/60 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                  <Thermometer size={13} className="text-amber-600" />
                </div>
                <p className="text-lg font-black text-slate-800">
                  {stats.avgTemp}°
                </p>
                <p className="text-[9px] font-black text-amber-600 uppercase">
                  Suhu Rata²
                </p>
              </CardContent>
            </Card>
          )}

          {stats?.avgHumidity && (
            <Card className="rounded-2xl border-slate-100 shadow-none bg-blue-50">
              <CardContent className="p-3 text-center">
                <div className="w-7 h-7 bg-white/60 rounded-xl flex items-center justify-center mx-auto mb-1.5">
                  <Droplet size={13} className="text-blue-500" />
                </div>
                <p className="text-lg font-black text-slate-800">
                  {stats.avgHumidity}%
                </p>
                <p className="text-[9px] font-black text-blue-600 uppercase">
                  Kelembaban
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* ── Rentang Tanggal ── */}
      {stats?.firstDate && stats?.lastDate && (
        <Card className="rounded-2xl border-slate-100 shadow-none">
          <CardContent className="p-3 flex items-center gap-3">
            <CalendarDays size={14} className="text-emerald-500 shrink-0" />
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
              <span>{formatDate(stats.firstDate)}</span>
              <span className="text-slate-300">→</span>
              <span>{formatDate(stats.lastDate)}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Breakdown Jenis Aktivitas ── */}
      {stats?.typeCounts && Object.keys(stats.typeCounts).length > 1 && (
        <>
          <Separator className="bg-slate-100" />
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Breakdown Aktivitas
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.typeCounts).map(([type, count]) => {
                const config = getConfig(type);
                return (
                  <Badge
                    key={type}
                    variant="secondary"
                    className={cn(
                      "rounded-full font-black text-[10px] px-3 py-1.5 border-none",
                      config.bg,
                      config.color,
                    )}
                  >
                    {config.label}
                    <span className="ml-1.5 bg-white/60 px-1.5 py-0.5 rounded-full">
                      {count}x
                    </span>
                  </Badge>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
