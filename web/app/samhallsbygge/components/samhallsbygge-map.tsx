"use client";

import mapboxgl, { type LngLatBoundsLike, type MapMouseEvent } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useMemo, useRef } from "react";
import type { SamhallsbyggeGeometry, SamhallsbyggeItem } from "../samhallsbygge-api";
import type { FrivilligkraftTeaser } from "../../frivilligkraft/frivilligkraft-api";
import { addFrivilligkraftAggregate } from "../../frivilligkraft/components/frivilligkraft-map-layer";
import type { EventListItem } from "../../modules/event/event-api";
import { addEventAggregate } from "../../modules/event/components/event-map-layer";
import { siteConfig } from "../../shared/config/site.config";
import {
  MAP_CATEGORY_BY_KEY,
  type MapCategoryState,
} from "../../shared/components/map/map-categories";

type SamhallsbyggeMapProps = {
  items: SamhallsbyggeItem[];
  frivilligkraftMissions?: FrivilligkraftTeaser[];
  events?: EventListItem[];
  activeCategories?: MapCategoryState;
};

const DEFAULT_CENTER: [number, number] = [13.2422, 55.6944];
const BYGG_COLOR = MAP_CATEGORY_BY_KEY.bygg.color;
const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const createByggMarkerElement = (): HTMLDivElement => {
  const element = document.createElement("div");
  element.style.display = "grid";
  element.style.placeItems = "center";
  element.style.width = "30px";
  element.style.height = "30px";
  element.style.borderRadius = "9999px";
  element.style.border = "2px solid #fff";
  element.style.boxShadow = "0 1px 4px rgb(0 0 0 / 0.3)";
  element.style.backgroundColor = BYGG_COLOR;
  element.style.cursor = "pointer";
  element.innerHTML = MAP_CATEGORY_BY_KEY.bygg.iconSvg;
  return element;
};

const getCoordinatesFromGeometry = (geometry: SamhallsbyggeGeometry): [number, number][] => {
  if (geometry.type === "Point") {
    if (geometry.coordinates.length < 2) {
      return [];
    }
    return [[geometry.coordinates[0], geometry.coordinates[1]]];
  }

  if (geometry.type === "LineString") {
    return geometry.coordinates
      .filter((point) => point.length >= 2)
      .map((point) => [point[0], point[1]] as [number, number]);
  }

  if (geometry.type === "Polygon") {
    return geometry.coordinates.flatMap((ring) =>
      ring.filter((point) => point.length >= 2).map((point) => [point[0], point[1]] as [number, number]),
    );
  }

  return geometry.coordinates.flatMap((polygon) =>
    polygon.flatMap((ring) =>
      ring.filter((point) => point.length >= 2).map((point) => [point[0], point[1]] as [number, number]),
    ),
  );
};

