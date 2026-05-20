## 2024-05-20 - Missing aria-expanded on toggle menus
**Learning:** The mobile navigation menu toggle button had an `aria-label` but was missing `aria-expanded` and `aria-controls`. This is a critical pattern for screen readers to announce the current open/closed state of the menu and associate it with the correct content block.
**Action:** Always verify that interactive elements that toggle content visibility include `aria-expanded` (bound to the boolean state) and `aria-controls` (pointing to the ID of the toggled content).
