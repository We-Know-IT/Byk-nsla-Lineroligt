import { NextResponse } from "next/server";

const getBackendBaseUrl = () => process.env.BACKEND_URL ?? "http://localhost:4000";

export async function GET() {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/weather`, {
        cache: "no-store",
    });

    const payload: unknown = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { message: "Kunde inte ansluta till backend för väder." },
      },
      { status: 502 },
    );
  }
}
