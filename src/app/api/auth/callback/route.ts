import { type NextRequest } from "next/server";

import { redirectTo } from "@/lib/route-helpers";

export async function GET(request: NextRequest) {
  return redirectTo(request, "/sign-in?notice=google-disabled");
}
