import { type NextRequest } from "next/server";

import { handleApiError } from "@/lib/api";
import { enforceMutationLimit, getOptionalString, getString, redirectTo, requireApiUser } from "@/lib/route-helpers";
import { messageCreateSchema } from "@/lib/validation";
import { sendMessage } from "@/server/mutations";

export async function POST(request: NextRequest) {
  try {
    const { user, response } = await requireApiUser();
    if (!user) return response;
    enforceMutationLimit(request, `messages:${user.id}`, 30);

    const formData = await request.formData();
    const payload = messageCreateSchema.parse({
      recipientId: getOptionalString(formData, "recipientId") ?? undefined,
      conversationId: getOptionalString(formData, "conversationId") ?? undefined,
      body: getString(formData, "body"),
    });

    const message = await sendMessage({ userId: user.id, ...payload });
    return redirectTo(request, `/messages?conversation=${message.conversationId}`);
  } catch (error) {
    return handleApiError(error);
  }
}
