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
  Loader2,
} from "lucide-react";
import { useNotification } from "@/modules/notifications/hooks/use-notification";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { getNotificationStyles } from "../../const/getNotificationStyles";



export const NotificationDropdown = () => {
  const {
    notifications,
    unreadCount,
    isLoading,
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
          <Bell
            size={20}
            className={cn(
              unreadCount > 0 ? "text-emerald-600" : "text-slate-500",
            )}
          />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center animate-bounce shadow-sm">
              <span className="text-[7px] text-white font-black">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 sm:w-[420px] p-0 rounded-[28px] overflow-hidden border-slate-100 shadow-2xl z-[100]"
        align="end"
        sideOffset={8}
      >
        {/* HEADER */}
        <div className="px-6 py-5 border-b border-slate-50 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DropdownMenuLabel className="p-0 text-base font-black text-slate-900 uppercase tracking-tight">
                Notifikasi
              </DropdownMenuLabel>
              {unreadCount > 0 && (
                <Badge className="bg-emerald-500 text-white hover:bg-emerald-600 border-none text-[9px] font-black px-2 h-5 rounded-full">
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
                className="h-8 px-3 text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 gap-2 rounded-xl transition-all"
              >
                <CheckCheck size={14} /> Baca Semua
              </Button>
            )}
          </div>
        </div>

        {/* LIST AREA */}
        <ScrollArea className="h-[420px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500 opacity-20" />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Sinkronisasi...
              </p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-10 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center mb-4 shadow-inner border border-slate-100">
                <Inbox size={32} className="text-slate-200" />
              </div>
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">
                Kotak Masuk Bersih
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Belum ada aktivitas baru
              </p>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-slate-50">
              {notifications.map((notif) => {
                const style = getNotificationStyles(notif.type, notif.title);
                return (
                  <div
                    key={notif.id}
                    className={cn(
                      "group relative flex items-start gap-4 px-6 py-5 transition-all cursor-pointer",
                      !notif.isRead
                        ? "bg-emerald-50/20 hover:bg-emerald-50/40"
                        : "hover:bg-slate-50/80",
                    )}
                    onClick={() => !notif.isRead && markAsRead(notif.id)}
                  >
                    {/* Unread Bar */}
                    {!notif.isRead && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full" />
                    )}

                    {/* Icon Container */}
                    <div
                      className={cn(
                        "w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105",
                        style.bg,
                        style.color,
                      )}
                    >
                      {style.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className={cn(
                            "text-[11px] font-black uppercase tracking-tight truncate",
                            !notif.isRead ? "text-slate-900" : "text-slate-500",
                          )}
                        >
                          {notif.title}
                        </h4>
                        {!notif.isRead && (
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-500 line-clamp-2 font-medium">
                        {notif.message}
                      </p>
                      <span className="text-[9px] font-black text-slate-300 uppercase mt-3 block tracking-widest">
                        {formatDistanceToNow(new Date(notif.createdAt), {
                          addSuffix: true,
                          locale: id,
                        })}
                      </span>
                    </div>

                    {/* Delete Action */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-all rounded-xl hover:bg-red-50 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notif.id);
                      }}
                    >
                      <X size={14} />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {/* FOOTER */}
        <DropdownMenuSeparator className="m-0 bg-slate-50" />
        <div className="p-3 bg-slate-50/80 backdrop-blur-sm">
          <Button
            asChild
            variant="ghost"
            className="w-full h-11 rounded-2xl hover:bg-white hover:shadow-md transition-all active:scale-[0.98]"
          >
            <Link
              href="/dashboard/notification"
              className="flex items-center justify-center gap-3 text-[11px] font-black text-slate-600 uppercase tracking-widest"
            >
              Buka Semua Aktivitas
              <div className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full text-[9px]">
                {notifications.length}
              </div>
            </Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
