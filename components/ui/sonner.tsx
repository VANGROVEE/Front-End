"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-500" />,
        info: <InfoIcon className="size-4 text-blue-500" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-500" />,
        error: <OctagonXIcon className="size-4 text-rose-500" />,
        loading: <Loader2Icon className="size-4 animate-spin text-slate-500" />,
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--background)",
          "--success-text": "var(--foreground)",
          "--success-border": "var(--border)",
          "--error-bg": "var(--background)",
          "--error-text": "var(--foreground)",
          "--error-border": "var(--border)",
          "--border-radius": "1rem",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast:
            "group toast font-sans flex gap-3 items-center border-l-4 bg-white/80 backdrop-blur-md shadow-lg py-4 px-5 transition-all duration-300",
          title: "text-[13px] font-bold tracking-tight",
          description: "text-[11px] text-slate-500 font-medium leading-relaxed",
          actionButton:
            "bg-slate-900 text-slate-50 text-[10px] font-bold uppercase",
          cancelButton:
            "bg-slate-100 text-slate-900 text-[10px] font-bold uppercase",

          success: "border-l-emerald-500 ring-1 ring-emerald-50",
          error: "border-l-rose-500 ring-1 ring-rose-50",
          warning: "border-l-amber-500 ring-1 ring-amber-50",
          info: "border-l-blue-500 ring-1 ring-blue-50",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
