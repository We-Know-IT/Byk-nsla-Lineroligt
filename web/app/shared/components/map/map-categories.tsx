import type { SVGProps } from "react";

export type MapCategoryKey = "hjalptill" | "event" | "bygg";

export type MapCategoryState = {
  bygg: boolean;
  hjalptill: boolean;
  event: boolean;
};

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 10V6C3 4.89543 3.89543 4 5 4H7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 2V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HammerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M10.6338 11.0554L2.14851 19.5407L4.26983 21.662L12.7551 13.1767"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6337 11.0553L12.0479 9.64112C12.0479 9.64112 12.4015 6.45914 8.86595 2.9236L9.92661 1.86294L18.4119 7.5198L17.3512 8.58046L18.7654 9.99467L19.8261 8.93401L22.301 11.4089L17.3512 16.3586L14.8764 13.8838L15.937 12.8231L14.5228 11.4089L12.755 13.1767L10.6337 11.0553Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const HEART_SVG =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/></svg>';

const CALENDAR_SVG =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 10V6C3 4.89543 3.89543 4 5 4H7" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 2V6" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const HAMMER_SVG =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6338 11.0554L2.14851 19.5407L4.26983 21.662L12.7551 13.1767" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M10.6337 11.0553L12.0479 9.64112C12.0479 9.64112 12.4015 6.45914 8.86595 2.9236L9.92661 1.86294L18.4119 7.5198L17.3512 8.58046L18.7654 9.99467L19.8261 8.93401L22.301 11.4089L17.3512 16.3586L14.8764 13.8838L15.937 12.8231L14.5228 11.4089L12.755 13.1767L10.6337 11.0553Z" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export type MapCategory = {
  key: MapCategoryKey;
  label: string;
  color: string;
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element;
  iconSvg: string;
};

export const MAP_CATEGORIES: readonly MapCategory[] = [
  { key: "hjalptill", label: "Hjälp till", color: "#4B5B4D", Icon: HeartIcon, iconSvg: HEART_SVG },
  { key: "event", label: "Event", color: "#D18262", Icon: CalendarIcon, iconSvg: CALENDAR_SVG },
  {
    key: "bygg",
    label: "Bygg & utveckling",
    color: "#81B1CD",
    Icon: HammerIcon,
    iconSvg: HAMMER_SVG,
  },
] as const;

export const MAP_CATEGORY_BY_KEY: Record<MapCategoryKey, MapCategory> = {
  hjalptill: MAP_CATEGORIES[0],
  event: MAP_CATEGORIES[1],
  bygg: MAP_CATEGORIES[2],
};
