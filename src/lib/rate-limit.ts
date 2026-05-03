import { AppError } from "@/lib/api";

type Bucket = {
  count: number;
  resetAt: number;
};

declare global {
  var __peernest_rate_limit__: Map<string, Bucket> | undefined;
}

const buckets = globalThis.__peernest_rate_limit__ ?? new Map<string, Bucket>();

if (process.env["NODE_ENV"] !== "production") {
  globalThis.__peernest_rate_limit__ = buckets;
}

export function enforceRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return;
  }

  if (bucket.count >= limit) {
    throw new AppError("Too many requests. Please slow down and try again.", 429);
  }

  bucket.count += 1;
  buckets.set(key, bucket);
}
