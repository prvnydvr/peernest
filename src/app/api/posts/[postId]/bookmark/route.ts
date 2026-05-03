import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { enforceMutationLimit, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { toggleBookmark } from "@/server/mutations";

export async function POST(request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `bookmark:${user.id}`, 60);

    const formData = await request.formData();
    const { postId } = await params;
    await toggleBookmark(user.id, postId);
    return redirectTo(request, getString(formData, "redirectTo") || "/feed");
  } catch (error) {
    return handleApiError(error);
  }
}
