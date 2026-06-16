"use client";

import mapboxgl from "mapbox-gl";

export type AggregateItem = {
  title: string;
  subtitle?: string | null;
  dateLabel?: string | null;
  url: string;
};

type AddAggregateMarkerOptions = {
  items: AggregateItem[];
  center: [number, number];
  color: string;
  iconSvg: string;
  heading: string;
};

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const buildRow = (item: AggregateItem, color: string): string => {
  const title = escapeHtml(item.title);
  const subtitle = item.subtitle ? escapeHtml(item.subtitle) : null;
  const dateLabel = item.dateLabel ? escapeHtml(item.dateLabel) : null;
  const url = escapeHtml(item.url);

  return `
    <li style="padding: 8px 0; border-top: 1px solid #e0e0e0;">
      <p style="margin: 0; font-size: 14px; font-weight: 600; line-height: 1.2; color: #000;">${title}</p>
      ${subtitle ? `<p style="margin: 2px 0 0; font-size: 12px; color: #4e4e4e;">${subtitle}</p>` : ""}
      ${dateLabel ? `<p style="margin: 2px 0 0; font-size: 12px; color: #4e4e4e;">${dateLabel}</p>` : ""}
      <a href="${url}" target="_blank" rel="noreferrer" style="display: inline-block; margin-top: 4px; font-size: 12px; font-weight: 500; color: ${color};">Se mer →</a>
    </li>
  `;
};

const buildPopupHtml = (
  items: AggregateItem[],
  color: string,
  heading: string,
): string => {
  const rows = items.map((item) => buildRow(item, color)).join("");

  return `
    <div style="font-family: system-ui, sans-serif; min-width: 220px; max-width: 280px;">
      <h3 style="margin: 0 0 4px; font-size: 15px; line-height: 1.2; color: #000;">${items.length} ${escapeHtml(heading)}</h3>
      <ul style="margin: 0; padding: 0; list-style: none; max-height: 280px; overflow-y: auto;">
        ${rows}
      </ul>
    </div>
  `;
};

const createMarkerElement = (color: string, iconSvg: string, count: number): HTMLDivElement => {
  const element = document.createElement("div");
  element.style.position = "relative";
  element.style.display = "grid";
  element.style.placeItems = "center";
  element.style.width = "36px";
  element.style.height = "36px";
  element.style.borderRadius = "9999px";
  element.style.border = "2px solid #fff";
  element.style.boxShadow = "0 1px 4px rgb(0 0 0 / 0.3)";
  element.style.backgroundColor = color;
  element.style.cursor = "pointer";
  element.innerHTML = iconSvg;

  const badge = document.createElement("span");
  badge.textContent = String(count);
  badge.style.position = "absolute";
  badge.style.top = "-6px";
  badge.style.right = "-6px";
  badge.style.minWidth = "18px";
  badge.style.height = "18px";
  badge.style.padding = "0 4px";
  badge.style.display = "grid";
  badge.style.placeItems = "center";
  badge.style.borderRadius = "9999px";
  badge.style.border = "2px solid #fff";
  badge.style.backgroundColor = "#000";
  badge.style.color = "#fff";
  badge.style.fontFamily = "system-ui, sans-serif";
  badge.style.fontSize = "11px";
  badge.style.fontWeight = "700";
  badge.style.lineHeight = "1";
  element.appendChild(badge);

  return element;
};

export function addAggregateMarker(
  map: mapboxgl.Map,
  { items, center, color, iconSvg, heading }: AddAggregateMarkerOptions,
): () => void {
  if (items.length === 0) {
    return () => {};
  }

  const element = createMarkerElement(color, iconSvg, items.length);
  const popup = new mapboxgl.Popup({ offset: 22, maxWidth: "300px" }).setHTML(
    buildPopupHtml(items, color, heading),
  );

  const marker = new mapboxgl.Marker(element).setLngLat(center).setPopup(popup).addTo(map);

  return () => {
    marker.remove();
  };
}
