import type {
  ExternalFrivilligkraftMissionPage,
  ExternalFrivilligkraftMissionTeaser,
  FrivilligkraftAdapter,
  FrivilligkraftMissionQuery,
} from "../contracts/frivilligkraft-adapter.js";

const FRIVILLIGKRAFT_MISSION_OPEN_URL = "https://frivilligkraft.lund.se/api/Mission/Open";

export class LiveFrivilligkraftAdapter implements FrivilligkraftAdapter {
  async getOpenMissions({
    geoLocationIds,
    skip,
    take,
  }: FrivilligkraftMissionQuery): Promise<ExternalFrivilligkraftMissionPage> {
    const url = new URL(FRIVILLIGKRAFT_MISSION_OPEN_URL);
    for (const id of geoLocationIds) {
      url.searchParams.append("GeoLocationIds", String(id));
    }
    url.searchParams.set("Skip", String(skip));
    url.searchParams.set("Take", String(take));

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch Frivilligkraft missions: ${response.status} ${response.statusText}`,
      );
    }

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object") {
      throw new Error("Unexpected Frivilligkraft response format");
    }

    const record = payload as { data?: unknown; totalCount?: unknown };
    const data = Array.isArray(record.data)
      ? (record.data as ExternalFrivilligkraftMissionTeaser[])
      : [];
    const totalCount = typeof record.totalCount === "number" ? record.totalCount : data.length;

    return { data, totalCount };
  }
}
