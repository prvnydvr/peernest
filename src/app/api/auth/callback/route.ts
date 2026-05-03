import { type NextRequest } from "next/server";

import { resolveGoogleCallback } from "@/lib/auth";
import { handleApiError } from "@/lib/api";
import { redirectTo } from "@/lib/route-helpers";

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code");
    const next = request.nextUrl.searchParams.get("next") ?? "/feed";

    if (!code) {
      return redirectTo(request, "/sign-in");
    }

    await resolveGoogleCallback(code);
    return redirectTo(request, next);
  } catch (error) {
    return handleApiError(error);
  }
}
