"use client";

import mapboxgl from "mapbox-gl";
import { addAggregateMarker } from "../../../shared/components/map/aggregate-marker";
import { MAP_CATEGORY_BY_KEY } from "../../../shared/components/map/map-categories";
import type { EventListItem } from "../event-api";

type AddEventAggregateOptions = {
  events: EventListItem[];
  center: [number, number];
};

const formatDate = (value: string): string | null => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value || null;
  }

  const hasTime = value.includes("T") && /\d{2}:\d{2}/.test(value);
  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    ...(hasTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(parsed);
};

export function addEventAggregate(
  map: mapboxgl.Map,
  { events, center }: AddEventAggregateOptions,
): () => void {
  const category = MAP_CATEGORY_BY_KEY.event;
  const offsetCenter: [number, number] = [center[0] + 0.006, center[1] + 0.0015];

  return addAggregateMarker(map, {
    items: events.map((event) => ({
      title: event.title,
      subtitle: event.locationLabel ?? null,
      dateLabel: formatDate(event.date),
      url: event.url ?? "/event",
    })),
    center: offsetCenter,
    color: category.color,
    iconSvg: category.iconSvg,
    heading: "evenemang",
  });
}
