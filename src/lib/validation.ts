import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  username: z.string().trim().min(3).max(24).regex(/^[a-z0-9_]+$/, "Username must be lowercase letters, numbers, or underscores."),
  password: z.string().min(8).max(64),
  college: z.string().trim().min(2).max(120),
  bio: z.string().trim().max(280).optional().default(""),
  interests: z.array(z.string().trim().min(1)).max(8).default([]),
  skills: z.array(z.string().trim().min(1)).max(8).default([]),
});

export const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).max(64),
});

export const profileUpdateSchema = z.object({
  name: z.string().trim().min(2).max(80),
  college: z.string().trim().min(2).max(120),
  bio: z.string().trim().max(280),
  interests: z.array(z.string().trim().min(1)).max(8),
  skills: z.array(z.string().trim().min(1)).max(8),
});

export const postCreateSchema = z.object({
  title: z.string().trim().min(8).max(140),
  content: z.string().trim().min(20).max(4000),
  kind: z.enum(["QUESTION", "DISCUSSION", "PROJECT"]),
  communityId: z.string().cuid().optional().nullable(),
  tags: z.array(z.string().trim().min(1).max(24)).max(6),
});

export const answerCreateSchema = z.object({
  content: z.string().trim().min(10).max(2500),
});

export const voteSchema = z.object({
  value: z.union([z.literal(1), z.literal(-1)]),
});

export const communityCreateSchema = z.object({
  name: z.string().trim().min(3).max(40),
  description: z.string().trim().min(24).max(220),
  topicColor: z.string().regex(/^#([A-Fa-f0-9]{6})$/),
});

export const resourceCreateSchema = z
  .object({
    title: z.string().trim().min(4).max(120),
    description: z.string().trim().min(12).max(320),
    kind: z.enum(["LINK", "PDF", "NOTE"]),
    communityId: z.string().cuid().optional().nullable(),
    linkUrl: z.string().trim().url().optional().nullable(),
    notes: z.string().trim().max(4000).optional().nullable(),
    tags: z.array(z.string().trim().min(1).max(24)).max(6),
  })
  .superRefine((data, ctx) => {
    if (data.kind === "LINK" && !data.linkUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["linkUrl"],
        message: "A valid link is required for link resources.",
      });
    }

    if (data.kind === "NOTE" && !data.notes) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["notes"],
        message: "Notes are required for note resources.",
      });
    }
  });

export const messageCreateSchema = z.object({
  recipientId: z.string().min(1).optional(),
  conversationId: z.string().cuid().optional(),
  body: z.string().trim().min(1).max(2000),
});
