# MDGC Content Migration Map — Old URL → New URL

Compiled: 10 July 2026. New URLs follow the approved information architecture (Golf / Visit / Membership / Tournaments / Stay / Clubhouse / Heritage).
Status values: `Captured — ready for rewrite`, `Captured — verify facts first`, `Manual capture required`, `No content to migrate`, `Source material needed from club`.

| Old URL | Old title | New destination URL(s) | Content to move | Migration status | Notes |
|---|---|---|---|---|---|
| `/` | Home \| mdgc | `/` | Committee → `/club/committee`; room tariffs → `/stay/rates`; testimonial → homepage/stories | Captured — verify facts first | Homepage rebuilt to new spec (hero, Today at Mercara Downs, signature holes, plan-your-round, heritage, tournaments, retreat, dining, stories, directions). Kill empty announcements table; replace "G0LF"/"ONE AMONG THE BEST" headline |
| `/mdgc-history` | History of MDGC \| mdgc | `/club/heritage` | Full history narrative | **Manual capture required** | Body not extractable remotely; diff against `/history` and merge into one heritage page |
| `/history` | Club History \| mdgc | `/club/heritage` (+ `/club/heritage/timeline`) | 1890s origin, NCC relationship, 1951 incorporation, early-80s independence, course/retreat facts | Captured — verify facts first | Duplicate of `/mdgc-history` in intent; single canonical heritage page on new site |
| `/course-layout` | Course Layout \| mdgc | `/golf/course-guide` (hole-by-hole), `/golf/course-overview` (stats), `/golf/scorecard` | 18 hole names + descriptions; course data block | Captured — verify facts first | Rebuild as structured CMS `CourseHole` records with Explore/Scorecard/Mobile modes. **Do not migrate coordinates (Bengaluru) or altitude without verification.** Stroke index + full scorecard needed from club |
| `/copy-of-green-fee` | MDGC - Green Fees | `/golf/visitor-fees` → redirect target only (page canonicalised to `/visit/green-fees`) | Nothing — page is empty + noindex | No content to migrate | New Green Fees page built from club-supplied rates with "Rates last updated on [DATE]" |
| `/green-fee` | MDGC - Green Fees | `/membership/affiliated-clubs` (reciprocal-fee table) and/or `/visit/green-fees` | 12-club reciprocal fee table | Captured — verify facts first | Page never states who fees apply to — confirm audience before placement. MDGC's own visitor fees must be sourced from club |
| `/copy-of-affiliated-clubs-old-1` | Affiliated clubs \| mdgc | `/membership/affiliated-clubs` (+ partner-resorts section) | Taj / Coorg Wilderness / Danta resort discounts | Captured — verify facts first | The 65 affiliated golf clubs list is NOT on this page — obtain from club. Resort discounts need current confirmation |
| `/tournaments` | Tournaments \| mdgc | `/tournaments/past-tournaments` (archive) | 13 tournaments, Apr 2022 – Jun 2023 | Captured — verify facts first | All entries → status `Archived`. Results/winners/sponsors from club records. `/tournaments` on new site shows only current/future events |
| `/rules-regulations` | (not extractable) | Split: `/golf/local-rules` + `/visit/dress-code` + `/clubhouse/clubhouse-etiquette` | All local rules, dress codes, marker colours, drop zones | **Manual capture required** | Golf committee must approve playing rules before launch; do not alter competitive meaning while rewording |
| `/gallery` | Gallery \| mdgc | `/clubhouse/gallery` | 8 photographs | Captured — verify facts first | Media audit per image (subject, resolution, rights) + descriptive alt text before reuse |
| `/rooms` | Rooms \| mdgc | `/stay` + `/stay/rooms` + `/stay/rates` | Room description, 3-tier tariff, booking contact | Captured — verify facts first | Expand to per-room-category records (8 chambers per history page); add policies, check-in/out, enquiry form |
| `/bar-dining` | Bar & Dining \| mdgc | `/clubhouse/dining` + `/clubhouse/bar` | 1-hour pre-order rule, reservation contacts | Captured — verify facts first | Hours, menus, eligibility all missing — source from club; add reservation form |
| `/contact` | Contact \| mdgc | `/contact` (directory) + `/visit/directions` (airports) | All departments/contacts; airports table | Captured — verify facts first | Consolidate into single CMS contact directory; resolve conflicting numbers/emails (see contact register) |
| `/news-letter-2022` | (404) | `/club/newsletters/2022` | 2022 newsletter | **Source material needed from club** | Live page already 404 |
| `/news-letter-2023` | (empty embed) | `/club/newsletters/2023` | 2023 newsletter | **Source material needed from club** | Page blank; obtain PDF |
| `/news-letter-2024` | News letter 2024 \| mdgc | `/club/newsletters/2024` | 2024 newsletter | **Source material needed from club** | Page blank; obtain PDF |
| (nav label) Club Profile | slug unknown (`/club-profile` 404s) | `/club/heritage` or `/clubhouse` | Unknown | **Manual capture required** | Find real slug via browser (site has no sitemap.xml) |
| (nav label) Downs Retreat | slug unknown (`/downs-retreat` 404s) | `/stay` | Unknown — likely parent of `/rooms`, `/bar-dining` | Manual check | Probably a dropdown label, not a page |

## New-site pages with NO legacy source (must be authored from club input)

| New URL | Needed content |
|---|---|
| `/visit/green-fees` | MDGC visitor green fees, caddy/buggy/rental charges, taxes, effective date |
| `/visit/visitor-information` | Who may play, handicap/ID requirements, booking rules |
| `/visit/plan-your-round` | Tee-time request flow (5 player categories) |
| `/golf/scorecard` | Full official scorecard (per-hole par, SI, tee distances) |
| `/golf/course-conditions` | "Today at Mercara Downs" status module |
| `/golf/coaching`, `/golf/practice-facilities`, `/golf/junior-golf` | Coaching/practice/junior programmes |
| `/membership/*` (overview, categories, privileges, application) | Membership structure and fees |
| `/tournaments` (upcoming) + registration | Current tournament calendar |
| `/stay/policies`, `/stay/stay-and-play` | Booking/cancellation policies, packages |
| `/clubhouse/facilities`, `/clubhouse/private-events` | Verified current facilities (incl. status of any 2024 expansion items) |
| `/club/committee` archive | Past committees, term dates |
| Legal: privacy policy, terms, cancellation policy | None exist on legacy site |
