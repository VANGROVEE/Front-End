export const GrowthGauge = ({ value }: { value: number }) => (
  <div className="relative flex flex-col items-center justify-center py-6">
    <svg className="w-32 h-32 transform -rotate-90">
      <circle
        cx="64"
        cy="64"
        r="58"
        stroke="currentColor"
        strokeWidth="8"
        fill="transparent"
        className="text-slate-100"
      />
      <circle
        cx="64"
        cy="64"
        r="58"
        stroke="currentColor"
        strokeWidth="8"
        fill="transparent"
        strokeDasharray={364.4}
        strokeDashoffset={364.4 - (364.4 * value) / 100}
        className="text-green-500 transition-all duration-1000"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-2xl font-black text-slate-800">{value}%</span>
      <span className="text-[10px] font-bold text-slate-400 uppercase">
        Kesehatan
      </span>
    </div>
  </div>
);
