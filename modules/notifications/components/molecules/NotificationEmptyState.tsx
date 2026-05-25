import { BellOff, Inbox } from "lucide-react";

export const NotificationEmptyState = ({ filter }: { filter: string }) => (
  <div className="flex flex-col items-center justify-center py-24 px-10 text-center animate-in zoom-in duration-300">
    <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mb-6 shadow-inner border border-slate-100">
      {filter === "unread" ? (
        <Inbox size={40} className="text-slate-200" />
      ) : (
        <BellOff size={40} className="text-slate-200" />
      )}
    </div>
    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">
      Kotak Masuk Bersih
    </h3>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 max-w-[200px] leading-relaxed">
      {filter === "unread"
        ? "Semua notifikasi penting sudah Anda tinjau."
        : "Belum ada aktivitas yang masuk ke dalam radar kami."}
    </p>
  </div>
);
