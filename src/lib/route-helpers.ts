import { NextResponse, type NextRequest } from "next/server";
import { ZodError, type ZodType } from "zod";

import { apiError, getRequestFingerprint } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import { enforceRateLimit } from "@/lib/rate-limit";

export async function requireApiUser() {
  const user = await getCurrentUser();

  if (!user) {
    return { user: null, response: apiError("Authentication required.", 401) };
  }

  return { user, response: null };
}

export function redirectTo(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

export function enforceMutationLimit(request: NextRequest, scope: string, limit = 24, windowMs = 60_000) {
  enforceRateLimit(`${scope}:${getRequestFingerprint(request)}`, limit, windowMs);
}

export async function parseRequestBody<T>(request: NextRequest, schema: ZodType<T>) {
  const contentType = request.headers.get("content-type") ?? "";

  try {
    if (contentType.includes("application/json")) {
      return schema.parse(await request.json());
    }

    const formData = await request.formData();
    return schema.parse(Object.fromEntries(formData.entries()));
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.issues[0]?.message ?? "Invalid request body.");
    }

    throw error;
  }
}

export function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key).trim();
  return value.length ? value : null;
}
