"use client";

import React from "react";
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
  Inbox,
} from "lucide-react";
import { useNotification, Notification } from "@/common/hooks/use-notification";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const getTypeIcon = (type: Notification["type"], title: string) => {
  const iconSize = 14;
  const titleLower = title.toLowerCase();

  if (titleLower.includes("ai") || titleLower.includes("rekomendasi"))
    return <Bot size={iconSize} className="text-blue-500" />;
  if (titleLower.includes("panen") || titleLower.includes("siklus"))
    return <Sprout size={iconSize} className="text-green-500" />;
  if (titleLower.includes("cuaca"))
    return <CloudRain size={iconSize} className="text-sky-500" />;
  if (titleLower.includes("aktivitas"))
    return <CalendarDays size={iconSize} className="text-orange-500" />;

  switch (type) {
    case "success":
      return <CheckCircle size={iconSize} className="text-emerald-500" />;
    case "warning":
      return <AlertTriangle size={iconSize} className="text-amber-500" />;
    case "error":
      return <AlertCircle size={iconSize} className="text-red-500" />;
    default:
      return <Info size={iconSize} className="text-blue-500" />;
  }
};

const getTypeBg = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "bg-emerald-50";
    case "warning":
      return "bg-amber-50";
    case "error":
      return "bg-red-50";
    default:
      return "bg-blue-50";
  }
};

export const NotificationDropdown = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotification();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-slate-100 transition-all active:scale-90"
        >
          <Bell size={20} className="text-slate-500" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-in zoom-in duration-300">
              <span className="text-[8px] text-white font-black">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 sm:w-96 p-0 rounded-[24px] overflow-hidden border-slate-100 shadow-2xl z-[60]"
        align="end"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <DropdownMenuLabel className="p-0 text-sm font-black text-slate-800 uppercase tracking-tight">
              Notifikasi
            </DropdownMenuLabel>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white hover:bg-red-500 border-none text-[9px] font-black px-1.5 h-4">
                {unreadCount} BARU
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                markAllAsRead();
              }}
              className="h-7 px-2 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-1 rounded-lg"
            >
              <CheckCheck size={12} /> Tandai dibaca
            </Button>
          )}
        </div>

        <ScrollArea className="h-[380px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-3">
                <Inbox size={24} className="text-slate-200" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Kotak Masuk Kosong
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={cn(
                    "group relative flex items-start gap-4 px-5 py-4 transition-all border-b border-slate-50/50 cursor-pointer",
                    !notif.isRead
                      ? "bg-emerald-50/30 hover:bg-emerald-50/50"
                      : "hover:bg-slate-50/80",
                  )}
                  onClick={() => markAsRead(notif.id)}
                >
                  {!notif.isRead && (
                    <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald-500 rounded-full" />
                  )}

                  <div
                    className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
                      getTypeBg(notif.type),
                    )}
                  >
                    {getTypeIcon(notif.type, notif.title)}
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4
                        className={cn(
                          "text-[11px] font-black uppercase tracking-tight truncate",
                          !notif.isRead ? "text-slate-900" : "text-slate-500",
                        )}
                      >
                        {notif.title}
                      </h4>
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-500 line-clamp-2 font-medium">
                      {notif.message}
                    </p>
                    <span className="text-[9px] font-bold text-slate-300 uppercase mt-2 block">
                      {formatDistanceToNow(new Date(notif.createdAt), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity rounded-full hover:bg-red-50 hover:text-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notif.id);
                    }}
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator className="m-0" />
        <div className="p-2 bg-slate-50/50">
          <Button
            asChild
            variant="ghost"
            className="w-full h-10 rounded-xl hover:bg-white hover:shadow-sm"
          >
            <Link
              href="/dashboard/notification"
              className="flex items-center justify-center gap-2 text-xs font-black text-slate-600 uppercase tracking-tighter"
            >
              Lihat Semua Aktivitas
              <Badge
                variant="outline"
                className="h-4 px-1 text-[8px] border-slate-200 text-slate-400"
              >
                {notifications.length}
              </Badge>
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
