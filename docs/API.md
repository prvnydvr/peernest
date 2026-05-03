# PeerNest API

All mutation endpoints accept `multipart/form-data` from the built-in forms. Authenticated endpoints require the `peernest_session` HTTP-only cookie.

## Authentication

| Method | Path | Body | Result |
| --- | --- | --- | --- |
| `POST` | `/api/auth/sign-up` | `name`, `username`, `email`, `password`, `college`, optional `bio`, `interests`, `skills` | Creates account, sets session cookie, redirects to `/feed` |
| `POST` | `/api/auth/sign-in` | `email`, `password` | Sets session cookie, redirects to `/feed` |
| `POST` | `/api/auth/sign-out` | none | Clears session cookie |
| `GET` | `/api/auth/google` | none | Starts Google OAuth when configured |
| `GET` | `/api/auth/google/callback` | `code`, `state` query params | Resolves OAuth account and signs in |

## Posts and answers

| Method | Path | Body | Result |
| --- | --- | --- | --- |
| `POST` | `/api/posts` | `title`, `content`, `kind`, optional `communityId`, `tags` | Creates a question, discussion, or project post |
| `POST` | `/api/posts/:postId/answers` | `content` | Adds an answer |
| `POST` | `/api/posts/:postId/vote` | `value` as `1` or `-1`, optional `redirectTo` | Toggles a post vote |
| `POST` | `/api/posts/:postId/bookmark` | optional `redirectTo` | Toggles bookmark |
| `POST` | `/api/answers/:answerId/vote` | `value` as `1` or `-1`, optional `redirectTo` | Toggles answer vote |
| `POST` | `/api/answers/:answerId/accept` | optional `redirectTo` | Marks an answer as accepted; post owner only |

## Communities and resources

| Method | Path | Body | Result |
| --- | --- | --- | --- |
| `POST` | `/api/communities` | `name`, `description`, `topicColor` | Creates a community and joins owner |
| `POST` | `/api/communities/:slug/join` | none | Joins a community |
| `POST` | `/api/resources` | `title`, `description`, `kind`, optional `communityId`, `linkUrl`, `notes`, `file`, `tags` | Shares a link, note, or PDF |

## Profile, messages, notifications

| Method | Path | Body | Result |
| --- | --- | --- | --- |
| `POST` | `/api/profile` | `name`, `college`, `bio`, `interests`, `skills` | Updates current user profile |
| `POST` | `/api/messages` | `body` plus `conversationId` or `recipientId` | Sends a direct message |
| `POST` | `/api/notifications/read` | none | Marks notifications as read |

Validation is handled with Zod schemas in `src/lib/validation.ts`. Rate limiting is in-memory in `src/lib/rate-limit.ts`; for multi-instance production deployments, replace it with a free Redis-compatible tier such as Upstash free tier or a self-hosted Redis instance.
