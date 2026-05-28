"use client";

import Autoplay from "embla-carousel-autoplay";
import {
  CloudRain,
  CloudSun,
  Droplets,
  Leaf,
  MapPin,
  Maximize2,
  Navigation2,
  RefreshCcw,
  ThermometerSun,
  Wind,
} from "lucide-react";
import dynamic from "next/dynamic";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { useSpatialAnalysis } from "../../hooks/useSpatial";
import { DashboardError } from "./DashboardError";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { StatCard } from "./StatCard";

const MapViewer = dynamic(() => import("./MapViewer"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
});

export const Dashboard3D = () => {
  const {
    lands = [],
    summary,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useSpatialAnalysis();

  const [activeCoords, setActiveCoords] = React.useState<
    [number, number] | null
  >(null);

  const plugin = React.useMemo(
    () =>
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  React.useEffect(() => {
    if (lands?.length > 0 && !activeCoords) setActiveCoords(lands[0].position);
  }, [lands, activeCoords]);

  if (isLoading) return <DashboardSkeleton />;
  if (isError) return <DashboardError onRetry={() => refetch()} />;

  const mainLand = lands[0];
  const weatherConfig = ((cond: string = "") => {
    const d = cond.toLowerCase();
    if (d.includes("hujan"))
      return { icon: <CloudRain size={24} />, color: "indigo" as const };
    if (d.includes("awan") || d.includes("mendung"))
      return { icon: <CloudSun size={24} />, color: "blue" as const };
    return { icon: <ThermometerSun size={24} />, color: "orange" as const };
  })(mainLand?.weather?.condition || "");

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 bg-[#f8fafc] min-h-screen font-sans">
      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 border-none shadow-sm">
              Live Satellite Feed
            </Badge>
            {isFetching && (
              <RefreshCcw size={14} className="animate-spin text-emerald-600" />
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter italic">
            TERMINAL{" "}
            <span className="text-emerald-500 not-italic">AGRI-TECH</span>
          </h1>
        </div>
        <Button
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-full h-14 px-8 bg-slate-900 text-white font-bold gap-3 shadow-2xl hover:scale-105 transition-all active:scale-95"
        >
          <RefreshCcw className={cn(isFetching && "animate-spin")} size={18} />
          Sync Satellite
        </Button>
      </header>

      {/* VIEWPORT AREA */}
      <Card className="relative h-[75vh] md:h-[80vh] w-full rounded-[4rem] overflow-hidden border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] bg-white ring-1 ring-slate-200/50">
        {/* LAYER 1: MAP ENGINE */}
        <div className="absolute inset-0 z-0">
          <MapViewer
            centerPosition={activeCoords || mainLand?.position}
            farmLands={lands}
          />
        </div>

        {/* LAYER 2: INTERFACE OVERLAY */}
        <div className="absolute inset-0 z-10 pointer-events-none p-8 md:p-10 flex flex-col justify-between">
          {/* TOP SECTION */}
          <div className="flex justify-between items-start w-full">
            {/* LEFT COLUMN: AMBIENCE & LIST LANDS (SINKRON GLASS TEMA) */}
            <div className="flex flex-col gap-4 max-w-[280px] w-full">
              {/* AMBIENCE CARD */}
              <Card className="pointer-events-auto bg-white/40 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[2.5rem] p-5">
                <div className="flex items-center gap-5">
                  <div className="bg-orange-500 p-4 rounded-[1.8rem] text-white shadow-xl shadow-orange-500/30">
                    <ThermometerSun size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest mb-1 leading-none">
                      Ambient Temp
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900 tracking-tighter">
                        {mainLand?.weather?.temp?.toFixed(0) ?? "--"}°
                      </span>
                      <span className="text-xl font-bold text-slate-400">
                        C
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* LAND LIST PANEL (SUDAH TERANG & SINKRON) */}
              <Card className="pointer-events-auto flex flex-col bg-white/40 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[2.5rem] p-5 max-h-[300px]">
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 leading-none">
                    <MapPin size={14} className="text-emerald-600" /> Aset
                    Terdaftar
                  </h3>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-none text-[9px] font-black">
                    {lands.length} UNIT
                  </Badge>
                </div>
                <ScrollArea className="flex-1 pr-2">
                  <div className="space-y-2">
                    {lands.map((land: any) => {
                      const isActive =
                        activeCoords?.[0] === land.position[0] &&
                        activeCoords?.[1] === land.position[1];
                      return (
                        <button
                          key={land.id}
                          onClick={() => setActiveCoords(land.position)}
                          className={cn(
                            "w-full p-3 rounded-2xl flex items-center justify-between transition-all group border",
                            isActive
                              ? "bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/20"
                              : "bg-white/40 border-transparent hover:bg-white/60 hover:border-white",
                          )}
                        >
                          <div className="text-left overflow-hidden">
                            <p
                              className={cn(
                                "text-[11px] font-black truncate",
                                isActive ? "text-white" : "text-slate-800",
                              )}
                            >
                              {land.name}
                            </p>
                            <p
                              className={cn(
                                "text-[8px] font-bold uppercase",
                                isActive
                                  ? "text-emerald-100"
                                  : "text-slate-400",
                              )}
                            >
                              Papupa Sector
                            </p>
                          </div>
                          <span
                            className={cn(
                              "text-[9px] font-black ml-2 whitespace-nowrap",
                              isActive ? "text-white" : "text-emerald-600",
                            )}
                          >
                            {land.area_ha} Ha
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </Card>
            </div>

            {/* RIGHT COLUMN: QUICK ACTIONS */}
            <div className="flex flex-col gap-4">
              <Button
                size="icon"
                className="pointer-events-auto w-14 h-14 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 text-slate-800 shadow-2xl hover:bg-white transition-all active:scale-90"
              >
                <Maximize2 size={22} />
              </Button>
              <Button
                size="icon"
                onClick={() => mainLand && setActiveCoords(mainLand.position)}
                className="pointer-events-auto w-14 h-14 rounded-3xl bg-emerald-500 text-white shadow-2xl shadow-emerald-500/40 hover:scale-110 transition-all active:scale-95"
              >
                <Navigation2 size={22} fill="currentColor" />
              </Button>
            </div>
          </div>

          {/* BOTTOM SECTION: AUTO CAROUSEL */}
          <div className="pointer-events-auto w-full max-w-6xl mx-auto px-4 mb-2 translate-y-2">
            <Carousel
              plugins={[plugin]}
              className="w-full"
              opts={{ loop: true, align: "start" }}
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                <CarouselItem className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <StatCard
                    icon={<Droplets size={24} />}
                    label="Kelembapan Tanah"
                    value={`${summary?.avg_moisture ?? 0}%`}
                    status={
                      (summary?.critical_lands ?? 0) > 0 ? "Waspada" : "Optimal"
                    }
                    color="blue"
                    isAlert={(summary?.critical_lands ?? 0) > 0}
                  />
                </CarouselItem>
                <CarouselItem className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <StatCard
                    icon={weatherConfig.icon}
                    label="Atmosfer Radar"
                    value={mainLand?.weather?.condition || "Cerah"}
                    status="Live"
                    color={weatherConfig.color}
                  />
                </CarouselItem>
                <CarouselItem className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <StatCard
                    icon={<Leaf size={24} />}
                    label="Komoditas Utama"
                    value={
                      summary?.active_commodities?.[0]?.split(" ").pop() ||
                      "Alba"
                    }
                    status="Sehat"
                    color="emerald"
                  />
                </CarouselItem>
                <CarouselItem className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3">
                  <StatCard
                    icon={<Wind size={24} />}
                    label="Laju Angin"
                    value={`${mainLand?.weather?.wind_speed ?? 0} m/s`}
                    status="Normal"
                    color="blue"
                  />
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </Card>
    </div>
  );
};
