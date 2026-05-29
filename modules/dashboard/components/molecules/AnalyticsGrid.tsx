"use client";

import {
  AlertCircle,
  BarChart3,
  CheckCircle2,
  ShieldAlert,
  Sprout,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { useAnalysis } from "../../hooks/useAnalyze";

const CardErrorState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-60 px-6 text-center">
    <AlertCircle size={24} className="text-red-400" />
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
      {message}
    </p>
  </div>
);

export const AnalyticsGrid = () => {
  const { trends, diseaseTrends, isLoading, recommendation, isError, refetch } =
    useAnalysis();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[480px] w-full rounded-[40px]" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-12 border-2 border-dashed border-slate-200 rounded-[40px] text-center space-y-4">
        <AlertCircle size={40} className="mx-auto text-red-500 opacity-20" />
        <div className="space-y-1">
          <p className="text-sm font-black text-slate-800 uppercase tracking-tight">
            Gagal Memuat Data Analisis
          </p>
          <p className="text-xs text-slate-500">
            Terjadi gangguan koneksi ke server pusat Vangrove.
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase rounded-full hover:scale-105 transition-transform"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6  items-stretch">
      {/* CARD 1: SENSUS KOMODITAS */}
      <Card className="rounded-[40px] border border-slate-100 shadow-sm flex flex-col h-[480px]">
        <CardHeader className="pt-8 px-8 pb-2 shrink-0">
          <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.35em] flex items-center gap-2">
            <BarChart3 size={14} className="text-emerald-500" />
            Sensus Komoditas
          </CardTitle>
          <CardDescription className="text-xs font-medium text-slate-500 mt-1">
            Distribusi populasi siklus tanam aktif.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-8 pt-4 overflow-hidden">
          {trends && trends.length > 0 ? (
            <>
              <div className="h-48 w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trends}
                    margin={{ top: 30, right: 10, left: -20, bottom: 20 }}
                  >
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      tick={(props: any) => {
                        const { x, y, payload } = props;
                        const alias = payload.value
                          .split(" ")
                          .map((w: string) => w[0])
                          .join("")
                          .toUpperCase();
                        return (
                          <text
                            x={x}
                            y={y + 15}
                            fill="#94a3b8"
                            className="text-[11px] font-mono font-black"
                            textAnchor="middle"
                          >
                            {alias}
                          </text>
                        );
                      }}
                    />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "rgba(16, 185, 129, 0.04)" }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white text-slate-900 p-3.5 rounded-[20px] shadow-xl border border-slate-100">
                              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">
                                {payload[0].payload.name}
                              </p>
                              <p className="text-base font-black text-slate-800">
                                {payload[0].value}{" "}
                                <span className="text-xs font-bold text-slate-400 uppercase">
                                  Siklus
                                </span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="value"
                      radius={[12, 12, 12, 12]}
                      barSize={32}
                      label={(props: any) => {
                        const { x, y, width, value } = props;
                        const posX =
                          (Number(x) || 0) + (Number(width) || 0) / 2;
                        const posY = (Number(y) || 0) - 12;
                        return (
                          <text
                            x={posX}
                            y={posY}
                            fill="#1e293b"
                            className="text-sm font-mono font-black"
                            textAnchor="middle"
                          >
                            {value}
                          </text>
                        );
                      }}
                    >
                      {trends.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={index === 0 ? "#10b981" : "#f1f5f9"}
                          className="transition-all duration-500 hover:opacity-80"
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-auto space-y-3 pt-4 border-t border-slate-100">
                <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100/50">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    Dominan
                  </span>
                  <span className="text-[10px] font-black text-slate-900 uppercase truncate ml-4">
                    {trends[0]?.name || "N/A"}
                  </span>
                </div>
                <div className="p-4 bg-emerald-50/50 border border-emerald-100/60 rounded-[2rem] flex flex-col gap-1">
                  <span className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">
                    AI Note
                  </span>
                  <p className="text-[10px] font-medium text-slate-600 italic leading-tight">
                    Pertumbuhan puncak pada varietas utama terdeteksi.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <CardErrorState message="Belum ada data penanaman" />
          )}
        </CardContent>
      </Card>

      {/* CARD 2: PERINGKAT PENYAKIT */}
      <Card className="rounded-[40px] border border-slate-100 shadow-sm flex flex-col h-[480px]">
        <CardHeader className="pt-8 px-8 pb-2 shrink-0">
          <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.35em] flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <ShieldAlert size={14} className="text-red-500 animate-pulse" />
              Peringkat Penyakit
            </span>
            <Badge
              variant="outline"
              className="text-[8px] font-black border-red-200 text-red-600 bg-red-50/60 rounded-full"
            >
              Radar
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs font-medium text-slate-500 mt-1">
            Urutan kasus patogen aktif.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-8 pt-4 overflow-hidden">
          {diseaseTrends && diseaseTrends.length > 0 ? (
            <>
              <div className="flex-1 space-y-2.5 relative">
                {diseaseTrends.slice(0, 4).map((item: any, index: number) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-2xl border transition-all",
                      index === 0
                        ? "bg-red-50/40 border-red-100/70"
                        : "bg-slate-50/60 border-slate-100",
                    )}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-black",
                          index === 0
                            ? "bg-red-500 text-white"
                            : "bg-slate-200 text-slate-600",
                        )}
                      >
                        {item.rank || `0${index + 1}`}
                      </span>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-black text-slate-800 truncate uppercase">
                          {item.name}
                        </p>
                        <p
                          className={cn(
                            "text-[8px] font-black uppercase mt-0.5",
                            index === 0 ? "text-red-500" : "text-slate-400",
                          )}
                        >
                          {item.riskLevel || "Warning"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p
                        className={cn(
                          "text-sm font-mono font-black leading-none",
                          index === 0 ? "text-red-600" : "text-slate-700",
                        )}
                      >
                        {item.cases}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4 border-t border-slate-100">
                <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between text-[9px] font-black uppercase text-slate-400">
                  <span>Total Sektor Terdampak</span>
                  <span className="text-slate-800 font-mono bg-white border border-slate-200/60 px-2 py-1 rounded-lg">
                    {diseaseTrends.reduce(
                      (acc: number, curr: any) =>
                        acc + (Number(curr.cases) || 0),
                      0,
                    )}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-2 opacity-60">
              <CheckCircle2 size={24} className="text-emerald-500" />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Seluruh Tanaman Sehat
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CARD 3: AGENDA KERJA AI */}
      <Card className="rounded-[40px] border border-slate-100 shadow-sm flex flex-col h-[480px]">
        <CardHeader className="pt-8 px-8 pb-2 shrink-0">
          <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-[0.35em] flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sprout size={14} className="text-emerald-500" /> Agenda Kerja AI
            </span>
            <Badge
              variant="outline"
              className="text-[8px] font-black border-emerald-200 text-emerald-600 bg-emerald-50 rounded-full"
            >
              TASKS
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs font-medium text-slate-500 mt-1">
            Instruksi prioritas dari Vangrove AI.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden pt-4 flex flex-col">
          <ScrollArea className="flex-1 px-8">
            <div className="space-y-4 pb-8">
              {recommendation && recommendation.length > 0 ? (
                recommendation.map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "p-4 rounded-3xl border transition-all cursor-pointer",
                      item.priority === "URGENT"
                        ? "bg-red-50/40 border-red-100 hover:bg-red-50"
                        : "bg-slate-50/60 border-slate-100 hover:bg-white",
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        className={cn(
                          "text-[8px] font-bold border-none",
                          item.priority === "URGENT"
                            ? "bg-red-500 text-white"
                            : "bg-blue-500 text-white",
                        )}
                      >
                        {item.priority}
                      </Badge>
                      <span className="text-[9px] font-mono text-slate-400 font-bold uppercase tracking-tighter">
                        {item.location}
                      </span>
                    </div>
                    <p className="text-[11px] font-black text-slate-800 leading-tight mb-1 uppercase truncate">
                      {item.task}
                    </p>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic line-clamp-2">
                      "{item.description}"
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 opacity-40">
                  <CheckCircle2 size={32} className="text-emerald-500 mb-2" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">
                    Semua Tugas Selesai
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
