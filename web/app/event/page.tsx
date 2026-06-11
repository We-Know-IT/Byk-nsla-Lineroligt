import { getEvents, mapEventListToGridCards } from "../modules/event/event-api";
import { EventPage } from "../modules/event";
import { eventGridCards } from "../modules/event/model/data";

export default async function EventRoutePage() {
  const { events, error } = await getEvents();
  const cards =
    !error && events.length > 0 ? mapEventListToGridCards(events) : eventGridCards;

  return <EventPage cards={cards} listError={error} />;
}
