/**
 * Site branding and copy — edit this file when forking or deploying for a new municipality.
 * Keep asset files in `/web/public` and reference them with root-relative paths (e.g. `/brand/logo.svg`).
 */

/** Sidebar nav entry: `path` may omit the leading slash; `iconSrc` points to `public/` (e.g. `/icons/start.svg`). */
export type SiteNavItem = {
  readonly key: string;
  readonly label: string;
  readonly path: string;
  readonly enabled: boolean;
  readonly iconSrc?: string | null;
};

export const siteNavigation = [
  { key: "start", label: "Start", path: "/", enabled: true, iconSrc: "/icons/home.svg" },
  { key: "pagang", label: "På gång", path: "/event", enabled: true, iconSrc: "/icons/calendar.svg" },
  { key: "hjalptill", label: "Hjälp till", path: "/hjalptill", enabled: true, iconSrc: "/icons/heart.svg" },
  { key: "bygg", label: "Bygg & utveckling", path: "/bygg", enabled: true, iconSrc: "/icons/hammer.svg" },
  { key: "utforska", label: "Utforska", path: "/utforska", enabled: true, iconSrc: "/icons/map.svg" },
  { key: "trafik", label: "Trafik", path: "/trafik", enabled: true, iconSrc: "/icons/train.svg" },
  { key: "vader", label: "Väder", path: "/vader", enabled: true, iconSrc: "/icons/sun-light.svg" },
] as const satisfies readonly SiteNavItem[];

export type ModuleKey = (typeof siteNavigation)[number]["key"];

/** Turns config paths into Next.js hrefs (`event` → `/event`, empty → `/`). */
export function normalizeNavPath(path: string): string {
  const trimmed = path.trim();
  if (trimmed === "" || trimmed === "/") {
    return "/";
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

/** Semantic palette; maps to CSS custom properties injected on `<html>`. */
export type SiteTheme = {
  background: string;
  surface: string;
  border: string;
  foreground: string;
  foregroundMuted: string;
  brandPrimary: string;
  brandSecondary: string;
  brandThird: string;
  brandForeground: string;
};

const siteTheme = {
  background: "#FAFAFA",
  surface: "#FAFAFA",
  border: "#E0E0E0",
  foreground: "#000000",
  foregroundMuted: "#4E4E4E",
  brandPrimary: "#461F01",
  brandSecondary: "#D25E06",
  brandThird: "#FDA664",
  brandForeground: "#FFF7F2",
} as const satisfies SiteTheme;

/** Values for `style` on `<html>` (React/CSS custom properties). */
export function siteThemeCssVars(theme: SiteTheme): Record<string, string> {
  return {
    "--background": theme.background,
    "--surface": theme.surface,
    "--border": theme.border,
    "--foreground": theme.foreground,
    "--foreground-muted": theme.foregroundMuted,
    "--brand-primary": theme.brandPrimary,
    "--brand-secondary": theme.brandSecondary,
    "--brand-third": theme.brandThird,
    "--brand-foreground": theme.brandForeground,
  };
}

export const siteConfig = {
  /** Shown in the top bar, document title, and other UI */
  name: "Linero",

  htmlLang: "sv",

  metadata: {
    title: "Linero",
    description: "Din stadsdel i Lund",
  },

  brand: {
    /**
     * Shown in the square mark when `markImageSrc` is not set.
     * Use one character for the default layout, or a short abbreviation.
     */
    markLetter: "L",
    /**
     * Optional image for the square mark (path under `public/`).
     * When set, this replaces the letter mark.
     */
    markImageSrc: null as string | null,
  },

  labels: {
    logout: "Logga ut",
    underConstruction: "Den här sidan är under konstruktion.",
  },

  /**
   * Local area name used in headings (e.g. "Vad händer i …").
   */
  areaName: "Linero",

  /**
   * Playful or campaign-style area name used in marketing copy.
   * Example: areaName=Linero -> areaPlayfulName=Lineroligt.
   */
  areaPlayfulName: "Lineroligt",

  /**
   * Startsida copy/content. Keep all editable start-page text and media here.
   */
  startPage: {
    sectionDescription: "Kort introduktionstext under varje sektion — anpassa i site.config.ts.",
    cover: {
      title: "Lineroligt finns här för dig",
      text: "Lorem ipsum dolor sit amet consectetur. Nulla molestie quis aliquet lacus aliquam sit. Pretium ut lectus et accumsan.",
      imageSrc: "/example-images/stad.jpg",
    },
  },

  /**
   * Frivilligkraft (volunteer missions) configuration.
   * `geoLocationIds` filters Mission/Open to this area — Linero is GeoLocationId 23.
   */
  frivilligkraft: {
    geoLocationIds: [23] as readonly number[],
    startTeaserCount: 3,
    pageSize: 20,
  },

  /**
   * Geography configuration for the local area.
   * Used to filter events and items to this specific area.
   */
  geography: {
    // Linero, Lund — center near Linero torg / stadsdelen
    center: [13.2422, 55.6944] as [number, number], // [longitude, latitude]
    maxDistanceKm: 4,
    bounds: {
      minLng: 13.21,
      maxLng: 13.27,
      minLat: 55.68,
      maxLat: 55.71,
    },
    keywords: [
      "linero",
      "linero torg",
      "lund",
      "östra lund",
      "vikingaskolan",
      "gastelyckan",
    ],
  },

  /** Core UI colors — applied in root layout as CSS variables. */
  theme: siteTheme,

  /** Left sidebar links — single source of truth for routes and optional icons. */
  navigation: siteNavigation,
} as const;

export type SiteConfig = typeof siteConfig;
