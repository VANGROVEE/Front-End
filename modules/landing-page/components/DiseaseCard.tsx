import React from "react";
import { Star, Plus } from "lucide-react";
import { Feature, Disease } from "../types";

interface DiseaseCardProps {
  disease: Disease;
}

export default function DiseaseCard({ disease }: DiseaseCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col group">
      {/* Image Placeholder */}
      <div className="aspect-square bg-slate-100 rounded-2xl mb-6 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold text-lg">
          Penyakit
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-950 mb-1">{disease.name}</h3>
      <p className="text-xs text-slate-400 italic mb-4 font-mono">
        {disease.scientific}
      </p>

      {/* Confidence Score */}
      <div className="flex items-center gap-1 mb-5 text-yellow-500">
        {[...Array(Math.round(disease.score * 5))].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
        <span className="text-xs text-slate-500 ml-1 font-mono">
          ({(disease.score * 100).toFixed(1)}%)
        </span>
      </div>

      {/* Footer */}
      <div className="mt-auto flex justify-between items-center border-t border-slate-100 pt-5">
        <p className="text-sm font-semibold text-green-700">
          {disease.treatment}
        </p>
        <button className="bg-slate-50 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-green-600 group-hover:text-white transition">
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
