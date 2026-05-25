"use client";

import React from "react";
import {
  X,
  Bot,
  Sprout,
  CloudRain,
  CalendarDays,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

// SHADCN COMPONENTS
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Pastikan interface ini diimport atau didefinisikan dengan benar
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  createdAt: Date | string;
}

interface NotificationItemProps {
  notif: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const getVisualConfigs = (type: string, title: string) => {
  const t = title.toLowerCase();
  const iconSize = 20;

  if (t.includes("ai") || t.includes("rekomendasi"))
    return {
      icon: <Bot size={iconSize} />,
      color: "blue",
      label: "AI Assistant",
    };
  if (t.includes("panen") || t.includes("siklus"))
    return {
      icon: <Sprout size={iconSize} />,
      color: "emerald",
      label: "Produksi",
    };
  if (t.includes("cuaca"))
    return {
      icon: <CloudRain size={iconSize} />,
      color: "sky",
      label: "Cuaca",
    };
  if (t.includes("aktivitas"))
    return {
      icon: <CalendarDays size={iconSize} />,
      color: "orange",
      label: "Log",
    };

  switch (type) {
    case "success":
      return {
        icon: <CheckCircle size={iconSize} />,
        color: "emerald",
        label: "Sukses",
      };
    case "warning":
      return {
        icon: <AlertTriangle size={iconSize} />,
        color: "amber",
        label: "Peringatan",
      };
    case "error":
      return {
        icon: <AlertCircle size={iconSize} />,
        color: "red",
        label: "Error",
      };
    default:
      return { icon: <Info size={iconSize} />, color: "blue", label: "Info" };
  }
};

export const NotificationItem = ({
  notif,
  onRead,
  onDelete,
}: NotificationItemProps) => {
  const config = getVisualConfigs(notif.type, notif.title);

  const colorClasses: Record<string, string> = {
    blue: "bg-blue-50 text-blue-500 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-500 border-emerald-100",
    sky: "bg-sky-50 text-sky-500 border-sky-100",
    orange: "bg-orange-50 text-orange-500 border-orange-100",
    amber: "bg-amber-50 text-amber-500 border-amber-100",
    red: "bg-red-50 text-red-500 border-red-100",
  };

  return (
    <div
      onClick={() => onRead(notif.id)}
      className={cn(
        "group relative flex items-start gap-4 px-6 py-5 transition-all cursor-pointer border-b border-slate-50",
        !notif.isRead
          ? "bg-emerald-50/30 hover:bg-emerald-50/50"
          : "bg-white hover:bg-slate-50/80",
      )}
    >
      {!notif.isRead && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full" />
      )}

      <div
        className={cn(
          "w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 shadow-sm border transition-transform group-hover:scale-105",
          colorClasses[config.color],
        )}
      >
        {config.icon}
      </div>

      <div className="flex-1 min-w-0 pr-8">
        <div className="flex flex-col gap-1 mb-1">
          <div className="flex items-center gap-2">
            <h4
              className={cn(
                "text-sm font-black uppercase tracking-tight truncate",
                !notif.isRead ? "text-slate-900" : "text-slate-500",
              )}
            >
              {notif.title}
            </h4>
            <Badge
              variant="outline"
              className={cn(
                "text-[9px] font-black h-4 px-1.5 border-none uppercase tracking-widest",
                colorClasses[config.color],
              )}
            >
              {config.label}
            </Badge>
            {!notif.isRead && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </div>
        </div>

        <p className="text-xs leading-relaxed text-slate-500 font-medium line-clamp-2">
          {notif.message}
        </p>

        <span className="text-[10px] font-black text-slate-300 uppercase mt-3 block tracking-[0.15em]">
          {formatDistanceToNow(new Date(notif.createdAt), {
            addSuffix: true,
            locale: id,
          })}
        </span>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(notif.id);
        }}
        className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-all rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50"
      >
        <X size={16} />
      </Button>
    </div>
  );
};
