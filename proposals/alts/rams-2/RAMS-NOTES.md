# RAMS-NOTES

Self-review of `proposals/alts/rams/` against the Rams 9 categories (a11y, color, type, space, components, ux, motion, craft, native). MCP at `https://worker.rams.ai/mcp` is not connected; `review_files` was not run. Fetched `https://www.rams.ai/rules` and `https://www.rams.ai/mcp`. Read the local skill at `/tmp/rams-plugin/skills/rams/SKILL.md` (free taste only). This pass is the 309-rule *heuristic* applied to the new pages, then re-reviewed after fixes.

Tree: `proposals/alts/rams/`. Did not edit live Daily, `proposals/system/briefs/proposed.html` / `a.html` / `b.html`, or `system.css`.

Hosted page is `index.html` (the assembled Thursday). `rams.css` refined in place.

Contrast (computed from the token hex):

| pair | ratio |
| --- | ---: |
| fg `#e8e8ec` on bg `#101013` | 15.54:1 |
| muted `#8f8f9c` on bg | 5.95:1 |
| accent `#ff6a4d` on bg | 6.71:1 |
| fg on card `#17171c` | 14.62:1 |
| muted on card | 5.59:1 |
| accent on card | 6.31:1 |
| fg on recess `#0c0c0f` | 15.98:1 |
| muted on recess | 6.12:1 |
| accent on recess | 6.90:1 |

All body / 12px / 11px pairs clear WCAG AA 4.5:1. Coral Open is also a word, so color is not the only signal.

---

## Pass 1 — findings on the started tree

Started files: catalog `index.html`, `thursday.html`, `rams.css` (muted `.go` / `.cta`).

### Critical

| id | cat | where | finding | applied |
| --- | --- | --- | --- | --- |
| C1 | ux / a11y | `rams.css:189-198` (started) | `.go` and `.cta` were `color: var(--muted)`. Clickable rows only looked like links on hover (`a.row:hover .go`). Phone has no hover. Hover-only affordance. | Coral at rest on `.go`, `a.go`, `.cta`. Hover may shift to `--fg` as enhancement only. |
| C2 | a11y | started `rams.css:33` | `:focus { outline: none }` with a replacement — engines still treat a global outline wipe as a lockout risk if the replacement is missed. | Removed the wipe. `:focus-visible` is 2px `--fg`, 3px offset, no glow. |
| C3 | a11y | started `index.html` | Catalog `index.html` had no skip link, no `main`. Keyboard users landed in a directory, not the day. | Hosted page *is* the Thursday Daily. Skip link → `#brief`. `<main>` wraps the day. |

No missing `alt`, no icon-only buttons, no `div onClick`, no `a` without `href`. Those criticals were already clean on `thursday.html` and stayed clean.

### Serious

| id | cat | where | finding | applied |
| --- | --- | --- | --- | --- |
| S1 | a11y | started `rams.css:333-336` | Skip used `left: -9999px` (overflow / focus smell). | Clip + `1px` hide. `:focus` / `:focus-visible` park it at `12px, 12px`. |
| S2 | a11y | started `thursday.html:21-30` | Week cells were `S 16` with no weekday name. Color/outline-only “today.” | Visually hidden `Sunday`…`Saturday`. `aria-current="date"` on Thursday. Outline uses `--fg`, not color alone. |
| S3 | a11y | started `thursday.html` | No `main` landmark. Day sat outside any landmark. | `<main>` from Day through Sweep. Day has `h2.vh`. Header / footer stay outside. |
| S4 | a11y | started `thursday.html:216` | Later / Archive summaries were a `<span>`, not a heading. Outline skipped those sections. | `<h2>` inside `<summary>`. Show / Hide remain coral words. |
| S5 | a11y | started `thursday.html:133-146` | Thumbs are decorative (`alt=""`) — good — but need a name on the link. | `aria-label` on every xrail `<a>`. `role="group"` + `aria-label="File previews"`. |
| S6 | color / ux | lock vs started notes | Started notes said “coral is not a link color; Open stays muted.” That fights the lock and fails “clickable at rest.” | Open / Show / Hide are `--accent` at rest. Badges stay outline + word. |
| S7 | color | token layer | Started CSS used the seven night hexes but also one-off px (10.5, 14, 18, −12, −24) and no space / radius / touch tokens. | Hex only in `:root` (plus `theme-color` meta, which cannot see `var()`). Spacing, radius, touch, rail, wrap are tokens. |
| S8 | motion | started `rams.css` | No `prefers-reduced-motion` (xrail snap, any future transition). | Reduce-motion block: `scroll-behavior: auto`, animation / transition durations nulled. No decorative motion shipped. |
| S9 | ux | started `index.html` | Product was a two-link catalog. Lock: the hosted page *is* the assembled day. | `index.html` is Thursday. `thursday.html` removed so it cannot compete. |
| S10 | ux | started `thursday.html:45-65,170` | Today + travel mashed; Discord / ClickUp / Fathom mashed into “Already read.” | Split to the locked shape: Today, Travel, Needs response, Drafts, Files, Discord, ClickUp, Meetings, Later, Archive, Sweep. |
| S11 | type | started `thursday.html:284` | Sweep names sat in mono (`20260820 07:47  Nyshka Chandran`). Lock: names are `.nm` in the body face. | `.nm` / `.who` force `--sans`. Filenames stay `.fn` mono. |
| S12 | a11y / ux | started `rams.css:43-47` | 44px sketched on `a.go` / `summary` only. Rows and xrail thumbs were not in the selector. | `a.row`, `.xrail a`, `summary`, `a.go` all `min-height/min-width: var(--touch)`. Week cells already 44. |

