export type DateRangePreset =
  | "all"
  | "today"
  | "week"
  | "month"
  | "upcoming"
  | "custom";

export type MapDateFilterState = {
  preset: DateRangePreset;
  /** Inclusive start date as `YYYY-MM-DD`, only used when `preset === "custom"`. */
  from: string | null;
  /** Inclusive end date as `YYYY-MM-DD`, only used when `preset === "custom"`. */
  to: string | null;
};

export type ResolvedDateRange = {
  start: Date | null;
  end: Date | null;
};

export const DATE_RANGE_PRESETS: { value: DateRangePreset; label: string }[] = [
  { value: "all", label: "Alla datum" },
  { value: "today", label: "Idag" },
  { value: "week", label: "Denna vecka" },
  { value: "month", label: "Denna månad" },
  { value: "upcoming", label: "Kommande" },
];

export function defaultMapDateFilter(): MapDateFilterState {
  return { preset: "all", from: null, to: null };
}

const startOfDay = (date: Date): Date => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

const endOfDay = (date: Date): Date => {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
};

/** End of the ISO-style week (Sunday) containing `date`. */
const endOfWeek = (date: Date): Date => {
  const day = date.getDay();
  const daysUntilSunday = (7 - day) % 7;
  const sunday = new Date(date);
  sunday.setDate(date.getDate() + daysUntilSunday);
  return endOfDay(sunday);
};

const endOfMonth = (date: Date): Date => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return endOfDay(lastDay);
};

const parseDateOnly = (value: string | null, edge: "start" | "end"): Date | null => {
  if (!value) {
    return null;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return edge === "start" ? startOfDay(parsed) : endOfDay(parsed);
};

export function resolveDateRange(
  state: MapDateFilterState,
  now: Date = new Date(),
): ResolvedDateRange {
  switch (state.preset) {
    case "all":
      return { start: null, end: null };
    case "today":
      return { start: startOfDay(now), end: endOfDay(now) };
    case "week":
      return { start: startOfDay(now), end: endOfWeek(now) };
    case "month":
      return { start: startOfDay(now), end: endOfMonth(now) };
    case "upcoming":
      return { start: startOfDay(now), end: null };
    case "custom":
      return {
        start: parseDateOnly(state.from, "start"),
        end: parseDateOnly(state.to, "end"),
      };
    default:
      return { start: null, end: null };
  }
}

export function matchesDateRange(iso: string | null, state: MapDateFilterState): boolean {
  if (state.preset === "all") {
    return true;
  }

  if (!iso) {
    return false;
  }
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  const { start, end } = resolveDateRange(state);
  if (start && parsed < start) {
    return false;
  }
  if (end && parsed > end) {
    return false;
  }
  return true;
}

const formatCustomDate = (value: string | null): string | null => {
  const parsed = parseDateOnly(value, "start");
  if (!parsed) {
    return null;
  }
  return new Intl.DateTimeFormat("sv-SE", { day: "numeric", month: "short" }).format(parsed);
};

export function dateFilterSummary(state: MapDateFilterState): string | undefined {
  if (state.preset === "all") {
    return undefined;
  }

  if (state.preset === "custom") {
    const from = formatCustomDate(state.from);
    const to = formatCustomDate(state.to);
    if (from && to) {
      return ` · ${from}–${to}`;
    }
    if (from) {
      return ` · från ${from}`;
    }
    if (to) {
      return ` · till ${to}`;
    }
    return " · Egen";
  }

  const preset = DATE_RANGE_PRESETS.find((option) => option.value === state.preset);
  return preset ? ` · ${preset.label}` : undefined;
}
