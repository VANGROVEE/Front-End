"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocateFixed, RotateCw, Map as MapIcon, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
  lat: string | null;
  lng: string | null;
  areaHectares: number;
  onChange: (lat: string, lng: string) => void;
}

/**
 * Logika Poligon dengan Rotasi
 */
function AreaPolygon({
  lat,
  lng,
  areaHectares,
  rotation = 0,
}: {
  lat: number;
  lng: number;
  areaHectares: number;
  rotation?: number;
}) {
  const polygonPositions = useMemo(() => {
    if (!areaHectares || areaHectares <= 0) return null;
    const meterInDegrees = 1 / 111320;
    const sideLength = Math.sqrt(areaHectares * 10000);
    const d = (sideLength * meterInDegrees) / 2;

    const corners = [
      { relLat: d, relLng: -d },
      { relLat: d, relLng: d },
      { relLat: -d, relLng: d },
      { relLat: -d, relLng: -d },
    ];

    const angleRad = (rotation * Math.PI) / 180;

    return corners.map((c) => {
      const rotatedLat =
        c.relLat * Math.cos(angleRad) - c.relLng * Math.sin(angleRad);
      const rotatedLng =
        c.relLat * Math.sin(angleRad) + c.relLng * Math.cos(angleRad);
      return [lat + rotatedLat, lng + rotatedLng];
    }) as [number, number][];
  }, [lat, lng, areaHectares, rotation]);

  if (!polygonPositions) return null;

  return (
    <Polygon
      positions={polygonPositions}
      pathOptions={{
        color: "#10b981",
        fillColor: "#10b981",
        fillOpacity: 0.25,
        weight: 3,
        dashArray: "6, 8",
      }}
    />
  );
}

function MapController({
  position,
  setPosition,
}: {
  position: L.LatLng | null;
  setPosition: (pos: L.LatLng) => void;
}) {
  const map = useMap();
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom() < 15 ? 17 : map.getZoom(), {
        duration: 1.5,
      });
    }
  }, [position, map]);

  return position === null ? null : <Marker position={position} />;
}

export default function MapPicker({
  lat,
  lng,
  areaHectares,
  onChange,
}: MapPickerProps) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!lat && !lng) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            onChange(
              pos.coords.latitude.toString(),
              pos.coords.longitude.toString(),
            );
          },
          null,
          { enableHighAccuracy: true },
        );
      }
    }
  }, [lat, lng, onChange]);

  const position = useMemo(() => {
    return lat && lng ? new L.LatLng(parseFloat(lat), parseFloat(lng)) : null;
  }, [lat, lng]);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        onChange(
          pos.coords.latitude.toString(),
          pos.coords.longitude.toString(),
        );
      });
    }
  };

  return (
    <TooltipProvider>
      <Card className="relative h-full w-full overflow-hidden border-none shadow-none bg-slate-50 group/map">
        <MapContainer
          center={position || [-1.610122, 103.61312]}
          zoom={15}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution="Esri World Imagery"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />

          <MapController
            position={position}
            setPosition={(pos) =>
              onChange(pos.lat.toString(), pos.lng.toString())
            }
          />

          {position && (
            <AreaPolygon
              lat={position.lat}
              lng={position.lng}
              areaHectares={areaHectares}
              rotation={rotation}
            />
          )}
        </MapContainer>

        {/* --- FLOATING INTERFACE --- */}

        {/* 1. Header Info (Top Left) */}
        <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 pointer-events-none">
          <Badge className="bg-white/90 backdrop-blur text-emerald-700 hover:bg-white/90 border-slate-200 shadow-md py-1.5 px-3 flex items-center gap-2">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider">
              {areaHectares || 0} Ha Terdeteksi
            </span>
          </Badge>
          {position && (
            <Badge
              variant="outline"
              className="w-fit bg-slate-900/80 backdrop-blur text-white border-none text-[9px] font-mono px-2"
            >
              {rotation}° Kemiringan
            </Badge>
          )}
        </div>

        {/* 2. Map Actions (Bottom Right) */}
        <div className="absolute bottom-6 right-6 z-[1000] flex flex-col gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={handleGetLocation}
                className="h-12 w-12 rounded-2xl bg-white shadow-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-slate-100 active:scale-90"
              >
                <LocateFixed size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="bg-slate-900 text-white border-none font-bold text-[10px]"
            >
              Lokasi Saya (GPS)
            </TooltipContent>
          </Tooltip>

          {position && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  size="icon"
                  onClick={() => setRotation((prev) => (prev + 15) % 360)}
                  className="h-12 w-12 rounded-2xl bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 transition-all active:rotate-45"
                >
                  <RotateCw size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="bg-slate-900 text-white border-none font-bold text-[10px]"
              >
                Putar Lahan (15°)
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* 3. Guide (Bottom Left) */}
        <div className="absolute bottom-6 left-6 z-[1000] hidden md:block opacity-0 group-hover/map:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-white shadow-sm">
            <Info size={14} className="text-slate-400" />
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
              Klik peta untuk pindah titik
            </span>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
}
