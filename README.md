# PeerNest

A place for students to ask, share, build, and help each other — without the pressure of followers, popularity, or fake profiles.

Built by students, for students.

---

## Why I started this

Most student platforms feel noisy, distracting, or fake.

I wanted to build something simpler:

- ask doubts freely
- share notes and resources
- discover interesting students
- discuss ideas
- build projects together
- stay anonymous if you want

PeerNest is still evolving, but the goal is simple:

> make the internet feel useful for students again.

---

## Features

- Anonymous or public posting
- Student communities
- Doubt solving
- Notes/resources sharing
- Reputation system
- Lightweight DMs
- Profiles & interests
- Bookmarks
- Mobile responsive UI

---

## Built with

- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- Supabase
- PostgreSQL
- Vercel

---

## Running locally

```bash
git clone https://github.com/prvnydvr/peernest.git
cd peernest
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

Open `http://localhost:3000`.

For Supabase database setup, see `docs/SUPABASE.md`.

## Docs

- Database schema: `prisma/schema.prisma`
- API documentation: `docs/API.md`
- Supabase setup: `docs/SUPABASE.md`
- GitHub security setup: `docs/GITHUB_SECURITY.md`

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
npm run test
npm run build
```

## Open-source security

This repo includes GitHub Actions for CI, CodeQL analysis, secret scanning, and Dependabot updates.

Before making the repository public, enable these GitHub settings:

1. Settings -> Code security and analysis:
   - Enable Dependency graph.
   - Enable Dependabot alerts.
   - Enable Dependabot security updates.
   - Enable Secret scanning.
   - Enable Push protection.
   - Enable Private vulnerability reporting.
2. Settings -> Rules -> Rulesets:
   - Create a branch ruleset for `main`.
   - Require a pull request before merging.
   - Require status checks to pass.
   - Require these checks: `Lint, typecheck, test, build`, `Analyze JavaScript and TypeScript`, `Gitleaks`.
   - Block force pushes and deletions.

See `SECURITY.md` before reporting vulnerabilities.
