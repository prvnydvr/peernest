import { NextResponse, type NextRequest } from "next/server";

import { apiError, handleApiError } from "@/lib/api";
import { db } from "@/lib/db";
import { signUpWithSupabase } from "@/lib/auth";
import { enforceMutationLimit, getString, redirectTo } from "@/lib/route-helpers";
import { parseListInput } from "@/lib/utils";
import { signUpSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    enforceMutationLimit(request, "auth:sign-up", 8, 10 * 60_000);

    const formData = await request.formData();
    const interests = formData
      .getAll("interests")
      .map((item) => item.toString())
      .join(",");
    const payload = signUpSchema.parse({
      name: getString(formData, "name"),
      email: getString(formData, "email"),
      username: getString(formData, "username").toLowerCase(),
      password: getString(formData, "password"),
      college: getString(formData, "college"),
      bio: getString(formData, "bio"),
      interests: parseListInput(interests),
      skills: parseListInput(getString(formData, "skills")),
    });

    const existing = await db.user.findFirst({
      where: { OR: [{ email: payload.email }, { username: payload.username }] },
      select: { id: true },
    });

    if (existing) {
      return apiError("An account with that email or username already exists.", 409);
    }

    const data = await signUpWithSupabase(payload);

    if (!data.session) {
      return redirectTo(request, "/sign-in?notice=check-email");
    }

    return redirectTo(request, "/feed");
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/sign-up", request.url));
}
