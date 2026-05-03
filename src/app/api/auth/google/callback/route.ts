import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { resolveGoogleCallback } from "@/lib/auth";
import { redirectTo } from "@/lib/route-helpers";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");

    if (!code || !state) {
      return redirectTo(request, "/sign-in");
    }

    await resolveGoogleCallback(code);
    return redirectTo(request, "/feed");
  } catch (error) {
    return handleApiError(error);
  }
}
