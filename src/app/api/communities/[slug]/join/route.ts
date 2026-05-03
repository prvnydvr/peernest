import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { enforceMutationLimit, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { joinCommunity } from "@/server/mutations";

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `join:${user.id}`, 30);

    const { slug } = await params;
    await joinCommunity(user.id, slug);
    return redirectTo(request, `/communities/${slug}`);
  } catch (error) {
    return handleApiError(error);
  }
}
