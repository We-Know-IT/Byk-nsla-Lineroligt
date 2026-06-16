"use client";

import { useCallback, useState } from "react";
import SamhallsbyggeMap from "../../../samhallsbygge/components/samhallsbygge-map";
import type { SamhallsbyggeItem } from "../../../samhallsbygge/samhallsbygge-api";
import type { FrivilligkraftTeaser } from "../../../frivilligkraft/frivilligkraft-api";
import type { EventListItem } from "../../event/event-api";
import type {
  MapCategoryKey,
  MapCategoryState,
} from "../../../shared/components/map/map-categories";
import MapCategoryFilter from "./map-category-filter";

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

  const toggle = useCallback((key: MapCategoryKey) => {
    setActive((current) => ({ ...current, [key]: !current[key] }));
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <MapCategoryFilter active={active} onToggle={toggle} />
      <SamhallsbyggeMap
        items={items}
        frivilligkraftMissions={missions}
        events={events}
        activeCategories={active}
      />
    </div>
  );
}
