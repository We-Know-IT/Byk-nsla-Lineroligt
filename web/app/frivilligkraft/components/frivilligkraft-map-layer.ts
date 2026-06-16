"use client";

import mapboxgl from "mapbox-gl";
import { addAggregateMarker } from "../../shared/components/map/aggregate-marker";
import { MAP_CATEGORY_BY_KEY } from "../../shared/components/map/map-categories";
import type { FrivilligkraftTeaser } from "../frivilligkraft-api";

type AddFrivilligkraftAggregateOptions = {
  missions: FrivilligkraftTeaser[];
  center: [number, number];
};

const formatDate = (isoDate: string | null): string | null => {
  if (!isoDate) {
    return null;
  }

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

export function addFrivilligkraftAggregate(
  map: mapboxgl.Map,
  { missions, center }: AddFrivilligkraftAggregateOptions,
): () => void {
  const category = MAP_CATEGORY_BY_KEY.hjalptill;

  return addAggregateMarker(map, {
    items: missions.map((mission) => ({
      title: mission.title,
      subtitle: mission.organization,
      dateLabel: formatDate(mission.startDate),
      url: mission.missionUrl,
    })),
    center,
    color: category.color,
    iconSvg: category.iconSvg,
    heading: "frivilliguppdrag",
  });
}
