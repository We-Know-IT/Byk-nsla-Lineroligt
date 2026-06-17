"use client";

import { useCallback, useMemo, useState } from "react";
import SamhallsbyggeMap from "../../../samhallsbygge/components/samhallsbygge-map";
import type { SamhallsbyggeItem } from "../../../samhallsbygge/samhallsbygge-api";
import type { FrivilligkraftTeaser } from "../../../frivilligkraft/frivilligkraft-api";
import type { EventListItem } from "../../event/event-api";
import type {
  MapCategoryKey,
  MapCategoryState,
} from "../../../shared/components/map/map-categories";
import {
  defaultMapDateFilter,
  matchesDateRange,
  type MapDateFilterState,
} from "../../../shared/components/map/map-date-range";
import MapCategoryFilter from "./map-category-filter";
import MapDateFilter from "./map-date-filter";

type StartMapProps = {
  items: SamhallsbyggeItem[];
  missions: FrivilligkraftTeaser[];
  events: EventListItem[];
};

export default function StartMap({ items, missions, events }: StartMapProps) {
  const [active, setActive] = useState<MapCategoryState>({
    bygg: true,
    hjalptill: true,
    event: true,
  });
  const [dateFilter, setDateFilter] = useState<MapDateFilterState>(defaultMapDateFilter());

  const toggle = useCallback((key: MapCategoryKey) => {
    setActive((current) => ({ ...current, [key]: !current[key] }));
  }, []);

  const filteredMissions = useMemo(
    () => missions.filter((mission) => matchesDateRange(mission.startDate, dateFilter)),
    [missions, dateFilter],
  );
  const filteredEvents = useMemo(
    () => events.filter((event) => matchesDateRange(event.date, dateFilter)),
    [events, dateFilter],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <MapCategoryFilter active={active} onToggle={toggle} />
        <MapDateFilter value={dateFilter} onChange={setDateFilter} />
      </div>
      <SamhallsbyggeMap
        items={items}
        frivilligkraftMissions={filteredMissions}
        events={filteredEvents}
        activeCategories={active}
      />
    </div>
  );
}
