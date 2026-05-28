import { siteConfig } from "../../../shared/config/site.config";

export type SpotlightCardData = {
  id: string;
  title: string;
  text: string;
  cta: string;
  imageSrc?: string;
};

export type StartCoverData = {
  title: string;
  text: string;
  imageSrc: string;
};

export type EventCardData = {
  id: string;
  title: string;
  date?: string;
  text: string;
  cta: string;
  imageSrc?: string;
  eventUrl?: string;
};

export const sectionDescription = siteConfig.startPage.sectionDescription;

export const startCover: StartCoverData = siteConfig.startPage.cover;

export const spotlightCards: SpotlightCardData[] = Array.from(
  { length: 3 },
  (_, index) => ({
    id: `spotlight-${index + 1}`,
    title: "Rubrik",
    text: "Lorem ipsum dolor sit amet consectetur...",
    cta: "Knapp",
  }),
);

export const cityCards: EventCardData[] = [
  {
    id: "city-1",
    title: "Rubrik",
    text: "In nulla in fames ut velit ridiculus vulputate.",
    cta: "Knapp",
    imageSrc: "/example-images/Barnteater.png",
  },
  {
    id: "city-2",
    title: "Rubrik",
    text: "In nulla in fames ut velit ridiculus vulputate.",
    cta: "Knapp",
    imageSrc: "/example-images/Bowling.png",
  },
  {
    id: "city-3",
    title: "Rubrik",
    text: "In nulla in fames ut velit ridiculus vulputate.",
    cta: "Knapp",
    imageSrc: "/example-images/Barnteater.png",
  },
  {
    id: "city-4",
    title: "Rubrik",
    text: "In nulla in fames ut velit ridiculus vulputate.",
    cta: "Knapp",
    imageSrc: "/example-images/Bowling.png",
  },
  {
    id: "city-5",
    title: "Rubrik",
    text: "In nulla in fames ut velit ridiculus vulputate.",
    cta: "Knapp",
  },
  {
    id: "city-6",
    title: "Rubrik",
    text: "In nulla in fames ut velit ridiculus vulputate.",
    cta: "Knapp",
  },
];
