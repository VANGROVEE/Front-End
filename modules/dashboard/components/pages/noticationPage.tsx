"use client";

import {
  Bell,
  X,
  CheckCheck,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Sprout,
  Bot,
  CalendarDays,
  CloudRain,
  ArrowLeft,
  BellOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useNotification, Notification } from "@/common/hooks/use-notification";
import { useState } from "react";

type FilterType = "all" | "unread" | "read";

const formatTime = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins} menit lalu`;
  if (hours < 24) return `${hours} jam lalu`;
  return `${days} hari lalu`;
};

const getTypeIcon = (type: Notification["type"], title: string) => {
  if (
    title.toLowerCase().includes("ai") ||
    title.toLowerCase().includes("rekomendasi")
  )
    return <Bot size={18} className="text-blue-500" />;
  if (
    title.toLowerCase().includes("panen") ||
    title.toLowerCase().includes("siklus")
  )
    return <Sprout size={18} className="text-green-500" />;
  if (title.toLowerCase().includes("cuaca"))
    return <CloudRain size={18} className="text-sky-500" />;
  if (title.toLowerCase().includes("aktivitas"))
    return <CalendarDays size={18} className="text-orange-500" />;
  switch (type) {
    case "success":
      return <CheckCircle size={18} className="text-green-500" />;
    case "warning":
      return <AlertTriangle size={18} className="text-yellow-500" />;
    case "error":
      return <AlertCircle size={18} className="text-red-500" />;
    default:
      return <Info size={18} className="text-blue-500" />;
  }
};

const getTypeBg = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-100";
    case "warning":
      return "bg-yellow-100";
    case "error":
      return "bg-red-100";
    default:
      return "bg-blue-100";
  }
};

const getTypeBadge = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-100 text-green-700";
    case "warning":
      return "bg-yellow-100 text-yellow-700";
    case "error":
      return "bg-red-100 text-red-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

const getTypeLabel = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "Sukses";
    case "warning":
      return "Peringatan";
    case "error":
      return "Error";
    default:
      return "Info";
  }
};

export const NotificationPage = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAll,
  } = useNotification();

  const filtered = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-green-600 transition-colors font-semibold"
      >
        <ArrowLeft size={16} />
        Kembali
      </button>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
              <Bell size={20} className="text-green-600" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800">Notifikasi</h1>
              <p className="text-xs text-slate-400">
                {unreadCount > 0
                  ? `${unreadCount} notifikasi belum dibaca`
                  : "Semua notifikasi sudah dibaca"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1.5 text-xs text-green-600 hover:text-green-700 font-semibold bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                <CheckCheck size={14} />
                Tandai semua
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={deleteAll}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-semibold bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors"
              >
                <X size={14} />
                Hapus semua
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4">
          {(["all", "unread", "read"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filter === f
                  ? "bg-green-600 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {f === "all"
                ? "Semua"
                : f === "unread"
                  ? "Belum Dibaca"
                  : "Sudah Dibaca"}
              {f === "unread" && unreadCount > 0 && (
                <span className="ml-1.5 bg-white text-green-600 rounded-full px-1.5 py-0.5 text-[10px] font-black">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
              <BellOff size={28} className="text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-400">
              Tidak ada notifikasi
            </p>
            <p className="text-xs text-slate-300">
              {filter === "unread"
                ? "Semua notifikasi sudah dibaca"
                : "Belum ada notifikasi masuk"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {filtered.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors cursor-pointer relative ${
                  !notif.isRead ? "bg-green-50/30" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5 ${getTypeBg(notif.type)}`}
                >
                  {getTypeIcon(notif.type, notif.title)}
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className={`text-sm font-bold ${!notif.isRead ? "text-slate-800" : "text-slate-600"}`}
                    >
                      {notif.title}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getTypeBadge(notif.type)}`}
                    >
                      {getTypeLabel(notif.type)}
                    </span>
                    {!notif.isRead && (
                      <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 font-medium">
                    {formatTime(notif.createdAt)}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notif.id);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-50 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {notifications.length > 0 && (
        <p className="text-center text-xs text-slate-400 font-medium">
          {notifications.length} notifikasi total · {unreadCount} belum dibaca
        </p>
      )}
    </div>
  );
};
