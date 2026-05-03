import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { enforceMutationLimit, getOptionalString, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { parseTagInput } from "@/lib/utils";
import { resourceCreateSchema } from "@/lib/validation";
import { createResource } from "@/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `resources:${user.id}`, 12, 10 * 60_000);

    const formData = await request.formData();
    const payload = resourceCreateSchema.parse({
      title: getString(formData, "title"),
      description: getString(formData, "description"),
      kind: getString(formData, "kind"),
      communityId: getOptionalString(formData, "communityId"),
      linkUrl: getOptionalString(formData, "linkUrl"),
      notes: getOptionalString(formData, "notes"),
      tags: parseTagInput(getString(formData, "tags")),
    });

    await createResource({
      userId: user.id,
      ...payload,
      file: formData.get("file") instanceof File ? (formData.get("file") as File) : null,
    });

    return redirectTo(request, "/resources");
  } catch (error) {
    return handleApiError(error);
  }
}
