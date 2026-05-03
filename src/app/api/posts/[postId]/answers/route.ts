import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { answerCreateSchema } from "@/lib/validation";
import { createAnswer } from "@/server/mutations";
import { enforceMutationLimit, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";

export async function POST(request: NextRequest, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `answers:${user.id}`);

    const formData = await request.formData();
    const payload = answerCreateSchema.parse({ content: getString(formData, "content") });
    const { postId } = await params;

    await createAnswer({ userId: user.id, postId, content: payload.content });
    return redirectTo(request, `/posts/${postId}`);
  } catch (error) {
    return handleApiError(error);
  }
}
