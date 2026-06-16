import { NextRequest, NextResponse } from "next/server";

const getBackendBaseUrl = () => process.env.BACKEND_URL ?? "http://localhost:4000";

export async function GET(request: NextRequest) {
  try {
    const backendUrl = new URL(`${getBackendBaseUrl()}/api/frivilligkraft/missions`);
    const { searchParams } = request.nextUrl;

    for (const geoLocationId of searchParams.getAll("geoLocationIds")) {
      backendUrl.searchParams.append("geoLocationIds", geoLocationId);
    }

    const skip = searchParams.get("skip");
    if (skip) {
      backendUrl.searchParams.set("skip", skip);
    }

    const take = searchParams.get("take");
    if (take) {
      backendUrl.searchParams.set("take", take);
    }

    const response = await fetch(backendUrl.toString(), { cache: "no-store" });
    const payload: unknown = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { message: "Kunde inte ansluta till backend för frivilligkraft." },
      },
      { status: 502 },
    );
  }
}
