# GitHub Security Setup

The repository includes CI, CodeQL, secret scanning, Dependabot, and contribution guardrails. GitHub still needs these repository settings enabled from the repo settings UI.

## Branch Protection

Go to `Settings -> Rules -> Rulesets -> New branch ruleset`.

Recommended ruleset:

- Name: `Protect main`
- Enforcement status: `Active`
- Target branches: `main`
- Require a pull request before merging
- Require approvals: `1`
- Dismiss stale pull request approvals when new commits are pushed
- Require status checks to pass
- Required checks:
  - `Lint, typecheck, test, build`
  - `Analyze JavaScript and TypeScript`
  - `Gitleaks`
- Require conversation resolution before merging
- Block force pushes
- Block deletions

## Code Security

Go to `Settings -> Code security and analysis`.

Enable:

- Dependency graph
- Dependabot alerts
- Dependabot security updates
- Secret scanning
- Push protection
- Private vulnerability reporting

## Secrets

Store production secrets only in Vercel and Supabase. Do not add real secret values to GitHub repository variables, public issues, screenshots, or logs.
