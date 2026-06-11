"use client";

import { useMemo, useState } from "react";
import type { EventGridCardData } from "../model/data";
import {
  type TimeSlotFilter,
  filterEventCards,
  uniqueCategories,
  uniqueLocations,
} from "../model/filter-events";
import EventGridCard from "./event-grid-card";
import EventToolbar from "./event-toolbar";

type EventListingClientProps = {
  cards: EventGridCardData[];
};

export default function EventListingClient({ cards }: EventListingClientProps) {
  const [searchDraft, setSearchDraft] = useState("");
  const [searchApplied, setSearchApplied] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [timeSlot, setTimeSlot] = useState<TimeSlotFilter>("all");

  const locationOptions = useMemo(() => uniqueLocations(cards), [cards]);
  const categoryOptions = useMemo(() => uniqueCategories(cards), [cards]);

  const criteria = useMemo(
    () => ({
      search: searchApplied,
      locations: selectedLocations,
      categories: selectedCategories,
      timeSlot,
    }),
    [searchApplied, selectedLocations, selectedCategories, timeSlot],
  );

  const filteredCards = useMemo(() => filterEventCards(cards, criteria), [cards, criteria]);

  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((x) => x !== loc) : [...prev, loc],
    );
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((x) => x !== cat) : [...prev, cat],
    );
  };

  return (
    <>
      <EventToolbar
        locationOptions={locationOptions}
        categoryOptions={categoryOptions}
        searchDraft={searchDraft}
        onSearchDraftChange={setSearchDraft}
        onSearchSubmit={() => setSearchApplied(searchDraft.trim())}
        selectedLocations={selectedLocations}
        onToggleLocation={toggleLocation}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
        timeSlot={timeSlot}
        onTimeSlotChange={setTimeSlot}
      />

      <div className="grid grid-cols-5 gap-3 max-[1300px]:grid-cols-4 max-[980px]:grid-cols-2">
        {filteredCards.length === 0 ? (
          <p className="col-span-full m-0 px-2 py-5 text-center text-[15px] text-foreground-muted">
            Inga evenemang matchar dina val.
          </p>
        ) : (
          filteredCards.map((card) => <EventGridCard key={card.id} card={card} />)
        )}
      </div>
    </>
  );
}
