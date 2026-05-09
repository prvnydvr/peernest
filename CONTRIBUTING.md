# Contributing to PeerNest

Thanks for helping improve PeerNest.

## Local Setup

```bash
npm install
cp .env.example .env
npm run db:generate
npm run dev
```

For database setup, follow `docs/SUPABASE.md`.

## Pull Request Rules

- Create a branch from `main`.
- Keep changes focused.
- Do not commit `.env`, local databases, build output, or generated Prisma clients.
- Run the quality checks before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Security Rules

- Never include real secrets in commits, screenshots, issues, or logs.
- Do not add client-side access to service-role keys.
- Validate user input on new API routes.
- Prefer server-side authorization checks for mutations.
