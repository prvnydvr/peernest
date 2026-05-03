import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { enforceMutationLimit, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { parseListInput } from "@/lib/utils";
import { profileUpdateSchema } from "@/lib/validation";
import { updateProfile } from "@/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `profile:${user.id}`, 12, 10 * 60_000);

    const formData = await request.formData();
    const payload = profileUpdateSchema.parse({
      name: getString(formData, "name"),
      college: getString(formData, "college"),
      bio: getString(formData, "bio"),
      interests: parseListInput(getString(formData, "interests")),
      skills: parseListInput(getString(formData, "skills")),
    });

    await updateProfile({ userId: user.id, ...payload });
    return redirectTo(request, `/profile/${user.username}`);
  } catch (error) {
    return handleApiError(error);
  }
}
