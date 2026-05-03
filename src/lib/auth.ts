import { redirect } from "next/navigation";
import { nanoid } from "nanoid";
import type { User as SupabaseAuthUser } from "@supabase/supabase-js";
import { compare, hash } from "bcryptjs";

import { db } from "@/lib/db";
import { getBaseUrl, hasSupabaseConfig } from "@/lib/env";
import { AppError } from "@/lib/api";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { clearSessionCookie, readSessionCookie, setSessionCookie, verifySessionToken } from "@/lib/session";
import { createUsernameCandidate } from "@/lib/utils";

export type AuthUser = Awaited<ReturnType<typeof getCurrentUser>>;

const currentUserSelect = {
  id: true,
  email: true,
  username: true,
  name: true,
  bio: true,
  college: true,
  interests: true,
  skills: true,
  avatarUrl: true,
  reputation: true,
  createdAt: true,
  _count: {
    select: {
      posts: true,
      answers: true,
      resources: true,
      memberships: true,
    },
  },
} as const;

export async function hashPassword(password: string) {
  return hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export async function getCurrentUser() {
  if (!hasSupabaseConfig()) {
    const token = await readSessionCookie();

    if (!token) {
      return null;
    }

    try {
      const session = await verifySessionToken(token);
      return db.user.findUnique({
        where: { id: session.sub },
        select: currentUserSelect,
      });
    } catch {
      return null;
    }
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const appUser = await ensureAppUser(user);

  return db.user.findUnique({
    where: { id: appUser.id },
    select: currentUserSelect,
  });
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return user;
}

export async function requireGuest() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/feed");
  }
}

