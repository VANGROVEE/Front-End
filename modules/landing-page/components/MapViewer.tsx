"use client";

import { Badge } from "@/components/ui/badge";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";

// Fix untuk icon default Leaflet yang sering hilang di Next.js
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

/**
 * Fungsi untuk membuat estimasi poligon kotak berdasarkan luas hektar
 */
const generatePolygonFromArea = (center: [number, number], areaHa: number) => {
  if (!center || !Array.isArray(center) || center.length < 2) return null;

  // 1 Ha = 10.000 m2. Sisi kotak = akar luas.
  const sideInMeters = Math.sqrt((areaHa || 1) * 10000);
  // Konversi kasar meter ke derajat (1 derajat lat ~ 111,320m)
  const offset = sideInMeters / 111320 / 2;
  const [lat, lng] = center;

  return [
    [lat + offset, lng + offset],
    [lat - offset, lng + offset],
    [lat - offset, lng - offset],
    [lat + offset, lng - offset],
  ] as [number, number][];
};

/**
 * Handler untuk memfokuskan kamera peta ke lahan yang terpilih
 */
function MapFocusHandler({ land }: { land: any | null }) {
  const map = useMap();

  useEffect(() => {
    if (land?.position) {
      const polyCoords =
        land.polygon_coords && land.polygon_coords.length > 0
          ? land.polygon_coords
          : generatePolygonFromArea(land.position, land.area_ha);

      if (polyCoords) {
        const bounds = L.latLngBounds(polyCoords);
        map.flyToBounds(bounds, {
          padding: [100, 100],
          duration: 1.5,
          maxZoom: 16,
        });
      } else {
        map.flyTo(land.position, 15, { duration: 1.5 });
      }
    }
  }, [land, map]);

  return null;
}

export default function MapViewer({ centerPosition, lands = [] }: any) {
  // 1. Validasi Input: Pastikan lands selalu berupa array (Mencegah error .find)
  const safeLands = Array.isArray(lands) ? lands : [];

  // 2. Cari Lahan Aktif dengan proteksi optional chaining
  const activeLand = useMemo(() => {
    if (!centerPosition || safeLands.length === 0) return null;
    return safeLands.find(
      (l: any) =>
        l?.position?.[0] === centerPosition[0] &&
        l?.position?.[1] === centerPosition[1],
    );
  }, [centerPosition, safeLands]);

  // 3. Pre-proses data poligon agar tidak dihitung ulang saat render
  const renderedLands = useMemo(() => {
    return safeLands
      .map((land: any) => {
        if (!land?.position) return null;
        return {
          ...land,
          displayPolygon:
            land.polygon_coords && land.polygon_coords.length > 0
              ? land.polygon_coords
              : generatePolygonFromArea(land.position, land.area_ha),
        };
      })
      .filter(Boolean); // Buang data yang null
  }, [safeLands]);

  // Guard clause jika data benar-benar kosong
  if (safeLands.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-xs font-bold uppercase italic">
        Menunggu Sinyal Geospasial...
      </div>
    );
  }

  return (
    <MapContainer
      center={centerPosition || [-6.2, 106.81]}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      className="w-full h-full z-0 grayscale-[0.2] contrast-[1.1]"
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
      <ZoomControl position="bottomright" />

      <MapFocusHandler land={activeLand} />

      {renderedLands.map((land: any) => {
        const isCritical =
          land.health_status === "WARNING" || land.health_status === "KRITIS";

        return (
          <div key={land.id}>
            {land.displayPolygon && (
              <Polygon
                positions={land.displayPolygon}
                pathOptions={{
                  fillColor: isCritical ? "#ef4444" : "#10b981",
                  fillOpacity: 0.3,
                  color: isCritical ? "#b91c1c" : "#059669",
                  weight: 2,
                  dashArray: "5, 10",
                }}
              />
            )}

            {land.position && (
              <Marker position={land.position} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="p-2 min-w-[150px] font-sans text-center">
                    <h4 className="font-black text-slate-800 text-sm">
                      {land.name}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">
                      {land.area_ha?.toLocaleString() || 0} Ha
                    </p>
                    <Badge
                      className={isCritical ? "bg-red-500" : "bg-emerald-500"}
                    >
                      {land.health_status}
                    </Badge>
                  </div>
                </Popup>
              </Marker>
            )}
          </div>
        );
      })}
    </MapContainer>
  );
}
