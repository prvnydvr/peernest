import { formatDistanceToNow } from "date-fns";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { POST_TAG_LIMIT, PROFILE_LIST_LIMIT } from "@/lib/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSentenceCase(value: string) {
  if (!value) {
    return "";
  }

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function formatRelativeTime(date: Date | string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function parseListInput(value: FormDataEntryValue | string | null | undefined, limit = PROFILE_LIST_LIMIT) {
  if (!value) {
    return [];
  }

  const source = typeof value === "string" ? value : value.toString();

  return [...new Set(source.split(",").map((item) => item.trim()).filter(Boolean))]
    .slice(0, limit)
    .map(toSentenceCase);
}

export function parseTagInput(value: FormDataEntryValue | string | null | undefined) {
  return parseListInput(value, POST_TAG_LIMIT).map((tag) => tag.toLowerCase());
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function createUsernameCandidate(value: string) {
  const candidate = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 20);

  return candidate.length >= 3 ? candidate : `student_${candidate || "peer"}`;
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function createExcerpt(value: string, limit = 180) {
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit).trimEnd()}...`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
