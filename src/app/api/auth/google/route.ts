import { handleApiError } from "@/lib/api";
import { createGoogleAuthorizationUrl } from "@/lib/auth";

export async function GET() {
  try {
    const url = await createGoogleAuthorizationUrl();
    return Response.redirect(url.toString(), 302);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST() {
  return GET();
}
