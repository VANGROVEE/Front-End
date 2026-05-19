"use client";

import {
  ArrowLeft,
  Sprout,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Leaf,
  Bug,
  Activity,
  CalendarDays,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useReport } from "@/common/hooks/use-report";

const statusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "COMPLETED":
      return "bg-blue-100 text-blue-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "Aktif";
    case "COMPLETED":
      return "Selesai";
    case "FAILED":
      return "Gagal";
    default:
      return status;
  }
};

const formatDate = (date: string | null) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const LaporanPage = () => {
  const router = useRouter();
  const {
    cycles,
    activities,
    loading,
    totalCycles,
    activeCycles,
    completedCycles,
    failedCycles,
    commodityStats,
    activityStats,
    hamaActivities,
  } = useReport();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-medium">
            Memuat laporan...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-green-600 transition-colors font-semibold"
      >
        <ArrowLeft size={16} />
        Kembali
      </button>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
            <BarChart3 size={20} className="text-green-600" />
          </div>
          <div>
            <h1 className="text-lg font-black text-slate-800">
              Laporan Pertanian
            </h1>
            <p className="text-xs text-slate-400">
              Ringkasan siklus tanam dan aktivitas harian
            </p>
          </div>
        </div>
      </div>

      {/* Statistik Ringkasan */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Siklus */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center mb-3">
            <Sprout size={18} className="text-slate-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">{totalCycles}</p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Total Siklus
          </p>
        </div>

        {/* Aktif */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center mb-3">
            <Clock size={18} className="text-green-600" />
          </div>
          <p className="text-2xl font-black text-green-600">{activeCycles}</p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Sedang Berjalan
          </p>
        </div>

        {/* Selesai */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
            <CheckCircle size={18} className="text-blue-600" />
          </div>
          <p className="text-2xl font-black text-blue-600">{completedCycles}</p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Selesai Panen
          </p>
        </div>

        {/* Gagal */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
          <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center mb-3">
            <XCircle size={18} className="text-red-500" />
          </div>
          <p className="text-2xl font-black text-red-500">{failedCycles}</p>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Gagal Panen
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Komoditas */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Leaf size={16} className="text-green-600" />
            <h2 className="text-sm font-black text-slate-800">Jenis Tanaman</h2>
          </div>

          {commodityStats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <Sprout size={28} className="text-slate-200" />
              <p className="text-xs text-slate-400">Belum ada data tanaman</p>
            </div>
          ) : (
            <div className="space-y-3">
              {commodityStats.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                      <Sprout size={14} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {c.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {c.total} siklus
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {c.active > 0 && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
                        {c.active} aktif
                      </span>
                    )}
                    {c.completed > 0 && (
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                        {c.completed} panen
                      </span>
                    )}
                    {c.failed > 0 && (
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                        {c.failed} gagal
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Aktivitas */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-green-600" />
            <h2 className="text-sm font-black text-slate-800">
              Jenis Aktivitas
            </h2>
          </div>

          {activityStats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <Activity size={28} className="text-slate-200" />
              <p className="text-xs text-slate-400">
                Belum ada aktivitas tercatat
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activityStats.map((a) => (
                <div
                  key={a.type}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                      <TrendingUp size={14} className="text-orange-500" />
                    </div>
                    <p className="text-sm font-bold text-slate-800">{a.type}</p>
                  </div>
                  <span className="text-xs bg-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full font-bold">
                    {a.count}x
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Terdampak Hama */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bug size={16} className="text-red-500" />
          <h2 className="text-sm font-black text-slate-800">
            Catatan Terdampak Hama
          </h2>
          {hamaActivities.length > 0 && (
            <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold ml-auto">
              {hamaActivities.length} catatan
            </span>
          )}
        </div>

        {hamaActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Bug size={28} className="text-slate-200" />
            <p className="text-xs text-slate-400 font-medium">
              Tidak ada catatan hama
            </p>
            <p className="text-[11px] text-slate-300">
              Tanaman dalam kondisi baik
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {hamaActivities.map((a) => (
              <div
                key={a.id}
                className="flex items-start gap-3 p-3 bg-red-50/50 rounded-2xl border border-red-100"
              >
                <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bug size={14} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-700">
                      {a.activity_type}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {formatDate(a.activity_date)}
                    </span>
                  </div>
                  {a.notes && (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {a.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* List Siklus Tanam */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarDays size={16} className="text-green-600" />
          <h2 className="text-sm font-black text-slate-800">
            Detail Siklus Tanam
          </h2>
        </div>

        {cycles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <Sprout size={28} className="text-slate-200" />
            <p className="text-xs text-slate-400">Belum ada siklus tanam</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cycles.map((cycle) => (
              <div
                key={cycle.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Sprout size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {cycle.commodity_name}
                    </p>
                    {cycle.variety && (
                      <p className="text-[11px] text-slate-400">
                        {cycle.variety}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-slate-400">
                        Mulai: {formatDate(cycle.start_date)}
                      </span>
                      {cycle.estimated_harvest && (
                        <span className="text-[10px] text-slate-400">
                          Panen: {formatDate(cycle.estimated_harvest)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full ${statusColor(cycle.status)}`}
                >
                  {statusLabel(cycle.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
