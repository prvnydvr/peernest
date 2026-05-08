## 2024-05-08 - Icon-Only Link and Form Textarea ARIA Labels
**Learning:** Found an accessibility issue where the mobile header profile `<Link>` only contained an `<Avatar>` without alternative text, resulting in an empty link for screen readers. In addition, standard `<textarea>` elements in forms lacked associated labels.
**Action:** Applied `aria-label=Your profile` to the link and `aria-label` to the textareas. Remember to verify icon-only components or textareas for missing a11y attributes.
