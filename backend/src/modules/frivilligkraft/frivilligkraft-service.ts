import type {
  ExternalFrivilligkraftMissionTeaser,
  FrivilligkraftAdapter,
  FrivilligkraftMissionQuery,
} from "../../adapters/contracts/frivilligkraft-adapter.js";

export type FrivilligkraftTeaser = {
  id: string;
  title: string;
  description: string;
  organization: string | null;
  location: string | null;
  frequency: string | null;
  startDate: string | null;
  missionUrl: string;
  imageUrl: string | null;
};

const FRIVILLIGKRAFT_ORIGIN = "https://frivilligkraft.lund.se";
const SHARED_GROUP_LOGO_PREFIX = "/SharedAssets/logo";

const toCleanString = (value: unknown): string | null => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  return null;
};

const readFirstText = (input: unknown, keys: string[]): string | null => {
  if (!input || typeof input !== "object") {
    return null;
  }

  const record = input as Record<string, unknown>;
  for (const key of keys) {
    const value = toCleanString(record[key]);
    if (value) {
      return value;
    }
  }

  return null;
};

const toDescription = (description: string | undefined, ingress: string | undefined): string => {
  const teaser = ingress?.trim();
  if (teaser) {
    return teaser;
  }

  const primary = description?.trim();
  if (primary) {
    return primary;
  }

  return "Ingen beskrivning tillgänglig.";
};

const toLocation = (mission: {
  geoLocations?: { name?: string }[];
  cityArea?: string;
  location?: string;
}): string | null => {
  const geoNames = mission.geoLocations
    ?.map((geoLocation) => geoLocation.name?.trim())
    .filter((name): name is string => Boolean(name));

  const fromGeoLocations = geoNames?.join(", ");
  return fromGeoLocations ?? mission.cityArea?.trim() ?? mission.location?.trim() ?? null;
};

const resolveMissionImageUrl = (raw: unknown): string | null => {
  if (typeof raw !== "string") {
    return null;
  }

  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  try {
    if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
      return new URL(trimmed).href;
    }
    if (trimmed.startsWith("//")) {
      return new URL(`https:${trimmed}`).href;
    }
    if (trimmed.startsWith("/")) {
      return new URL(trimmed, FRIVILLIGKRAFT_ORIGIN).href;
    }
    return new URL(`${SHARED_GROUP_LOGO_PREFIX}/${trimmed}`, FRIVILLIGKRAFT_ORIGIN).href;
  } catch {
    return null;
  }
};

const toTeaser = (mission: ExternalFrivilligkraftMissionTeaser): FrivilligkraftTeaser | null => {
  const id = toCleanString(mission.id);
  const title =
    readFirstText(mission, ["header", "Header", "title", "Title"]) ?? toCleanString(mission.title);
  const teaserDescription = readFirstText(mission, [
    "ingress",
    "Ingress",
    "shortDescription",
    "ShortDescription",
    "teaser",
    "Teaser",
    "summary",
    "Summary",
  ]);
  const longDescription = readFirstText(mission, ["description", "Description"]);

  if (!id || !title) {
    return null;
  }

  return {
    id,
    title,
    description: toDescription(longDescription ?? undefined, teaserDescription ?? undefined),
    organization: mission.group?.name?.trim() ?? mission.originator?.trim() ?? null,
    location: toLocation(mission),
    frequency:
      mission.frequency?.trim() ??
      mission.missionFrequency?.name?.trim() ??
      mission.timeCommitment?.trim() ??
      null,
    startDate: mission.startDate?.trim() ?? null,
    missionUrl: `https://frivilligkraft.lund.se/mission/${id}`,
    imageUrl: resolveMissionImageUrl(mission.group?.image),
  };
};

export class FrivilligkraftService {
  constructor(private readonly adapter: FrivilligkraftAdapter) {}

  async listMissions(
    query: FrivilligkraftMissionQuery,
  ): Promise<{ missions: FrivilligkraftTeaser[]; totalCount: number }> {
    const { data, totalCount } = await this.adapter.getOpenMissions(query);

    const missions = data
      .map(toTeaser)
      .filter((mission): mission is FrivilligkraftTeaser => Boolean(mission));

    return { missions, totalCount };
  }
}
