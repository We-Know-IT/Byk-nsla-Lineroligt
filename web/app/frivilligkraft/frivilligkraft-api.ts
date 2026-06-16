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

type FrivilligkraftMissionPage = {
  items: FrivilligkraftTeaser[];
  totalCount: number;
};

type FrivilligkraftApiSuccess = {
  success: true;
  data: FrivilligkraftMissionPage;
};

type FrivilligkraftApiError = {
  success: false;
  error: {
    message: string;
  };
};

type FrivilligkraftApiResponse = FrivilligkraftApiSuccess | FrivilligkraftApiError;

export type FrivilligkraftMissionParams = {
  geoLocationIds: readonly number[];
  skip: number;
  take: number;
};

const getAppBaseUrl = () => process.env.APP_URL ?? "http://localhost:3000";

const buildMissionsUrl = ({ geoLocationIds, skip, take }: FrivilligkraftMissionParams): string => {
  const params = new URLSearchParams();
  for (const id of geoLocationIds) {
    params.append("geoLocationIds", String(id));
  }
  params.set("skip", String(skip));
  params.set("take", String(take));

  const base = typeof window === "undefined" ? getAppBaseUrl() : "";
  return `${base}/api/frivilligkraft/missions?${params.toString()}`;
};

export async function getFrivilligkraftMissions(params: FrivilligkraftMissionParams): Promise<{
  missions: FrivilligkraftTeaser[];
  totalCount: number;
  error: string | null;
}> {
  try {
    const response = await fetch(buildMissionsUrl(params), { cache: "no-store" });

    const payload: FrivilligkraftApiResponse = await response.json();

    if (!response.ok || !payload.success) {
      return {
        missions: [],
        totalCount: 0,
        error: payload.success ? "Kunde inte hämta frivilligkraftsdata." : payload.error.message,
      };
    }

    return { missions: payload.data.items, totalCount: payload.data.totalCount, error: null };
  } catch {
    return {
      missions: [],
      totalCount: 0,
      error: "Kunde inte ansluta till frivilligkraftstjänsten just nu.",
    };
  }
}