### Moderate (applied)

| id | cat | where | finding | applied |
| --- | --- | --- | --- | --- |
| M1 | space | started CSS | 10px row pad, 18px ol, 10.5px badge, raw −12/−24 rail bleed. | `--s1`…`--s7`. Row pad `--s2`. Ol `--s4`. Badge pad `--s1`. Rail bleed `calc(var(--s3) * -1)`. |
| M2 | type | started `.cli` | `line-height: 1.45` on 12px (under 1.5). | 1.5. |
| M3 | native | started `body` | No safe-area. | `viewport-fit=cover` + `env(safe-area-inset-*)`. Tight footer, no 80px dead zone. |
| M4 | a11y | started heading tree | Day section had no heading. | `h2.vh` “Day”. |
| M5 | craft | started `index.html` | Unused `.dir` catalog styles after the page became the day. | Removed. Also dropped unused `a.in`. |
| M6 | ux | files | First-screen thumbs vs later pages. | `loading="eager"` on the two-up peek; `lazy` after. |
| M7 | type | CLI columns | Source column mixed channels, times, and kinds. | Aligned `when · src · mid · Open`. Sources: mail / discord / calendar / clickup / fathom / dropbox / travel. |
| M8 | a11y | sweep | Considered `role="log"` (live region) on a static page. | Dropped. Sweep is a labelled `div.cli`, not a live region. |

---

## Pass 2 — re-review of the shipped page

Files read: `index.html`, `rams.css`.

### Critical — 0

- Every `<img>` has `alt` (decorative `""` next to a name or `aria-label`).
- No icon-only controls. Open / Show / Hide are words.
- No inputs.
- No `div`/`span` click handlers. Destinations are `<a href>`. Accordions are `<details>`.
- Every link has an `href`.
- Keyboard: skip, real links, native disclosure, `:focus-visible`.
- Touch: 44px on controls, rows, week cells, thumbs, summaries.
- Contrast on muted and coral clears 4.5:1. Badges are outline + word.

### Serious — 0

- Coral Open / Show / Hide visible at rest.
- Static rows (Lindsee, Delta 676, Kevin McCaughey, Later, Archive, Sweep) have no Open.
- Status is a word (unread / print Friday / lapsed / needsAction), not color alone.
- No hover-only information.
- Token hex confined to `:root`. Components use `var()`.
- `prefers-reduced-motion` present.
- Heading order: `h1` → `h2` only. No skipped levels. No positive `tabIndex`.
- Names: internal first, external full, `.nm` in CLI. Bryan Chu / Brian Vo not invented.
- Delta 676 in type. No confirmed badge.
- No kind badges inside named sections. Project badges muted (Stone Island / RA).

### Moderate — accepted, not blocking

| id | cat | where | why left |
| --- | --- | --- | --- |
| A1 | color | `index.html:7` | `<meta name="theme-color" content="#101013">` repeats `--bg`. HTML meta cannot use `var()`. |
| A2 | space | `rams.css:309` | X-rail gap `3px` / `calc(50% - 1.5px)` is the locked two-up peek, not the 4/8 scale. |
| A3 | space | `rams.css:215-216` | `.gist` / `.sub` `margin-top: 2px` is an optical tuck under the name. |
| A4 | type | `rams.css:73-86` | Section `h2` is 11px uppercase muted — Daily label language, not a display heading. Contrast 5.95:1. Disclosure `h2`s are 16px. |
| A5 | ux | `index.html:145-157` | Thirteen xrail links, twelve to the same PDF. Designed peek; CLI path lines underneath are the named Open. Each thumb has its own `aria-label`. |
| A6 | craft | `rams.css:57,98` | `a.back` / `button` selectors are standing rules with no instances on this page. |
| A7 | craft | `rams.css:434-437` | `!important` only inside the reduced-motion reset. |
| A8 | type | `rams.css:66` | `h1` 22px (lock: 25 not required). Weight `620` matches the system. |

Native SwiftUI rules skipped.

---

## What the page is

Night CLI Daily. Same Thursday facts as `FACTS.md` / `proposed.html`, different setup: dense 12px mono columns (time · source · fact · Open), thread ids, file paths, a sweep. Lede and names stay in the body face. Drafts are recessed, exact copy, no terminal chrome. Phone-first, 12px sides, tight footer.

## Score (heuristic, not the hosted engine)

Pass 1 would have been capped by C1–C3 (one critical → 59; three → 39).

Pass 2: **0 critical, 0 serious**. Moderates above are accepted. Heuristic band **90+**. Real 0–100 is MCP `review_files` — not run.

Local skill: heuristic checks. The full engine runs at
https://www.rams.ai/?utm_source=skill&utm_medium=footer
(309 scored rules, verified re-reviews, one-click fixes on every PR)
