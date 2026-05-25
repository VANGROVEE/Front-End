"use client";

import React from "react";
import {
  Sprout,
  Scale,
  Award,
  BarChart3,
  ImageIcon,
  CalendarDays,
  ChevronRight,
  History,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { harvestReportApi } from "../../api/harvest.api";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useHarvestDashboard } from "../../hooks/useHarvestReport";

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
      {/* HEADER */}
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

      {/* STATS GRID */}
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

        {/* TAB 1: LOG PENIMBANGAN (HARVEST REPORTS) */}
        <TabsContent value="harvests">
          <ScrollArea className="h-[600px] pr-4">
            {/* 🌟 PERBAIKAN: Gunakan data.harvestReports bukan data.cycles */}
            {!data?.history || data.history.length === 0 ? (
              <EmptyState message="Belum ada catatan penimbangan hasil bumi" />
            ) : (
              <div className="grid gap-3">
                {data.history.map((report: any) => (
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

        {/* TAB 2: RIWAYAT SIKLUS (CYCLES) */}
        <TabsContent value="cycles">
          <ScrollArea className="h-[600px] pr-4">
            {!data?.cycles || data.cycles.length === 0 ? (
              <EmptyState message="Belum ada riwayat siklus tanam" />
            ) : (
              <div className="grid gap-4">
                {data.cycles.map((cycle: any) => (
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
/* --- REFACTORED SUB-COMPONENTS --- */

const StatCard = ({ icon, label, value, unit, color }: any) => {
  const colors: any = {
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

const HarvestListItem = ({ report, formatDate }: any) => (
  <div className="group p-4 rounded-[24px] border border-slate-100 bg-white hover:border-emerald-200 transition-all flex items-center gap-4">
    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
      {report.image_proof_url ? (
        <Image
          fill
          src={report.image_proof_url}
          alt="Harvest"
          className="object-cover group-hover:scale-105 transition-transform"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300">
          <ImageIcon size={20} />
        </div>
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-0.5">
        <h4 className="text-[13px] font-black text-slate-800 uppercase truncate">
          {report.cycle?.commodity?.name}
        </h4>
        {/* <Badge
          className={cn(
            "text-[9px] font-black h-4 px-2 border-none shadow-none",
            report.quality_grade === "PENDING_AI"
              ? "bg-slate-100 text-slate-500"
              : "bg-emerald-500 text-white",
          )}
        >
          {report.quality_grade}
        </Badge> */}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        {report.cycle?.variety || "Varietas Standar"}
      </p>
      <p className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
        <CalendarDays size={10} /> {formatDate(report.created_at)}
      </p>
    </div>
    <div className="text-right shrink-0 bg-slate-50 px-3 py-2 rounded-xl">
      <p className="text-[9px] font-black text-slate-400 uppercase">Berat</p>
      <h4 className="text-lg font-black text-emerald-600">
        {report.total_yield_kg} <span className="text-[10px]">Kg</span>
      </h4>
    </div>
  </div>
);

const CycleListItem = ({ cycle, formatDate }: any) => {
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

const LoadingSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest animate-pulse">
      Sinkronisasi Data Kebun...
    </p>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/30">
    <History size={32} className="mx-auto text-slate-200 mb-4" />
    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
      {message}
    </p>
  </div>
);
