import React from "react";
import { MapPin, Sprout } from "lucide-react";

export default function LandMapSection() {
  return (
    <section id="monitoring" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr,2.5fr] gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-950 mb-6">
            Digitalisasi Lahan Anda
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Visualisasikan distribusi lahan, kepemilikan, dan status siklus
            tanam secara geografis. Pantau kesehatan kolektif wilayah pertanian
            Anda.
          </p>
          <div className="space-y-4">
            <div className="flex gap-3 items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <MapPin className="text-green-600" />
              <span className="font-semibold text-slate-800">
                125+ Lahan Terdaftar
              </span>
            </div>
            <div className="flex gap-3 items-center p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <Sprout className="text-green-600" />
              <span className="font-semibold text-slate-800">
                4 Komoditas Utama
              </span>
            </div>
          </div>
        </div>

        {/* Right Map Placeholder */}
        <div className="aspect-[2/1] bg-slate-50 rounded-[2rem] border border-slate-100 overflow-hidden relative shadow-inner">
          <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold text-3xl">
            Peta Lahan Digital
          </div>
          {/* Decorative Pin */}
          <div className="absolute top-1/2 left-1/3 text-green-600 drop-shadow-lg">
            <MapPin size={40} fill="white" />
          </div>
        </div>
      </div>
    </section>
  );
}
