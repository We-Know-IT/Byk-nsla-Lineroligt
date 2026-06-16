"use client";

import {
  MAP_CATEGORIES,
  type MapCategoryKey,
  type MapCategoryState,
} from "../../../shared/components/map/map-categories";
import EventFilterCheckboxRow from "../../event/components/toolbar/event-filter-checkbox-row";
import EventFilterDropdown from "../../event/components/toolbar/event-filter-dropdown";

type MapCategoryFilterProps = {
  active: MapCategoryState;
  onToggle: (key: MapCategoryKey) => void;
};

export default function MapCategoryFilter({ active, onToggle }: MapCategoryFilterProps) {
  const selectedCount = MAP_CATEGORIES.filter((category) => active[category.key]).length;
  const suffix = selectedCount < MAP_CATEGORIES.length ? ` (${selectedCount})` : undefined;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <EventFilterDropdown label="Kategori" summarySuffix={suffix} size="large">
        <div className="flex flex-col gap-0.5 px-2 py-1">
          {MAP_CATEGORIES.map((category) => {
            const Icon = category.Icon;
            return (
              <EventFilterCheckboxRow
                key={category.key}
                id={`map-category-${category.key}`}
                checked={active[category.key]}
                onSelect={() => onToggle(category.key)}
                label={
                  <span className="flex items-center gap-2">
                    <span
                      className="grid size-5 shrink-0 place-items-center rounded-full text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      <Icon width={12} height={12} />
                    </span>
                    {category.label}
                  </span>
                }
              />
            );
          })}
        </div>
      </EventFilterDropdown>
    </div>
  );
}
