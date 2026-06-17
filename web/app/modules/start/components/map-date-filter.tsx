"use client";

import {
  DATE_RANGE_PRESETS,
  dateFilterSummary,
  type MapDateFilterState,
} from "../../../shared/components/map/map-date-range";
import EventFilterCheckboxRow from "../../event/components/toolbar/event-filter-checkbox-row";
import EventFilterDropdown from "../../event/components/toolbar/event-filter-dropdown";

type MapDateFilterProps = {
  value: MapDateFilterState;
  onChange: (next: MapDateFilterState) => void;
};

export default function MapDateFilter({ value, onChange }: MapDateFilterProps) {
  const handlePreset = (preset: MapDateFilterState["preset"]) => {
    onChange({ preset, from: null, to: null });
  };

  const handleCustom = (edge: "from" | "to", next: string) => {
    onChange({
      preset: "custom",
      from: edge === "from" ? next || null : value.from,
      to: edge === "to" ? next || null : value.to,
    });
  };

  return (
    <EventFilterDropdown label="Datum" summarySuffix={dateFilterSummary(value)} size="large">
      <div className="flex flex-col gap-0.5 px-2 py-1">
        {DATE_RANGE_PRESETS.map((option) => (
          <EventFilterCheckboxRow
            key={option.value}
            id={`map-date-${option.value}`}
            checked={value.preset === option.value}
            onSelect={() => handlePreset(option.value)}
            label={option.label}
          />
        ))}

        <div className="mt-1 border-t border-black/10 px-2 pt-2">
          <p className="mb-1.5 text-xs font-medium text-[#4e4e4e]">Egen period</p>
          <div className="flex flex-col gap-1.5">
            <label className="flex items-center justify-between gap-2 text-sm text-[#111]">
              <span>Från</span>
              <input
                type="date"
                value={value.preset === "custom" ? (value.from ?? "") : ""}
                max={value.to ?? undefined}
                onChange={(event) => handleCustom("from", event.target.value)}
                className="rounded-md border border-[#c4c4c4] bg-white px-2 py-1 text-sm text-[#111]"
              />
            </label>
            <label className="flex items-center justify-between gap-2 text-sm text-[#111]">
              <span>Till</span>
              <input
                type="date"
                value={value.preset === "custom" ? (value.to ?? "") : ""}
                min={value.from ?? undefined}
                onChange={(event) => handleCustom("to", event.target.value)}
                className="rounded-md border border-[#c4c4c4] bg-white px-2 py-1 text-sm text-[#111]"
              />
            </label>
          </div>
        </div>
      </div>
    </EventFilterDropdown>
  );
}
