import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { redirectTo, requireApiUser } from "@/lib/route-helpers";
import { markNotificationsRead } from "@/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;

    await markNotificationsRead(user.id);
    return redirectTo(request, "/settings");
  } catch (error) {
    return handleApiError(error);
  }
}
