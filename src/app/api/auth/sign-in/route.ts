import { NextResponse, type NextRequest } from "next/server";

import { AppError, handleApiError } from "@/lib/api";
import { signInWithSupabase } from "@/lib/auth";
import { enforceMutationLimit, getString, redirectTo } from "@/lib/route-helpers";
import { signInSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    enforceMutationLimit(request, "auth:sign-in", 12, 10 * 60_000);

    const formData = await request.formData();
    const payload = signInSchema.parse({
      email: getString(formData, "email"),
      password: getString(formData, "password"),
    });

    try {
      await signInWithSupabase(payload.email, payload.password);
    } catch (error) {
      if (error instanceof AppError && error.status === 401) {
        return handleApiError(error);
      }

      throw error;
    }

    return redirectTo(request, request.nextUrl.searchParams.get("next") ?? "/feed");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/sign-in", request.url));
}
