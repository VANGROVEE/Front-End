export const TableDailyHarvest = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-2">
      <span>Product</span>
      <span>Collected</span>
      <span>Remaining</span>
      <span>Tracking</span>
    </div>
    {/* Baris data dummy */}
    <div className="grid grid-cols-4 items-center py-2">
      <span className="text-sm font-bold flex items-center gap-2">
        🍎 Apple
      </span>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-[80%] h-full bg-emerald-500" />
        </div>
        <span className="text-xs font-bold text-slate-500">720</span>
      </div>
      <span className="text-xs font-bold">180 crt</span>
      <button className="text-slate-300 hover:text-emerald-500">▶️</button>
    </div>
  </div>
);
