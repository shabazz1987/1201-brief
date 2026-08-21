# COMPONENTS.md

Official catalog scraped 2026-08-21 from:

- [ui.shadcn.com/llms.txt](https://ui.shadcn.com/llms.txt) (docs component index)
- `@shadcn` registry via MCP `list_items_in_registries` — **61** `registry:ui` items
- The docs page at [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components) is JS-heavy and returned empty HTML; llms.txt + the registry are the complete set.

This page is still a Daily. Night tokens. No build. Vanilla HTML/CSS that reads as the component. Hover-only primitives are not the only reveal. Sidebar and Chart are mapped and left unused.

## Used on this Thursday

accordion, alert, aspect-ratio, avatar, badge, breadcrumb, button, button-group, calendar, card, carousel, collapsible, empty, item, kbd, scroll-area, separator, table, tabs, toggle-group, typography

## One row per official component

| Component | Brief information type | Used? | Why |
|---|---|---|---|
| Accordion | Later / Archive — a pile that recedes | yes | Later this week (Show 2 / Hide). Archive (Show 3 / Hide). Coral CTA at rest. Native `details`. |
| Alert | Decision — only-you yes/no | yes | The two Friday-print questions. One module. |
| Alert Dialog | Confirm-send | no | No fake “send this draft?” theatre. |
| Aspect Ratio | Image / thumbnail frame | yes | Each rail slide is a fixed 178px frame. Images only. `object-fit: contain`. |
| Attachment | File chip on a message | no | New chat-kit primitive. Files are Carousel + Item. |
| Avatar | Mark for the house | yes | `../../../apple-touch-icon.png` only. No generated people photos. |
| Badge | Status / project / count | yes | Coral: unread, needsAction, print Friday, lapsed. Muted: RA, Stone Island. Count `4`. Never on the flight. |
| Breadcrumb | Page path | yes | `12:01 / Daily`. Quiet header, not app chrome. |
| Bubble | Chat bubble | no | Discord is an Item with a quoted line, not a messenger. |
| Button | Open / Show / Hide / Prev / Next | yes | Coral link variant at rest. 44px targets. |
| Button Group | Paired controls | yes | Carousel Prev / Next. |
| Calendar | Week, not a booking month | yes | Sunday–Saturday strip. S16–S22. Today (T20) on. |
| Card | Travel; Draft window | yes | Travel as a raised card (no confirmed badge). Drafts as recessed Card + `pre`. |
| Carousel | File media, X-style | yes | Two-up peek. One row height 178px. No filenames under thumbs. |
| Chart | Metrics | no | No charts-for-charts. Forbidden costume. |
| Checkbox | Form tick | no | Decisions are questions, not a checklist. |
| Collapsible | File paths under the rail | yes | Show / Hide coral at rest. Native `details`. |
| Combobox | Searchable pick | no | One locked Thursday. Nothing to pick. |
| Command | Jump palette | no | Tabs already jump Today / Waiting / Later. A palette is app chrome. |
| Context Menu | Right-click | no | Phone first. No right-click job. |
| Data Table | Sortable reply grid | no | Four replies are Items. The plain Table is enough. |
| Date Picker | Pick another day | no | The week is the date. No other locked day. |
| Dialog | Modal letter | no | Drafts sit on the page in a recessed Card. |
| Direction | RTL provider | no | LTR only. Skip native/i18n kit. |
| Drawer | Bottom sheet | no | Accordion already holds Later. A drawer is app chrome. |
| Dropdown Menu | Overflow menu | no | One Open per row, visible at rest. |
| Empty | Quiet pile / no thread | yes | Kevin McCaughey. Now-Time. No thread. |
| Field | Form field shell | no | Not submitting. |
| Form | Form wrapper | no | Not submitting. |
| Hover Card | Hover reveal | no | Phone has no hover. Clickable vs static must be obvious at rest. |
| Input | Search / compose | no | No compose field. Drafts are `pre`. |
| Input Group | Prefixed field | no | No compound field. |
| Input OTP | One-time code | no | No OTP. |
| Item | Person / mail / Discord / ClickUp / Fathom / calendar row | yes | Today, Needs response, Discord, ClickUp, Meetings, Later, Archive, file path lines. |
| Kbd | Thread id / flight / call id | yes | `Delta 676`, `1a01a7e1372537fe`, `1a019c4bdefb0170`, `19fd1f91ae17d23f`, `785612597`. |
| Label | Form label | no | Section labels are typography. No form. |
| Marker | Chat annotation | no | Chat kit. Unused. |
| Menubar | Application menu | no | Not an application. |
| Message | Chat message | no | Chat kit. Discord stays an Item. |
| Message Scroller | Chat transcript | no | Chat kit. Unused. |
| Native Select | Native `<select>` | no | Skip native/Swift-adjacent form chrome. No second day. |
| Navigation Menu | Site mega-nav | no | Breadcrumb is enough. |
| Pagination | Paged archive | no | Archive is three rows, not pages. |
| Popover | Floating extra | no | Hover-adjacent. Not the only reveal. |
| Progress | Loading bar | no | No loading theatre. |
| Radio Group | Exclusive pick | no | Not settings. |
| Resizable | Split panes | no | Phone. One column. |
| Scroll Area | Horizontal media rail | yes | The file carousel scrolls. Hidden scrollbar. Snap. |
| Select | Styled dropdown | no | No second day to switch to. |
| Separator | Rule between families | yes | After week, after Today, Waiting, Drafts, Files, Discord, ClickUp, Meetings. |
| Sheet | Side panel | no | Accordion holds Later. A sheet is dashboard chrome. |
| Sidebar | App shell | no | Dashboard costume. Forbidden. |
| Skeleton | Loading placeholder | no | The Daily is assembled. Nothing is loading. |
| Slider | Range | no | No range. |
| Sonner | Toast | no | No toast theatre. |
| Spinner | Loading | no | No loading theatre. |
| Switch | Settings toggle | no | Not settings. |
| Table | Compare the four replies | yes | Who / Ask / Status / Open. Kevin has no Open. |
| Tabs | Today / Waiting / Later | yes | Jump only. Content stays on the page. Not a settings app. |
| Textarea | Editable draft | no | Drafts are the thing he would send, in `pre`. Not a form. |
| Toast | Transient notice | no | Same as Sonner. Unused. |
| Toggle | Single on/off | no | Week is a group, not one toggle. |
| Toggle Group | Week strip | yes | Seven days. Thursday pressed. Not a settings segmented control. |
| Tooltip | Hover hint | no | Phone has no hover. Not the only reveal. |
| Typography | Lede / body | yes | The one sentence in 17px body type. Not a quote card. |

## Docs extras (not separate registry:ui items)

These appear on [the docs component index](https://ui.shadcn.com/docs/components) / llms.txt as pages, built from other primitives.

| Page | Brief information type | Used? | Why |
|---|---|---|---|
| Typography | Lede | yes | Mapped above. |
| Date Picker | Pick another day | no | Composition of Calendar + Popover. Unused. |
| Data Table | Sortable grid | no | Composition of Table. Unused. |
| Toast | Transient notice | no | Docs alias of Sonner. Unused. |

## Tokens

Night lock mapped onto shadcn semantic tokens. No light mode. No zinc-dashboard defaults.

| Lock | shadcn token | Value |
|---|---|---|
| bg | `background` | `#101013` |
| fg | `foreground` / `card-foreground` | `#e8e8ec` |
| muted | `muted-foreground` | `#8f8f9c` |
| recess | `muted` (surface) | `#0c0c0f` |
| rule | `border` / `input` | `#26262d` |
| card | `card` / `popover` / `secondary` | `#17171c` |
| accent | `primary` | `#ff6a4d` |
| (readable on coral) | `primary-foreground` | `#1a0c0a` |

Type: `-apple-system` 16 / lede 17. Wrap 760. Phone-first. 12px side. 44px targets. Skip link. Focus-visible. Coral Open / Show / Hide at rest.
