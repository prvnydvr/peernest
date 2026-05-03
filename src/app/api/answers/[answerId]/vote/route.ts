import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { enforceMutationLimit, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { voteSchema } from "@/lib/validation";
import { toggleAnswerVote } from "@/server/mutations";

export async function POST(request: NextRequest, { params }: { params: Promise<{ answerId: string }> }) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `answer-vote:${user.id}`, 60);

    const formData = await request.formData();
    const payload = voteSchema.parse({ value: Number(getString(formData, "value")) });
    const { answerId } = await params;
    await toggleAnswerVote(user.id, answerId, payload.value);
    return redirectTo(request, getString(formData, "redirectTo") || "/feed");
  } catch (error) {
    return handleApiError(error);
  }
}
