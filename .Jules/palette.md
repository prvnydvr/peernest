## 2024-05-04 - Icon-only Button Accessibility
**Learning:** Icon-only buttons (like Upvote/Downvote or Bookmark buttons) often lack visual text, making them unclear to screen readers and potentially confusing to sighted users without hover context.
**Action:** Always add both `aria-label` (for screen readers) and `title` (for native visual tooltips on hover) to any `<button>` element that only contains an icon.
