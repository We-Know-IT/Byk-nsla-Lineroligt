import type { EventsAdapter } from "../contracts/events-adapter.js";
import { MockEventsAdapter } from "../providers/mock-events-adapter.js";

export const getEventsAdapter = (): EventsAdapter => {
  return new MockEventsAdapter();
};
