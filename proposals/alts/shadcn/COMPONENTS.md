# COMPONENTS.md

Source of the catalog: [shadcn/ui components](https://ui.shadcn.com/docs/components), confirmed against [`apps/v4/lib/components.ts`](https://github.com/shadcn-ui/ui/blob/main/apps/v4/lib/components.ts) on 2026-08-21. The docs page is client-rendered; the TypeScript list is the full set.

This mock is still a Daily. Night tokens. No build step. Semantic HTML + CSS that reads as the component. Components that would turn the page into a SaaS shell are mapped and then left unused.

## 12:01 type → shadcn

| 12:01 information | shadcn | How it is used on Thursday |
|---|---|---|
| Day (date, city, week Sun 16–Sat 22) | **Calendar** | Week strip. Today outlined. Not a booking widget. |
| Lede | **Typography** | The one sentence in body type. Not a quote. |
| Decision (only-you yes/no) | **Alert** | The two Friday-print yeses. One module. |
| Person | **Item** + **Avatar** | Name as title. Initial only when someone is quoted. |
| Mail | **Item** | Thread, gist, Open. Nyshka Chandran, Michelle Jones, Sean Bell. |
| Quotation | **Card** + **Avatar** | Gustavo: “thank you jaimey.” Attributed. |
| Draft | **Tabs** + **Textarea** + **Dialog** | Nyshka / Michelle. The thing he would send. Show opens the letter. |
| File | **Carousel** / **Scroll-area** + **Item** | X-rail of thumbs, then path rows. |
| Image / thumbnail | **Aspect-ratio** (fixed rail height) | Images only. Two-up. No filenames on the pictures. |
| Discord | **Item** | Channel, who, gist. Jaimey, Gustavo. |
| ClickUp | **Alert** | RA — Estimated Print Date. Lapsed. Due Aug 12. |
| Calendar event | **Item** | Lindsee 1:00–3:00 briefing. |
| Travel | **Card** | LAX → JFK · Delta 676 · Fri 10:45. No confirmed. |
| Time / id / address | **Kbd** | Times and ids (`07:47`, `785612597`). |
| Status | **Badge** | Coral only: unread, needs reply, lapsed, print Friday. |
| Source | **Item** description, not a kind badge in a named section | mail / discord / clickup / fathom / dropbox as muted text. |
| Later / collapsed | **Accordion** | Later this week. Show 2 / Hide. |
| Archive | **Accordion** | Thu 20 / Wed 19 / Tue 18. Show 3 / Hide. |
| Week holds compared | **Table** | Inside Later. When / What / Status. |
| Empty | **Empty** | Kevin McCaughey. Now-Time. No thread. |
| Count | **Badge** | `4` on Needs response. |
| Log / sweep | **Item** group, chrome-less | What was read. Not a terminal. |
| Recurring | **Item** in Later | 12:01 Weekly. Patrick is gone. |
| Jump | **Command** + **Input** + **Dialog** | Names and sections. Not app chrome. |
| Page path | **Breadcrumb** | alts / shadcn / Thursday. |
| Open / Show | **Button** (ghost) | Visible at rest. 44px. Not coral. |
| Rules between families | **Separator** | |
| File paths under the rail | **Collapsible** | Show paths. |
| Draft field label | **Label** | On the dialog textarea. |

## Used on the assembled Thursday

accordion, alert, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, collapsible, command, dialog, empty, input, item, kbd, label, scroll-area, separator, table, tabs, textarea, typography

## Mapped, not used (would costume a Daily)

| Component | Why not on this Thursday |
|---|---|
| alert-dialog | No fake confirm-send. |
| button-group | One Open per row. |
| chart | No metrics. |
| checkbox | Decisions are questions, not a form. |
| combobox | Command covers jump. |
| context-menu | Phone first. No right-click job. |
| data-table | Four replies are Items. Week holds are a plain Table. |
| date-picker | The week is the date. No other locked day to pick. |
| direction | LTR only. |
| drawer / sheet | Accordion already holds Later. A drawer is app chrome. |
| dropdown-menu | Command is the jump. |
| field / form | Not submitting. |
| hover-card / popover / tooltip | Phone has no hover. |
| input-group / input-otp | No compound field, no OTP. |
| menubar / navigation-menu | Not an application. |
| native-select / select | No second day to switch to. |
| pagination | Archive is three rows, not pages. |
| progress / slider / spinner / skeleton / sonner / toast | No loading theatre. |
| radio-group / switch / toggle / toggle-group | Not settings. |
| resizable | Phone. One column. |
| sidebar | Dashboard chrome. Forbidden here. |

## Tokens

Same night set as the live Daily: `--bg #101013` `--fg #e8e8ec` `--muted #8f8f9c` `--rule #26262d` `--card #17171c` `--accent #ff6a4d` `--recess #0c0c0f`. Wrap 760. Phone first. Open/Show at rest. Coral only on the four status badges.
