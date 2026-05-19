"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { useNotification, Notification } from "@/common/hooks/use-notification";

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
    return <Bot size={15} className="text-blue-500" />;
  if (
    title.toLowerCase().includes("panen") ||
    title.toLowerCase().includes("siklus")
  )
    return <Sprout size={15} className="text-green-500" />;
  if (title.toLowerCase().includes("cuaca"))
    return <CloudRain size={15} className="text-sky-500" />;
  if (title.toLowerCase().includes("aktivitas"))
    return <CalendarDays size={15} className="text-orange-500" />;
  switch (type) {
    case "success":
      return <CheckCircle size={15} className="text-green-500" />;
    case "warning":
      return <AlertTriangle size={15} className="text-yellow-500" />;
    case "error":
      return <AlertCircle size={15} className="text-red-500" />;
    default:
      return <Info size={15} className="text-blue-500" />;
  }
};

const getTypeBg = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-50";
    case "warning":
      return "bg-yellow-50";
    case "error":
      return "bg-red-50";
    default:
      return "bg-blue-50";
  }
};

export const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotification();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-slate-400 hover:text-green-600 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-[9px] text-white font-black">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-800">Notifikasi</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] bg-red-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                  {unreadCount} baru
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-[11px] text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                <CheckCheck size={13} />
                Tandai semua dibaca
              </button>
            )}
          </div>

          {/* List Notifikasi */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <Bell size={32} className="text-slate-200" />
                <p className="text-sm text-slate-400 font-medium">
                  Tidak ada notifikasi
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors relative ${
                      !notif.isRead ? "bg-green-50/40" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${getTypeBg(notif.type)}`}
                    >
                      {getTypeIcon(notif.type, notif.title)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-xs font-bold truncate ${!notif.isRead ? "text-slate-800" : "text-slate-600"}`}
                        >
                          {notif.title}
                        </p>
                        {!notif.isRead && (
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">
                        {formatTime(notif.createdAt)}
                      </p>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                      className="absolute top-3 right-3 p-0.5 text-slate-300 hover:text-red-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-slate-100">
              <Link
                href="/dashboard/notification"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 py-3 text-xs text-green-600 hover:text-green-700 font-bold hover:bg-green-50 transition-colors w-full"
              >
                Lihat Semua Notifikasi
                <span className="text-[10px] bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full font-black">
                  {notifications.length}
                </span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
