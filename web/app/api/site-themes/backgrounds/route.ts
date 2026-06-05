import { NextResponse } from "next/server";

const getBackendBaseUrl = () => process.env.BACKEND_URL ?? "http://localhost:4000";

export async function GET() {
  try {
    const response = await fetch(`${getBackendBaseUrl()}/api/site-themes/backgrounds`, {
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "Kunde inte hämta bakgrundsbilder från backend." },
        },
        { status: 502 },
      );
    }

    const payload: unknown = await response.json();
    return NextResponse.json(payload, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: { message: "Kunde inte ansluta till backend för bakgrundsbilder." },
      },
      { status: 502 },
    );
  }
}
