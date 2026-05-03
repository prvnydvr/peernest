import { type NextRequest } from "next/server";

import { AppError, handleApiError } from "@/lib/api";
import { db } from "@/lib/db";
import { enforceMutationLimit, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { slugify } from "@/lib/utils";
import { communityCreateSchema } from "@/lib/validation";
import { createCommunity } from "@/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `communities:${user.id}`, 6, 10 * 60_000);

    const formData = await request.formData();
    const payload = communityCreateSchema.parse({
      name: getString(formData, "name"),
      description: getString(formData, "description"),
      topicColor: getString(formData, "topicColor"),
    });
    const slug = slugify(payload.name);

    if (!slug) {
      throw new AppError("Choose a community name that can become a URL slug.", 400);
    }

    const existing = await db.community.findUnique({ where: { slug }, select: { id: true } });
    if (existing) {
      throw new AppError("A community with that name already exists.", 409);
    }

    const community = await createCommunity({ userId: user.id, ...payload, slug });
    return redirectTo(request, `/communities/${community.slug}`);
  } catch (error) {
    return handleApiError(error);
  }
}
