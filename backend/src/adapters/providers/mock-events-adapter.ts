import type { EventsAdapter, ExternalEvent } from "../contracts/events-adapter.js";

const img = (filename: string) =>
  `/example-images/${encodeURIComponent(filename)}`;

/** Linero-focused demo events; image paths are served from web `public/example-images`. */
const mockEvents: ExternalEvent[] = [
  {
    id: "evt-trygghetsvandring",
    title: "Trygghetsvandring",
    date: "2026-03-12T10:00:00",
    description: "Gemensam vandring i Linero med fokus på trygghet och närhet.",
    locationLabel: "Linero",
    category: "Trygghet",
    imageUrl: img("Vandring.png"),
  },
  {
    id: "evt-skolidrott",
    title: "Skolidrott",
    date: "2026-03-14",
    description: "Prova olika idrotter tillsammans med grannar och skolans förening.",
    locationLabel: "Linero",
    category: "Sport",
    imageUrl: img("Fotboll 1.png"),
  },
  {
    id: "evt-barnteater",
    title: "Barnteater",
    date: "2026-03-16T18:30:00",
    description: "Teaterföreställning för barn och familjer på Linero.",
    locationLabel: "Linero",
    category: "Kultur",
    imageUrl: img("Barnteater.png"),
  },
  {
    id: "evt-marknad",
    title: "Marknad i Linero",
    date: "2026-05-03",
    description: "Lokala aktörer samlas på torget med mat, hantverk och musik.",
    locationLabel: "Linero",
    category: "Kultur",
    imageUrl: img("Matmarknad.png"),
  },
  {
    id: "evt-kvallsvandring",
    title: "Kvällsvandring",
    date: "2026-05-06T19:00:00",
    description: "Gemensam trygghetsvandring i området vid skymningen.",
    locationLabel: "Linero",
    category: "Trygghet",
    imageUrl: img("Promenad.png"),
  },
  {
    id: "evt-seniorfika",
    title: "Seniorfika",
    date: "2026-05-05T15:00:00",
    description: "Fika och samtal för seniorer i lokala lokaler.",
    locationLabel: "Linero",
    category: "Socialt",
    imageUrl: img("Café.png"),
  },
];

export class MockEventsAdapter implements EventsAdapter {
  async getEvents(): Promise<ExternalEvent[]> {
    return mockEvents;
  }
}
