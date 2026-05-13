"use client";

import React from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Sprout,
  Droplets,
  ThermometerSun,
  History,
  Bug,
  Activity,
} from "lucide-react";
import { dataTren, dataLogs, dataWeather } from "../const/data";

export const AnalyticsGrid = () => {
  const getLogIcon = (type: string) => {
    switch (type) {
      case "watering":
        return <Droplets size={14} />;
      case "fertilizing":
        return <Activity size={14} />;
      case "detection":
        return <Bug size={14} />;
      case "planting":
        return <Sprout size={14} />;
      default:
        return <Activity size={14} />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case "watering":
        return "bg-blue-50 text-blue-600";
      case "fertilizing":
        return "bg-orange-50 text-orange-600";
      case "detection":
        return "bg-red-50 text-red-600";
      case "planting":
        return "bg-green-50 text-green-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* 1. Card: Tren Komoditas */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] mb-6">
          Tren Produksi
        </h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataTren}>
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={4}
                dot={{ r: 4, fill: "#16a34a", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Card: Prediksi Cuaca (Dynamic from dummy) */}
      <div className="bg-[#1e293b] p-6 rounded-3xl text-white shadow-xl shadow-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
            Prediksi Cuaca
          </h3>
          <ThermometerSun className="text-amber-400" size={20} />
        </div>
        <div className="space-y-3">
          {dataWeather.map((w, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors p-3 rounded-2xl border border-white/5"
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold">{w.day}</span>
                <span className="text-[10px] text-slate-400">
                  {w.condition}
                </span>
              </div>
              <span className="font-mono font-bold text-green-400">
                {w.temp}°C / {w.humidity}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Card: Log Aktivitas (Dynamic from dummy) */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <History size={18} className="text-slate-400" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">
              Log Aktivitas
            </h3>
          </div>
          <span className="text-[10px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500">
            LIVE
          </span>
        </div>

        <div className="space-y-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
          {dataLogs.map((log) => (
            <div
              key={log.id}
              className="flex gap-4 items-center group cursor-default"
            >
              <div
                className={`p-3 rounded-2xl shrink-0 transition-transform group-hover:scale-110 ${getLogColor(log.type)}`}
              >
                {getLogIcon(log.type)}
              </div>
              <div className="flex-1 border-b border-slate-50 pb-2">
                <p className="font-bold text-slate-800 text-sm leading-tight">
                  {log.task}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Plot {log.plot}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">
                    {log.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
