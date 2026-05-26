import React from "react";
import { features } from "../data";

export default function FeaturesSection() {
  return (
    <section className="py-16 px-6 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex-shrink-0 flex items-center justify-center border border-green-100">
              <feat.icon size={24} />
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-950">{feat.title}</h4>
              <p className="text-sm text-slate-500">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
