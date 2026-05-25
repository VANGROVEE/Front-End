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
export const getNotificationStyles = (type: string, title: string) => {
  const iconSize = 16;
  const t = title.toLowerCase();

  if (t.includes("ai") || t.includes("rekomendasi"))
    return {
      icon: <Bot size={iconSize} />,
      color: "text-blue-500",
      bg: "bg-blue-50",
    };
  if (t.includes("panen") || t.includes("siklus") || t.includes("wabah"))
    return {
      icon: <Sprout size={iconSize} />,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    };
  if (t.includes("cuaca"))
    return {
      icon: <CloudRain size={iconSize} />,
      color: "text-sky-500",
      bg: "bg-sky-50",
    };
  if (t.includes("aktivitas"))
    return {
      icon: <CalendarDays size={iconSize} />,
      color: "text-orange-500",
      bg: "bg-orange-50",
    };

  switch (type) {
    case "success":
      return {
        icon: <CheckCircle size={iconSize} />,
        color: "text-emerald-500",
        bg: "bg-emerald-50",
      };
    case "warning":
      return {
        icon: <AlertTriangle size={iconSize} />,
        color: "text-amber-500",
        bg: "bg-amber-50",
      };
    case "error":
      return {
        icon: <AlertCircle size={iconSize} />,
        color: "text-red-500",
        bg: "bg-red-50",
      };
    default:
      return {
        icon: <Info size={iconSize} />,
        color: "text-blue-500",
        bg: "bg-blue-50",
      };
  }
};  