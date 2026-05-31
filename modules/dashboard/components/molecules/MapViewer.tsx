"use client";

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

// --- Custom Icon & Polygon Generator Tetap Sama ---
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const generatePolygonFromArea = (center: [number, number], areaHa: number) => {
  if (!center || !center[0] || !center[1]) return null;
  const sideInMeters = Math.sqrt(areaHa * 10000);
  const offset = sideInMeters / 111320 / 2;
  const [lat, lng] = center;
  return [
    [lat + offset, lng + offset],
    [lat - offset, lng + offset],
    [lat - offset, lng - offset],
    [lat + offset, lng - offset],
  ] as [number, number][];
};

function MapFocusHandler({ land }: { land: any | null }) {
  const map = useMap();
  useEffect(() => {
    if (land?.position?.[0] && land?.position?.[1]) {
      map.flyTo(land.position, 15, { duration: 1.5 });
    }
  }, [land, map]);
  return null;
}

export default function MapViewer({ centerPosition, farmLands = [] }: any) {
  // Memproses data lahan hanya jika farmLands ada isinya
  const renderedLands = useMemo(() => {
    if (!farmLands) return [];
    return farmLands
      .filter(
        (land: any) => land.position && land.position[0] && land.position[1],
      )
      .map((land: any) => ({
        ...land,
        displayPolygon:
          land.polygon_coords?.length > 0
            ? land.polygon_coords
            : generatePolygonFromArea(land.position, land.area_ha),
      }));
  }, [farmLands]);

  const activeLand = useMemo(() => {
    if (!centerPosition || !farmLands) return null;
    return farmLands.find(
      (l: any) =>
        l.position?.[0] === centerPosition?.[0] &&
        l.position?.[1] === centerPosition?.[1],
    );
  }, [centerPosition, farmLands]);

  // Koordinat default (misal tengah Indonesia) jika tidak ada centerPosition
  const defaultCenter: [number, number] = [-2.47, 118.08];

  return (
    <MapContainer
      center={centerPosition || defaultCenter}
      zoom={5} // Zoom lebih jauh jika tidak ada koordinat spesifik
      scrollWheelZoom={true}
      zoomControl={false}
      className="w-full h-full z-0 grayscale-[0.2] contrast-[1.1]"
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
      <ZoomControl position="bottomright" />

      {/* Handler fokus hanya jalan jika ada lahan terpilih */}
      <MapFocusHandler land={activeLand} />

      {/* Render Marker & Polygon hanya jika datanya ada */}
      {renderedLands.map((land: any) => {
        const isCritical = land.health_status === "KRITIS";
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
            <Marker position={land.position} icon={customIcon}>
              <Popup>
                <div className="p-2 text-center">
                  <h4 className="font-bold">{land.name}</h4>
                  <p className="text-xs">{land.area_ha} Ha</p>
                </div>
              </Popup>
            </Marker>
          </div>
        );
      })}
    </MapContainer>
  );
}
