import type { EventsAdapter, ExternalEvent } from "../contracts/events-adapter.js";

const mockEvents: ExternalEvent[] = [
  {
    id: "evt-1",
    title: "Marknad i Linero",
    date: "2026-05-03",
    description: "Lokala aktörer samlas på torget.",
  },
  {
    id: "evt-2",
    title: "Kvällsvandring",
    date: "2026-05-06",
    description: "Gemensam trygghetsvandring i området.",
  },
];

export class MockEventsAdapter implements EventsAdapter {
  async getEvents(): Promise<ExternalEvent[]> {
    return mockEvents;
  }
}
