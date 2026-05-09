
## 2024-05-18 - Missing label text in standard form inputs
**Learning:** Native `textarea` elements in multi-field components (like `message-composer.tsx` and `post-thread-answers.tsx`) were using `placeholder` as their only context label, which is insufficient for screen readers. Forms often miss `aria-label` when designers omit visible `<label>` tags for aesthetic reasons in standard forms.
**Action:** When inspecting form controls (`input`, `textarea`, `select`), actively verify they either have an associated `<label>` or an `aria-label`, even if a visible placeholder is present.
