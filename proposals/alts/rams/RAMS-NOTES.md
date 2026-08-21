# RAMS-NOTES

Local skill only. Cloned `rams-design/rams-plugin` into `/tmp/rams-plugin` and used `skills/rams/SKILL.md` as the checklist. The full 309-rule engine is MCP / rams.ai later — this pass is the heuristic.

Tree: `proposals/alts/rams/`. Did not edit live Daily, `proposals/system/briefs/proposed.html` / `a.html` / `b.html`, or `system.css`.

## Versus the current proposed.html

The polish Hassan is still doing stays put. This alt is a different assembly.

- **More CLI, less costume.** Mail, Discord, ClickUp, Fathom, files, later, archive, and the sweep are chrome-less 12px mono columns (when · source · fact · Open). No terminal window, no green dot, no `1201 · draft · thu` chrome.
- **Drafts recessed, not a window.** `#0c0c0f` pane, no header bar. The letters stay the thing he would send.
- **One primary.** The only-you card is the peak. Two yeses, one module. No second hero.
- **Coral is not a link color.** Accent only on unread / needs reply / lapsed / print Friday. Open and Show stay muted and visible at rest. No sea of coral CTAs.
- **Less clutter.** Date once. No chips (`needs response 4` / `unread 2`). No mock-nav. Today and travel share one CLI. Discord, ClickUp, and Fathom share “Already read.”
- **Travel is a fact, not a confirmation.** `Fri · travel · LAX → JFK · Delta 676 · 10:45`. No confirmed-on-flight.
- **X-rail unchanged in job.** Images only, 178px, two-up, no filenames on the thumbs. Accessible names live on the links (`aria-label`), not on the pictures.
- **Internal first, outside full.** Lindsee, Jaimey, Gustavo, Patrick. Nyshka Chandran, Michelle Jones, Sean Bell, Kevin McCaughey, Michael Goldberg.
- **Times that exist.** 04:11 Gustavo, 07:47 Nyshka Chandran, 13:00 Lindsee. Michelle Jones is an em dash. Kevin McCaughey has no thread.

## Skill checks applied (WCAG 2.1 + visual)

### Critical
- Decorative mark and file thumbs use `alt=""`. Linked thumbs get `aria-label` so the destination is named (1.1.1 / 2.1.1).
- No icon-only buttons. Show / Hide / Open are words (4.1.2).
- No unlabeled inputs (none on this page) (1.3.1).
- No `div onClick`. Rows that go somewhere are `<a href>`. Accordions are `<details>` (2.1.1).
- Every link has an `href` (2.1.1).

### Serious
- Visible `:focus-visible` — 2px `var(--fg)`, 3px offset. `outline: none` only as the reset before that replacement (2.4.7).
- No hover-only actions. Open and Show are in the layout at rest. Phone has no hover (2.1.1 / 2.5.5).
- Status is a word in a badge, not color alone (1.4.1).
- Interactive rows, week cells, summaries, Open, and back: `min-height: 44px` (2.5.5).

### Moderate
- Heading order is `h1` then `h2`. No skipped levels (1.3.1).
- No positive `tabIndex` (2.4.3).
- Skip link to `#brief`.

### Visual
- Tokens only: bg `#101013` fg `#e8e8ec` muted `#8f8f9c` rule `#26262d` card `#17171c` accent `#ff6a4d` recess `#0c0c0f`.
- No gradients. No glow. No box-shadow.
- Two type roles: system sans for the brief and names; ui-monospace 12px for the setup. Fallbacks on both.
- Spacing on 8px. Wrap 760. Phone padding 12px.
- Contrast: muted-on-bg ~5.9:1, accent-on-bg ~6.7:1, fg-on-bg well above 4.5:1. Important CLI values use fg, not muted.
- Hover / focus on links and Open. Dark `color-scheme` set.

## Not done here
- Rams MCP `review_files` / real 0–100 score. User asked for the full engine later.
- Did not install into the agent’s own skills path. Checklist was read from `/tmp/rams-plugin`.
