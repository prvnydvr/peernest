# PeerNest

PeerNest is a student-to-student collaboration MVP for doubts, answers, communities, resource sharing, profiles, reputation, and lightweight direct messaging.

## Tech stack

- Next.js App Router, React, TypeScript, Tailwind CSS
- Email/password auth with secure HTTP-only PeerNest sessions
- Prisma ORM on Supabase Postgres for posts, answers, votes, resources, bookmarks, communities, profiles, and messages
- Supabase Storage for PDF resource uploads
- Zod validation and simple in-memory rate limiting

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Configure Supabase:

```bash
open docs/SUPABASE.md
```

4. Generate Prisma client and push/seed the Supabase database:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

5. Start development server:

```bash
npm run dev
```

Open `http://localhost:3000`. Seed login: `ava@peernest.dev` / `Password123!`.

The seed login works when `SUPABASE_SERVICE_ROLE_KEY` is set before running `npm run db:seed`.

For local-only development without Supabase, the old PGlite flow still works for database screens, but auth-backed flows require Supabase:

```bash
npm run db:dev
npm run db:dev:reset
```

## Environment

See `.env.example`.

Required:

- `DATABASE_URL`
- `DATABASE_POOL_MAX`
- `APP_URL`
- `JWT_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Optional:

- `SUPABASE_SERVICE_ROLE_KEY`
- `UPLOAD_MAX_MB`

## Database schema

The schema lives in `prisma/schema.prisma`.

Main entities:

- `User`: identity, profile, interests, skills, reputation
- `Community`: subject/interest group
- `CommunityMembership`: membership and role
- `Post`: question, discussion, or project post
- `Answer`: peer answers with accepted answer support
- `PostVote`, `AnswerVote`: voting
- `Resource`: link, note, or PDF resource
- `Bookmark`: saved posts
- `Conversation`, `ConversationParticipant`, `Message`: basic direct messaging
- `Notification`: activity notifications

## API documentation

See `docs/API.md`.

## Free deployment

Recommended free-tier path:

1. Push code to GitHub.
2. Create a free Supabase project.
3. Import the GitHub repo into Vercel.
4. Add environment variables in Vercel:
   - `DATABASE_URL`
   - `DATABASE_POOL_MAX=4`
   - `APP_URL=https://your-vercel-domain.vercel.app`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - optional `SUPABASE_SERVICE_ROLE_KEY` for seeding only
5. Run Prisma schema push locally against the hosted database:

```bash
npm run db:push
npm run db:seed
npm run db:seed:starter
```

6. Deploy on Vercel.

For PDF uploads, create a public Supabase Storage bucket named `resources`.

Google sign-in is intentionally disabled in the current MVP until the OAuth provider is fully configured and tested.

## GitHub push commands

```bash
git init
git add .
git commit -m "Build PeerNest MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/peernest.git
git push -u origin main
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```
