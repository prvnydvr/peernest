"use client";

export type MutationResult<T = Record<string, unknown>> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function submitMutation<T = Record<string, unknown>>(action: string, formData: FormData) {
  const response = await fetch(action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
      "X-PeerNest-Mutation": "1",
    },
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    if (response.redirected) {
      return { success: true, data: { redirectTo: new URL(response.url).pathname } as T } satisfies MutationResult<T>;
    }

    return { success: false, error: "The server returned an unexpected response." } satisfies MutationResult<T>;
  }

  const payload = (await response.json()) as MutationResult<T>;
  if (!response.ok && payload.success !== false) {
    return { success: false, error: "Something went wrong. Please try again." } satisfies MutationResult<T>;
  }

  return payload;
}

export function getFormError(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}
