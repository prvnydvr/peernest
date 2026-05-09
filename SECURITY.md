# Security Policy

PeerNest is a student collaboration platform. Please report security issues privately so they can be fixed before public disclosure.

## Supported Versions

The `main` branch is the only supported version while the project is in MVP development.

## Reporting a Vulnerability

Do not open a public GitHub issue for vulnerabilities.

Email the maintainer or use GitHub private vulnerability reporting if it is enabled on the repository. Include:

- A short summary of the issue.
- Steps to reproduce.
- Impact and affected routes or APIs.
- Any logs, screenshots, or proof-of-concept details that help validate the issue.

Expected response target: 72 hours.

## Secrets

Never commit real values for:

- `DATABASE_URL`
- `JWT_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`
- Supabase database passwords
- OAuth client secrets

Use `.env.example` for placeholders only.

## Production Checklist

- Keep GitHub secret scanning enabled.
- Require pull requests before merging to `main`.
- Require CI, CodeQL, and secret scanning checks on pull requests.
- Rotate any credential that may have been shared, committed, or exposed in logs.
- Keep `SUPABASE_SERVICE_ROLE_KEY` out of browser code and out of Vercel client-exposed variables.
