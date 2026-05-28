"use client";

import { cn } from "@/lib/utils";
import { useNotification } from "@/modules/notifications/hooks/use-notification";
import { Bell, CheckCheck, Loader2, Settings2, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { NotificationEmptyState } from "../molecules/NotificationEmptyState";
import { NotificationItem } from "../molecules/NotificationItem";

type FilterType = "all" | "unread" | "read";

export const NotificationPage = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [isPending, startTransition] = useTransition();

  const {
    notifications,
    unreadCount,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAll,
  } = useNotification();

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    if (filter === "read") return n.isRead;
    return true;
  });

  const handleFilterChange = (value: string) => {
    startTransition(() => {
      setFilter(value as FilterType);
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[22px] flex items-center justify-center shadow-inner border border-emerald-100/50">
              <Bell size={28} strokeWidth={2.5} />
            </div>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-white"></span>
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Pusat Pesan
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Status:
              </p>
              <Badge
                variant="secondary"
                className={cn(
                  "text-[9px] font-black h-5 px-2 transition-colors",
                  unreadCount > 0
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-500",
                )}
              >
                {unreadCount} BELUM DIBACA
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => markAllAsRead()}
              className="rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-wider h-9 gap-2 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all active:scale-95"
            >
              <CheckCheck size={14} /> Baca Semua
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 h-9 w-9"
          >
            <Settings2 size={18} />
          </Button>
        </div>
      </div>

      <Card className="rounded-[28px] border-none shadow-sm bg-white p-1.5 overflow-hidden">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={handleFilterChange}
        >
          <div className="flex items-center justify-between px-2 py-1">
            <TabsList className="bg-slate-50/50 p-1 rounded-2xl h-10 gap-1 border border-slate-100">
              <TabsTrigger
                value="all"
                className="rounded-xl text-[10px] font-black uppercase tracking-widest px-4 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm"
              >
                Semua
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className="rounded-xl text-[10px] font-black uppercase tracking-widest px-4 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm"
              >
                Baru
              </TabsTrigger>
              <TabsTrigger
                value="read"
                className="rounded-xl text-[10px] font-black uppercase tracking-widest px-4 data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm"
              >
                Arsip
              </TabsTrigger>
            </TabsList>

            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteAll()}
                className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl text-[10px] font-black uppercase tracking-widest px-4 transition-colors"
              >
                <Trash2 size={14} className="mr-2" /> Hapus
              </Button>
            )}
          </div>
        </Tabs>
      </Card>

      <Card className="rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden bg-white relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        )}

        <ScrollArea className="h-[600px] w-full">
          <div
            className={cn(
              "transition-opacity duration-300",
              isPending ? "opacity-50" : "opacity-100",
            )}
          >
            {filteredNotifications.length === 0 ? (
              <NotificationEmptyState filter={filter} />
            ) : (
              <div className="flex flex-col divide-y divide-slate-50">
                {filteredNotifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    notif={notif}
                    onRead={() => markAsRead(notif.id)}
                    onDelete={() => deleteNotification(notif.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      <div className="pt-2">
        <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] select-none">
          Vangrove AI Notification Engine v2.0
        </p>
      </div>
    </div>
  );
};
