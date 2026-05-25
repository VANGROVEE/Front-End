import { History } from "lucide-react";

export const EmptyState = ({ message }: { message: string }) => (
  <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/30">
    <History size={32} className="mx-auto text-slate-200 mb-4" />
    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
      {message}
    </p>
  </div>
);