"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { siteConfig } from "../../shared/config/site.config";
import type { FrivilligkraftTeaser } from "../frivilligkraft-api";
import { addFrivilligkraftAggregate } from "./frivilligkraft-map-layer";

type FrivilligkraftMapProps = {
  missions: FrivilligkraftTeaser[];
  center?: [number, number];
};

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function FrivilligkraftMap({
  missions,
  center = siteConfig.geography.center,
}: FrivilligkraftMapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !token || mapRef.current) {
      return;
    }

    mapboxgl.accessToken = token;
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom: 13,
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [center]);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = mapRef.current;
    let isDisposed = false;
    let removeAggregate: (() => void) | null = null;

    const syncMapData = () => {
      removeAggregate = addFrivilligkraftAggregate(map, { missions, center });
    };

    const onMapLoad = () => {
      if (!isDisposed) {
        syncMapData();
      }
    };

    if (map.isStyleLoaded()) {
      syncMapData();
    } else {
      map.on("load", onMapLoad);
    }

    return () => {
      isDisposed = true;
      map.off("load", onMapLoad);
      removeAggregate?.();
    };
  }, [missions, center]);

  if (!token) {
    return (
      <div className="grid min-h-[460px] place-items-center overflow-hidden rounded-[10px] border border-border bg-brand-foreground p-[18px] text-center text-sm text-neutral-600">
        <p>Karta visas här när NEXT_PUBLIC_MAPBOX_TOKEN finns i web/.env.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-[460px] overflow-hidden rounded-[10px] border border-border bg-surface"
    />
  );
}
