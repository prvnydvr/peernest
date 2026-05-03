import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const databaseUrl = process.env["DATABASE_URL"];

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required.");
}

const pool = new Pool({ connectionString: databaseUrl, max: 1 });

const sql = `
DROP TABLE IF EXISTS "Notification" CASCADE;
DROP TABLE IF EXISTS "Message" CASCADE;
DROP TABLE IF EXISTS "ConversationParticipant" CASCADE;
DROP TABLE IF EXISTS "Conversation" CASCADE;
DROP TABLE IF EXISTS "Bookmark" CASCADE;
DROP TABLE IF EXISTS "AnswerVote" CASCADE;
DROP TABLE IF EXISTS "PostVote" CASCADE;
DROP TABLE IF EXISTS "Answer" CASCADE;
DROP TABLE IF EXISTS "Post" CASCADE;
DROP TABLE IF EXISTS "Resource" CASCADE;
DROP TABLE IF EXISTS "CommunityMembership" CASCADE;
DROP TABLE IF EXISTS "Community" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TYPE IF EXISTS "NotificationType" CASCADE;
DROP TYPE IF EXISTS "ResourceKind" CASCADE;
DROP TYPE IF EXISTS "PostKind" CASCADE;
DROP TYPE IF EXISTS "CommunityRole" CASCADE;

CREATE TYPE "CommunityRole" AS ENUM ('OWNER', 'MODERATOR', 'MEMBER');
CREATE TYPE "PostKind" AS ENUM ('QUESTION', 'DISCUSSION', 'PROJECT');
CREATE TYPE "ResourceKind" AS ENUM ('LINK', 'PDF', 'NOTE');
CREATE TYPE "NotificationType" AS ENUM ('ANSWER_POSTED', 'ANSWER_ACCEPTED', 'MESSAGE_RECEIVED', 'COMMUNITY_ACTIVITY');

CREATE TABLE "User" (
  "id" TEXT PRIMARY KEY,
  "supabaseId" TEXT UNIQUE,
  "email" TEXT NOT NULL UNIQUE,
  "username" TEXT NOT NULL UNIQUE,
  "name" TEXT NOT NULL,
  "passwordHash" TEXT,
  "bio" TEXT,
  "college" TEXT,
  "interests" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "skills" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "avatarUrl" TEXT,
  "googleId" TEXT UNIQUE,
  "reputation" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastActiveAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Community" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "topicColor" TEXT NOT NULL DEFAULT '#0084ff',
  "coverImageUrl" TEXT,
  "createdById" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "Community_slug_idx" ON "Community"("slug");

CREATE TABLE "CommunityMembership" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "communityId" TEXT NOT NULL REFERENCES "Community"("id") ON DELETE CASCADE,
  "role" "CommunityRole" NOT NULL DEFAULT 'MEMBER',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("userId", "communityId")
);
CREATE INDEX "CommunityMembership_communityId_idx" ON "CommunityMembership"("communityId");

CREATE TABLE "Post" (
  "id" TEXT PRIMARY KEY,
  "authorId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "communityId" TEXT REFERENCES "Community"("id") ON DELETE SET NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "kind" "PostKind" NOT NULL DEFAULT 'QUESTION',
  "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "acceptedAnswerId" TEXT UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "Post_communityId_createdAt_idx" ON "Post"("communityId", "createdAt" DESC);
CREATE INDEX "Post_authorId_createdAt_idx" ON "Post"("authorId", "createdAt" DESC);

CREATE TABLE "Answer" (
  "id" TEXT PRIMARY KEY,
  "postId" TEXT NOT NULL REFERENCES "Post"("id") ON DELETE CASCADE,
  "authorId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "Answer_postId_createdAt_idx" ON "Answer"("postId", "createdAt");
ALTER TABLE "Post" ADD CONSTRAINT "Post_acceptedAnswerId_fkey" FOREIGN KEY ("acceptedAnswerId") REFERENCES "Answer"("id") ON DELETE SET NULL;

CREATE TABLE "PostVote" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "postId" TEXT NOT NULL REFERENCES "Post"("id") ON DELETE CASCADE,
  "value" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("userId", "postId")
);
CREATE INDEX "PostVote_postId_idx" ON "PostVote"("postId");

CREATE TABLE "AnswerVote" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "answerId" TEXT NOT NULL REFERENCES "Answer"("id") ON DELETE CASCADE,
  "value" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("userId", "answerId")
);
CREATE INDEX "AnswerVote_answerId_idx" ON "AnswerVote"("answerId");

CREATE TABLE "Resource" (
  "id" TEXT PRIMARY KEY,
  "authorId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "communityId" TEXT REFERENCES "Community"("id") ON DELETE SET NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "kind" "ResourceKind" NOT NULL,
  "linkUrl" TEXT,
  "fileUrl" TEXT,
  "fileName" TEXT,
  "notes" TEXT,
  "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "Resource_communityId_createdAt_idx" ON "Resource"("communityId", "createdAt" DESC);
CREATE INDEX "Resource_authorId_createdAt_idx" ON "Resource"("authorId", "createdAt" DESC);

CREATE TABLE "Bookmark" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "postId" TEXT NOT NULL REFERENCES "Post"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("userId", "postId")
);
CREATE INDEX "Bookmark_userId_createdAt_idx" ON "Bookmark"("userId", "createdAt" DESC);

CREATE TABLE "Conversation" (
  "id" TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "ConversationParticipant" (
  "id" TEXT PRIMARY KEY,
  "conversationId" TEXT NOT NULL REFERENCES "Conversation"("id") ON DELETE CASCADE,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("conversationId", "userId")
);
CREATE INDEX "ConversationParticipant_userId_idx" ON "ConversationParticipant"("userId");

CREATE TABLE "Message" (
  "id" TEXT PRIMARY KEY,
  "conversationId" TEXT NOT NULL REFERENCES "Conversation"("id") ON DELETE CASCADE,
  "senderId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "body" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "readAt" TIMESTAMP(3)
);
CREATE INDEX "Message_conversationId_createdAt_idx" ON "Message"("conversationId", "createdAt");

CREATE TABLE "Notification" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "type" "NotificationType" NOT NULL,
  "title" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "href" TEXT,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt" DESC);
`;

async function main() {
  await pool.query(sql);
  await pool.end();
  console.log("Local PeerNest database schema is ready.");
}

main().catch(async (error) => {
  await pool.end();
  console.error(error);
  process.exitCode = 1;
});
