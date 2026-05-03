import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { SESSION_COOKIE_NAME } from "@/lib/constants";

const protectedPrefixes = [
  "/feed",
  "/ask",
  "/communities",
  "/resources",
  "/messages",
  "/bookmarks",
  "/profile",
  "/settings",
];

const guestOnlyPrefixes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const supabaseKey = process.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"];
  const hasSupabaseConfig = Boolean(supabaseUrl && supabaseKey);

  if (!hasSupabaseConfig) {
    const hasLocalSession = Boolean(request.cookies.get(SESSION_COOKIE_NAME)?.value);

    if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix)) && !hasLocalSession) {
      const url = new URL("/sign-in", request.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (guestOnlyPrefixes.some((prefix) => pathname.startsWith(prefix)) && hasLocalSession) {
      return NextResponse.redirect(new URL("/feed", request.url));
    }

    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix)) && !user) {
    const url = new URL("/sign-in", request.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (guestOnlyPrefixes.some((prefix) => pathname.startsWith(prefix)) && user) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/feed/:path*",
    "/ask/:path*",
    "/communities/:path*",
    "/resources/:path*",
    "/messages/:path*",
    "/bookmarks/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
