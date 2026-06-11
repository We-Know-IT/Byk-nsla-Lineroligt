import type { EventsAdapter } from "../../adapters/contracts/events-adapter.js";

export class EventsService {
  constructor(private readonly adapter: EventsAdapter) {}

  async listEvents() {
    const events = await this.adapter.getEvents();
    return events.map((event) => ({
      id: event.id,
      title: event.title,
      date: event.date,
      description: event.description,
      imageUrl: event.imageUrl,
      url: event.url,
      locationLabel: event.locationLabel,
      category: event.category,
    }));
  }
}
