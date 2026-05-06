import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL("/sign-in", request.url);
  url.searchParams.set("notice", "google-disabled");
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  return GET(request);
}
