import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { enforceMutationLimit, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { acceptAnswer } from "@/server/mutations";

export async function POST(request: NextRequest, { params }: { params: Promise<{ answerId: string }> }) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `accept:${user.id}`, 20);

    const formData = await request.formData();
    const { answerId } = await params;
    await acceptAnswer(user.id, answerId);
    return redirectTo(request, getString(formData, "redirectTo") || "/feed");
  } catch (error) {
    return handleApiError(error);
  }
}
