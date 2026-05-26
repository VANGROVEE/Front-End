import { Leaf } from "lucide-react";

export const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-green-200">
      <Leaf size={18} fill="currentColor" />
    </div>
    <span className="font-black tracking-tighter text-slate-900 uppercase">
      Van<span className="text-green-600">grove</span>
    </span>
  </div>
);
