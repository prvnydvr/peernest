import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { enforceMutationLimit, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { voteSchema } from "@/lib/validation";
import { togglePostVote } from "@/server/mutations";

export async function POST(request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `vote:${user.id}`, 60);

    const formData = await request.formData();
    const payload = voteSchema.parse({ value: Number(getString(formData, "value")) });
    const { postId } = await params;

    await togglePostVote(user.id, postId, payload.value);
    return redirectTo(request, getString(formData, "redirectTo") || `/posts/${postId}`);
  } catch (error) {
    return handleApiError(error);
  }
}
