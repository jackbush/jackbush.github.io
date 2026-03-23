# Lessons

Patterns learned from corrections — to prevent repeating the same mistakes.

---

## CSS: don't mix `rem` and `px` for the same sizing concern

Mixing `min-height: 3rem` (nav wrapper) with `min-height: 44px` (nav links) creates a subtle dependency on root font-size. If browser zoom or viewport meta causes `rem` to resolve differently between pages, the nav height jumps. Keep height values in the same unit across a component.

**Source:** nav resize bug on contact/projects pages (2026-03-23)

---

## Always include `initial-scale=1` in viewport meta

`content="width=device-width"` alone allows browsers to infer zoom level from content width. Pages with narrow content (forms, constrained layouts) can trigger a different scale than pages with full-width content. Always use `content="width=device-width, initial-scale=1"`.

**Source:** nav resize bug on contact/projects pages (2026-03-23)
