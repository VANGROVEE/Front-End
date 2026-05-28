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

const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

function MapFocusHandler({ land }: { land: any | null }) {
  const map = useMap();

  useEffect(() => {
    if (land?.position) {
      const polyCoords =
        land.polygon_coords?.length > 0
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

export default function MapViewer({ centerPosition, farmLands }: any) {
  const activeLand = useMemo(() => {
    return farmLands.find(
      (l: any) =>
        l.position[0] === centerPosition?.[0] &&
        l.position[1] === centerPosition?.[1],
    );
  }, [centerPosition, farmLands]);

  const renderedLands = useMemo(() => {
    return farmLands.map((land: any) => ({
      ...land,
      displayPolygon:
        land.polygon_coords?.length > 0
          ? land.polygon_coords
          : generatePolygonFromArea(land.position, land.area_ha),
    }));
  }, [farmLands]);

  if (!farmLands || farmLands.length === 0) return null;

  return (
    <MapContainer
      center={centerPosition || [-2.47, 138.08]}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      className="w-full h-full z-0 grayscale-[0.2] contrast-[1.1]"
    >
      <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
      <ZoomControl position="bottomright" />

      <MapFocusHandler land={activeLand} />

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

            {land.position && (
              <Marker position={land.position} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="p-2 min-w-[150px] font-sans text-center">
                    <h4 className="font-black text-slate-800 text-sm">
                      {land.name}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">
                      {land.area_ha.toLocaleString()} Ha
                    </p>
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
