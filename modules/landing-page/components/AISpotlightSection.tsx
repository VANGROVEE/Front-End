import React from "react";
import { ArrowRight } from "lucide-react";
import { diseaseSpotlight } from "../data";
import DiseaseCard from "./DiseaseCard";

export default function AISpotlightSection() {
  return (
    <section id="ai-center" className="py-24 px-6 bg-slate-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-950">
            AI Health Insights
          </h2>
          <a
            href="#"
            className="text-green-600 font-semibold flex items-center gap-1.5 group text-sm"
          >
            Lihat Pustaka Penyakit{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {diseaseSpotlight.map((disease, idx) => (
            <DiseaseCard key={idx} disease={disease} />
          ))}
        </div>
      </div>
    </section>
  );
}
