"use client";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const ACCESS_TOKEN =
  "pk.eyJ1IjoibWF6dW5kZSIsImEiOiJjbGJrazd4aWMwMTNwM29wN3prZ2dja3AyIn0.-wPx8orrju3s2kgauEJfDQ";

export default function Page() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [37.9062, 0.0236],
      zoom: 6.5,
    });

    mapRef.current.on("load", () => {
      if (mapRef.current) {
        mapRef.current.addSource("counties", {
          type: "geojson",
          data: "./geojson/counties.geojson",
        });

        mapRef.current.addLayer({
          id: "counties-layer",
          type: "fill",
          source: "counties",
          paint: {
            "fill-color": "#84a98c",
            "fill-opacity": 0,
            "fill-outline-color": "#FFFFFF",
          },
          filter: ["==", "COUNTY_NAM", ""],
        });
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  });

  return (
    <div>
      <div className="w-screen h-screen" id="map" ref={mapContainerRef}></div>
    </div>
  );
}
