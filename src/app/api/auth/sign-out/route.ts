import { type NextRequest } from "next/server";

import { signOutUser } from "@/lib/auth";
import { redirectTo } from "@/lib/route-helpers";

export async function POST(request: NextRequest) {
  await signOutUser();
  return redirectTo(request, "/");
}
