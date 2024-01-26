"use client";
import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const GMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let map;

    async function initMap(): Promise<void> {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string,
        version: "weekly",
        libraries: ["places"],
      });

      const position = { lat: 23.87714970917207, lng: 90.38635264781684 };

      const { Map } = (await loader.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      const { AdvancedMarkerElement } = (await loader.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      map = new Map(mapRef.current as HTMLDivElement, {
        zoom: 14,
        center: position,
        mapId: "MY_NEXTJS_MAP",
      });

      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "M. Islam location",
      });
    }
    initMap();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left">Locate me on map</CardTitle>
      </CardHeader>
      <CardContent ref={mapRef} className="h-[350px]"></CardContent>
    </Card>
  );
};

export default GMap;
