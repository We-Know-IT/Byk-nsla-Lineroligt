"use client";

import { useState } from "react";
import {
  getFrivilligkraftMissions,
  type FrivilligkraftTeaser,
} from "../frivilligkraft-api";
import FrivilligkraftCard from "./frivilligkraft-card";

const formatDate = (isoDate: string | null): string | null => {
  if (!isoDate) {
    return null;
  }

  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
};

type FrivilligkraftMissionListProps = {
  initialMissions: FrivilligkraftTeaser[];
  totalCount: number;
  geoLocationIds: readonly number[];
  pageSize: number;
};

export default function FrivilligkraftMissionList({
  initialMissions,
  totalCount,
  geoLocationIds,
  pageSize,
}: FrivilligkraftMissionListProps) {
  const [missions, setMissions] = useState(initialMissions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMore = missions.length < totalCount;

  const loadMore = async () => {
    setIsLoading(true);
    setError(null);

    const result = await getFrivilligkraftMissions({
      geoLocationIds,
      skip: missions.length,
      take: pageSize,
    });

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
      return;
    }

    setMissions((current) => [...current, ...result.missions]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {missions.map((mission) => (
          <FrivilligkraftCard
            key={mission.id}
            teaser={mission}
            dateLabel={formatDate(mission.startDate)}
          />
        ))}
      </div>

      {error ? (
        <div
          className="max-w-130 rounded-[10px] border border-border bg-surface p-5.5 shadow-[0_1px_2px_rgb(0_0_0/0.07)] [&_p]:m-0 [&_p]:text-[15px] [&_p]:leading-snug [&_p]:text-foreground-muted"
          role="status"
        >
          <p>{error}</p>
        </div>
      ) : null}

      {hasMore ? (
        <div>
          <button
            type="button"
            onClick={loadMore}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-foreground shadow-[0_1px_2px_rgb(0_0_0/0.07)] transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Laddar…" : "Visa fler"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
