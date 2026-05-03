import { NextResponse, type NextRequest } from "next/server";

export class AppError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
    this.name = "AppError";
  }
}

export function apiSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ success: true, data }, init);
}

export function apiError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return apiError(error.message, error.status);
  }

  if (error instanceof Error) {
    return apiError(error.message, 500);
  }

  return apiError("An unexpected error occurred.", 500);
}

export function getRequestFingerprint(request: NextRequest) {
  return request.headers.get("x-forwarded-for") ?? request.headers.get("user-agent") ?? "local";
}