export async function signUpWithSupabase({
  email,
  password,
  username,
  name,
  college,
  bio,
  interests,
  skills,
}: {
  email: string;
  password: string;
  username: string;
  name: string;
  college: string;
  bio: string;
  interests: string[];
  skills: string[];
}) {
  if (!hasSupabaseConfig()) {
    const user = await db.user.create({
      data: {
        email,
        username,
        name,
        college,
        bio,
        interests,
        skills,
        passwordHash: await hashPassword(password),
      },
      select: { id: true },
    });

    await signInLocalUser(user.id);
    return { user: null, session: { access_token: "local" } };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${getBaseUrl()}/api/auth/callback`,
      data: {
        username,
        name,
        college,
        bio,
        interests,
        skills,
      },
    },
  });

  if (error) {
    throw new AppError(error.message, 400);
  }

  if (!data.user) {
    throw new AppError("Supabase did not return a user for this signup.", 500);
  }

  await upsertAppUser(data.user, {
    email,
    username,
    name,
    college,
    bio,
    interests,
    skills,
  });

  return data;
}

export async function signInWithSupabase(email: string, password: string) {
  if (!hasSupabaseConfig()) {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true },
    });

    if (!user?.passwordHash || !(await verifyPassword(password, user.passwordHash))) {
      throw new AppError("Invalid email or password.", 401);
    }

    await signInLocalUser(user.id);
    return user;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    throw new AppError(error?.message ?? "Invalid email or password.", 401);
  }

  const appUser = await ensureAppUser(data.user);
  await db.user.update({
    where: { id: appUser.id },
    data: { lastActiveAt: new Date() },
    select: { id: true },
  });

  return appUser;
}

export async function signOutUser() {
  if (!hasSupabaseConfig()) {
    await clearSessionCookie();
    return;
  }

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
}

export async function createGoogleAuthorizationUrl() {
  if (!hasSupabaseConfig()) {
    throw new AppError("Supabase is not configured yet.", 503);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getBaseUrl()}/api/auth/google/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error || !data.url) {
    throw new AppError(error?.message ?? "Unable to start Google sign in.", 503);
  }

  return data.url;
}

export async function resolveGoogleCallback(code: string) {
  if (!hasSupabaseConfig()) {
    throw new AppError("Supabase is not configured yet.", 503);
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    throw new AppError(error?.message ?? "Google login could not be validated.", 400);
  }

  await ensureAppUser(data.user);
  return data.user;
}

export async function generateUniqueUsername(source: string) {
  const base = createUsernameCandidate(source);
  let candidate = base;
  let iteration = 0;

  while (await db.user.findUnique({ where: { username: candidate }, select: { id: true } })) {
    iteration += 1;
    candidate = `${base}_${nanoid(4).toLowerCase()}${iteration}`;
  }

  return candidate.slice(0, 24);
}

async function ensureAppUser(user: SupabaseAuthUser) {
  const existing = await db.user.findFirst({
    where: { OR: [{ id: user.id }, { supabaseId: user.id }] },
    select: { id: true },
  });

  if (existing) {
    return db.user.update({
      where: { id: existing.id },
      data: {
        supabaseId: user.id,
        lastActiveAt: new Date(),
      },
      select: { id: true },
    });
  }

  const metadata = user.user_metadata ?? {};
  const existingByEmail = user.email
    ? await db.user.findUnique({ where: { email: user.email }, select: { id: true } })
    : null;

  if (existingByEmail) {
    return db.user.update({
      where: { id: existingByEmail.id },
      data: {
        supabaseId: user.id,
        avatarUrl: user.user_metadata?.["avatar_url"]?.toString() ?? user.user_metadata?.["picture"]?.toString() ?? null,
        googleId: user.app_metadata?.["provider"] === "google" ? user.id : undefined,
        lastActiveAt: new Date(),
      },
      select: { id: true },
    });
  }

  const sourceName = stringFromMetadata(metadata, "name") ?? user.email?.split("@")[0] ?? "Student";
  const username = await generateUniqueUsername(stringFromMetadata(metadata, "username") ?? sourceName);

  return upsertAppUser(user, {
    email: user.email ?? `${user.id}@supabase.local`,
    username,
    name: sourceName,
    college: stringFromMetadata(metadata, "college") ?? "",
    bio: stringFromMetadata(metadata, "bio") ?? "New to PeerNest. Building my profile.",
    interests: arrayFromMetadata(metadata, "interests"),
    skills: arrayFromMetadata(metadata, "skills"),
  });
}

async function upsertAppUser(
  user: SupabaseAuthUser,
  profile: {
    email: string;
    username: string;
    name: string;
    college: string;
    bio: string;
    interests: string[];
    skills: string[];
  },
) {
  return db.user.upsert({
    where: { id: user.id },
    update: {
      supabaseId: user.id,
      email: profile.email,
      name: profile.name,
      college: profile.college,
      bio: profile.bio,
      interests: profile.interests,
      skills: profile.skills,
      avatarUrl: user.user_metadata?.["avatar_url"]?.toString() ?? user.user_metadata?.["picture"]?.toString() ?? null,
      googleId: user.app_metadata?.["provider"] === "google" ? user.id : undefined,
      lastActiveAt: new Date(),
    },
    create: {
      id: user.id,
      supabaseId: user.id,
      email: profile.email,
      username: profile.username,
      name: profile.name,
      college: profile.college,
      bio: profile.bio,
      interests: profile.interests,
      skills: profile.skills,
      avatarUrl: user.user_metadata?.["avatar_url"]?.toString() ?? user.user_metadata?.["picture"]?.toString() ?? null,
      googleId: user.app_metadata?.["provider"] === "google" ? user.id : undefined,
    },
  });
}

function stringFromMetadata(metadata: SupabaseAuthUser["user_metadata"], key: string) {
  const value = metadata[key];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function arrayFromMetadata(metadata: SupabaseAuthUser["user_metadata"], key: string) {
  const value = metadata[key];
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

async function signInLocalUser(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, username: true, name: true },
  });

  if (!user) {
    throw new AppError("Unable to establish session.", 500);
  }

  await setSessionCookie({
    sub: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
  });

  await db.user.update({
    where: { id: user.id },
    data: { lastActiveAt: new Date() },
    select: { id: true },
  });
}
