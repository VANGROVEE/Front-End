"use client";

import { BarChart3, CalendarDays, Scale, TrendingUp } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHarvestDashboard } from "../../hooks/useHarvestReport";
import { CycleListItem } from "../molecules/CycleListItem";
import { EmptyState } from "../molecules/EmptyState";
import { HarvestListItem } from "../molecules/HarvestListItem";
import { LoadingSkeleton } from "../molecules/LoadingSkeleton";
import { StatCard } from "../molecules/StatCard";

export const LaporanPage = () => {
  const { data, isLoading } = useHarvestDashboard();

  const formatDate = (dateString: string | Date | null) => {
    if (!dateString) return "Berjalan";
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-500">
      <header className="space-y-1">
        <div className="flex items-center gap-2 text-emerald-600">
          <BarChart3 size={18} strokeWidth={3} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            Reporting Systems
          </span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
          Statistik <span className="text-emerald-500">Produksi</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Scale size={20} />}
          label="Total Produksi"
          value={data?.stats.total_yield_kg || 0}
          unit="Kg"
          color="emerald"
        />
        <StatCard
          icon={<CalendarDays size={20} />}
          label="Frekuensi Panen"
          value={data?.stats.harvest_count || 0}
          unit="Kali"
          color="blue"
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Success Rate"
          value={data?.stats.success_rate || 0}
          unit="%"
          color="amber"
        />
      </div>

      <Tabs defaultValue="harvests" className="w-full">
        <TabsList className="bg-slate-100/50 p-1 rounded-2xl mb-6">
          <TabsTrigger
            value="harvests"
            className="rounded-xl font-black text-[11px] uppercase tracking-wider py-2 px-6"
          >
            Log Penimbangan
          </TabsTrigger>
          <TabsTrigger
            value="cycles"
            className="rounded-xl font-black text-[11px] uppercase tracking-wider py-2 px-6"
          >
            Riwayat Siklus
          </TabsTrigger>
        </TabsList>

        <TabsContent value="harvests">
          <ScrollArea className="h-[600px] pr-4">
            {!data?.history || data.history.length === 0 ? (
              <EmptyState message="Belum ada catatan penimbangan hasil bumi" />
            ) : (
              <div className="grid gap-3">
                {data.history.map((report) => (
                  <HarvestListItem
                    key={report.id}
                    report={report}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="cycles">
          <ScrollArea className="h-[600px] pr-4">
            {!data?.cycles || data.cycles.length === 0 ? (
              <EmptyState message="Belum ada riwayat siklus tanam" />
            ) : (
              <div className="grid gap-4">
                {data.cycles.map((cycle) => (
                  <CycleListItem
                    key={cycle.id}
                    cycle={cycle}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
