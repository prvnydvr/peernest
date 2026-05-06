# Supabase Setup

PeerNest uses Supabase Postgres for production data and optional Supabase Storage for PDF uploads.

## 1. Create Supabase Project

Create a free Supabase project, then copy:

- Project URL
- Publishable key or anon key
- Postgres connection string
- Service role key only if you want seeded demo auth users

## 2. Environment

Create `.env` from `.env.example` and set:

```bash
DATABASE_URL="postgresql://postgres.PROJECT_REF:PASSWORD@aws-0-region.pooler.supabase.com:6543/postgres?pgbouncer=true"
DATABASE_POOL_MAX="4"
APP_URL="http://localhost:3000"
JWT_SECRET="any-32-character-minimum-string"
NEXT_PUBLIC_SUPABASE_URL="https://PROJECT_REF.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="sb_publishable_or_anon_key"
SUPABASE_SERVICE_ROLE_KEY="optional-server-only-service-role-key"
UPLOAD_MAX_MB="10"
```

## 3. Database

Push the Prisma schema to Supabase Postgres:

```bash
npm run db:generate
npm run db:push
```

Seed demo data:

```bash
npm run db:seed
```

If `SUPABASE_SERVICE_ROLE_KEY` is set, the seed also creates Supabase Auth users:

```text
ava@peernest.dev / Password123!
ryan@peernest.dev / Password123!
neha@peernest.dev / Password123!
leo@peernest.dev / Password123!
```

## 4. Auth

Email/password uses PeerNest-managed password hashes and a secure HTTP-only session cookie. Google sign-in is intentionally disabled in the current MVP until the OAuth provider is fully configured and tested.

## 5. Resource PDFs

Create a public Supabase Storage bucket named:

```text
resources
```

PDF resources upload to:

```text
resources/{userId}/{fileName}
```

If you keep the bucket private, add a signed URL flow before launch.