const getCenter = (geometry: SamhallsbyggeGeometry): [number, number] | null => {
  const coordinates = getCoordinatesFromGeometry(geometry);
  if (coordinates.length === 0) {
    return null;
  }
  const sums = coordinates.reduce(
    (acc, [lng, lat]) => {
      return [acc[0] + lng, acc[1] + lat];
    },
    [0, 0],
  );
  return [sums[0] / coordinates.length, sums[1] / coordinates.length];
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildPopupHtml = (item: SamhallsbyggeItem): string => {
  const title = escapeHtml(item.title);
  const category = escapeHtml(item.categoryLabel);
  const status = escapeHtml(item.status);
  const reference = item.reference ? escapeHtml(item.reference) : null;
  const subtitle = item.subtitle ? escapeHtml(item.subtitle) : null;

  return `
    <div style="font-family: system-ui, sans-serif; min-width: 180px;">
      <p style="margin: 0; font-size: 12px; color: #4e4e4e;">${category}</p>
      <h3 style="margin: 4px 0; font-size: 15px; line-height: 1.2;">${title}</h3>
      <p style="margin: 4px 0 0; font-size: 12px; color: #4e4e4e;">Status: ${status}</p>
      ${reference ? `<p style="margin: 2px 0 0; font-size: 12px; color: #4e4e4e;">Ref: ${reference}</p>` : ""}
      ${subtitle ? `<p style="margin: 2px 0 0; font-size: 12px; color: #4e4e4e;">${subtitle}</p>` : ""}
    </div>
  `;
};

const ALL_CATEGORIES_ACTIVE: MapCategoryState = { bygg: true, hjalptill: true, event: true };

export default function SamhallsbyggeMap({
  items,
  frivilligkraftMissions,
  events,
  activeCategories = ALL_CATEGORIES_ACTIVE,
}: SamhallsbyggeMapProps) {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasFittedRef = useRef(false);

  const mapItems = useMemo(() => items.filter((item) => item.geometry), [items]);
  const missions = useMemo(() => frivilligkraftMissions ?? [], [frivilligkraftMissions]);
  const eventItems = useMemo(() => events ?? [], [events]);
  const { bygg: showBygg, hjalptill: showHjalptill, event: showEvent } = activeCategories;

  useEffect(() => {
    if (!containerRef.current || !token || mapRef.current) {
      return;
    }

    mapboxgl.accessToken = token;
    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: DEFAULT_CENTER,
      zoom: 12,
    });
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    const map = mapRef.current;
    let isDisposed = false;
    const markers: mapboxgl.Marker[] = [];
    const polygonLayerIds: string[] = [];
    const polygonSourceIds: string[] = [];
    const cleanupListeners: Array<() => void> = [];

    const syncMapData = () => {
      if (showBygg) {
        for (const item of mapItems) {
          if (!item.geometry) {
            continue;
          }
          const center = getCenter(item.geometry);
          if (center) {
            const markerElement = createByggMarkerElement();
            markerElement.title = item.title;
            const marker = new mapboxgl.Marker(markerElement)
              .setLngLat(center)
              .setPopup(new mapboxgl.Popup({ offset: 18 }).setHTML(buildPopupHtml(item)))
              .addTo(map);
            markers.push(marker);
          }

          if (item.geometry.type === "Polygon" || item.geometry.type === "MultiPolygon") {
            const sourceId = `samhallsbygge-polygon-${item.id}`;
            const fillLayerId = `${sourceId}-fill`;
            const lineLayerId = `${sourceId}-line`;

            map.addSource(sourceId, {
              type: "geojson",
              data: {
                type: "Feature",
                geometry: item.geometry,
                properties: { source: item.source },
              },
            });

            map.addLayer({
              id: fillLayerId,
              type: "fill",
              source: sourceId,
              paint: {
                "fill-color": BYGG_COLOR,
                "fill-opacity": 0.12,
              },
            });

            map.addLayer({
              id: lineLayerId,
              type: "line",
              source: sourceId,
              paint: {
                "line-color": BYGG_COLOR,
                "line-width": 2,
              },
            });

            const openPolygonPopup = (event: MapMouseEvent) => {
              new mapboxgl.Popup({ closeButton: true, closeOnClick: true, maxWidth: "320px" })
                .setLngLat(event.lngLat)
                .setHTML(buildPopupHtml(item))
                .addTo(map);
            };

            const onMouseEnter = () => {
              map.getCanvas().style.cursor = "pointer";
            };
            const onMouseLeave = () => {
              map.getCanvas().style.cursor = "";
            };

            map.on("click", fillLayerId, openPolygonPopup);
            map.on("mouseenter", fillLayerId, onMouseEnter);
            map.on("mouseleave", fillLayerId, onMouseLeave);

            cleanupListeners.push(() => {
              map.off("click", fillLayerId, openPolygonPopup);
              map.off("mouseenter", fillLayerId, onMouseEnter);
              map.off("mouseleave", fillLayerId, onMouseLeave);
            });

            polygonSourceIds.push(sourceId);
            polygonLayerIds.push(fillLayerId, lineLayerId);
          }
        }
      }

      if (showHjalptill && missions.length > 0) {
        const removeAggregate = addFrivilligkraftAggregate(map, {
          missions,
          center: siteConfig.geography.center,
        });
        cleanupListeners.push(removeAggregate);
      }

      if (showEvent && eventItems.length > 0) {
        const removeAggregate = addEventAggregate(map, {
          events: eventItems,
          center: siteConfig.geography.center,
        });
        cleanupListeners.push(removeAggregate);
      }

      if (!hasFittedRef.current) {
        const { minLng, minLat, maxLng, maxLat } = siteConfig.geography.bounds;
        const bounds = new mapboxgl.LngLatBounds(
          [minLng, minLat],
          [maxLng, maxLat],
        );
        map.fitBounds(bounds as LngLatBoundsLike, { padding: 15, maxZoom: 14 });
        hasFittedRef.current = true;
      }
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
      if (mapRef.current !== map) {
        return;
      }
      for (const cleanup of cleanupListeners) {
        cleanup();
      }
      for (const marker of markers) {
        marker.remove();
      }
      for (const layerId of polygonLayerIds) {
        if (map.getLayer(layerId)) {
          map.removeLayer(layerId);
        }
      }
      for (const sourceId of polygonSourceIds) {
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        }
      }
    };
  }, [mapItems, missions, eventItems, showBygg, showHjalptill, showEvent]);

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
