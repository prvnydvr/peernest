import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { enforceMutationLimit, getOptionalString, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { parseTagInput } from "@/lib/utils";
import { postCreateSchema } from "@/lib/validation";
import { createPost } from "@/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `posts:${user.id}`);

    const formData = await request.formData();
    const payload = postCreateSchema.parse({
      title: getString(formData, "title"),
      content: getString(formData, "content"),
      kind: getString(formData, "kind"),
      communityId: getOptionalString(formData, "communityId"),
      tags: parseTagInput(getString(formData, "tags")),
    });

    const post = await createPost({ userId: user.id, ...payload });
    return redirectTo(request, post.community?.slug ? `/communities/${post.community.slug}` : "/feed", { postId: post.id });
  } catch (error) {
    return handleApiError(error);
  }
}
