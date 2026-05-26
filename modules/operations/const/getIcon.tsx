import {
  CalendarIcon,
  ClipboardList,
  Droplets,
  PenLine,
  Scale,
  Sprout,
} from "lucide-react";

export const getIconForField = (type: string, fieldId: string) => {
  const props = {
    size: 18,
    className:
      "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10 transition-colors group-focus-within:text-green-600",
  };

  if (type === "textarea" || fieldId.includes("notes")) {
    return (
      <PenLine
        size={18}
        className="absolute left-4 top-4 text-slate-400 z-10 group-focus-within:text-green-600"
      />
    );
  }
  if (type === "select" || fieldId.includes("type"))
    return <ClipboardList {...props} />;
  if (fieldId.includes("date")) return <CalendarIcon {...props} />;
  if (fieldId.includes("yield") || fieldId.includes("amount"))
    return <Scale {...props} />;
  if (fieldId.includes("unit")) return <Droplets {...props} />;
  return <Sprout {...props} />;
};
