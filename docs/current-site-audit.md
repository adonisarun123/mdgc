# MDGC Current Site Audit — www.mdgc.golf

Audit date: 10 July 2026
Method: Remote fetch of each legacy URL (Wix-hosted site, confirmed via robots.txt "Auto generated, go to SEO Tools > Robots.txt Editor" and Wix meta generator tags).
Fetch limitation: two pages (`/mdgc-history`, `/rules-regulations`) return HTTP 200 but their body content is rendered client-side or embedded as images and could not be extracted after two attempts each. These require a manual browser review before content migration.

---

## 1. Page-by-Page Audit Table

| # | URL | HTTP status | Page title | Purpose | New destination URL | Migration status |
|---|-----|-------------|------------|---------|---------------------|------------------|
| 1 | `/` | 200 | `Home | mdgc` | Homepage: hero claim, committee, announcement, testimonials, room tariffs | `/` | Content captured; rewrite required |
| 2 | `/mdgc-history` | 200 | `History of MDGC | mdgc` | Club history (long-form) | `/club/heritage` | **Body not extractable remotely — manual capture needed** |
| 3 | `/history` | 200 | `Club History | mdgc` | Club history (duplicate/second history page) | `/club/heritage` | Narrative captured; verify + rewrite |
| 4 | `/copy-of-affiliated-clubs-old-1` | 200 | `Affiliated clubs | mdgc` | Affiliated resorts (discount partners) | `/membership/affiliated-clubs` | Captured; poor URL, redirect |
| 5 | `/course-layout` | 200 | `Course Layout | mdgc` | Course stats + all 18 hole descriptions | `/golf/course-guide` | Captured; highest-value page |
| 6 | `/copy-of-green-fee` | 200 (noindex) | `MDGC - Green Fees` | Green fee page — **effectively empty** (nav + contacts only, meta noindex) | `/golf/visitor-fees` (redirect) | No content to migrate |
| 7 | `/green-fee` | 200 | `MDGC - Green Fees` | Reciprocal green-fee table (12 clubs) | `/visit/green-fees` + `/membership/affiliated-clubs` | Captured; purpose ambiguous — verify |
| 8 | `/tournaments` | 200 | `Tournaments | mdgc` | Tournament list (2022–2023 only) | `/tournaments` (archive) | Captured; all entries stale |
| 9 | `/rules-regulations` | 200 | (not extractable) | Local rules + dress code | `/golf/local-rules`, `/visit/dress-code`, `/clubhouse/clubhouse-etiquette` | **Body not extractable remotely — manual capture needed** |
| 10 | `/gallery` | 200 | `Gallery | mdgc` | Photo gallery (8 images) | `/clubhouse/gallery` | Images identified; no alt text |
| 11 | `/rooms` | 200 | `Rooms | mdgc` | Downs Retreat rooms + tariffs | `/stay` | Captured |
| 12 | `/bar-dining` | 200 | `Bar & Dining | mdgc` | Dining/bar contacts + one policy line | `/clubhouse/dining` | Captured (thin) |
| 13 | `/contact` | 200 | `Contact | mdgc` | Contact directory + airports table | `/visit/directions` + contact directory | Captured |
| 14 | `/news-letter-2022` | **404** | — | Newsletter 2022 | `/club/heritage` newsletters archive | Page gone; source PDF needed from club |
| 15 | `/news-letter-2023` | 200 | (newsletter page) | Newsletter 2023 — **empty page / invisible embed** | Newsletter archive | No extractable content; source PDF needed |
| 16 | `/news-letter-2024` | 200 | `News letter 2024 | mdgc` | Newsletter 2024 — **empty page / invisible embed** | Newsletter archive | No extractable content; source PDF needed |
| 17 | `/sitemap.xml` | **404** | — | Sitemap | n/a | No sitemap despite robots.txt pointing to it |
| 18 | `/robots.txt` | 200 | — | Robots | n/a | Captured (see below) |
| 19 | `/club-profile` | **404** | — | "Club Profile" appears in navigation but this slug 404s | — | Locate real slug during manual review |
| 20 | `/downs-retreat` | **404** | — | "Downs Retreat" appears in navigation but this slug 404s | — | Locate real slug during manual review |

Navigation menus observed on live pages also list: **Home, History of MDGC, Club Profile, Club History, Affiliated clubs, Golfing, Course Layout, Green Fee, Tournaments, Rules & Regulations, Gallery, Downs Retreat, Rooms, Bar & Dining, Contact**. "Club Profile", "Golfing" and "Downs Retreat" appear to be dropdown group labels or pages whose slugs were not discoverable (no sitemap exists to confirm).

---

## 2. robots.txt (verbatim)

```
User-agent: *
Allow: /
Disallow: *?lightbox=

# Optimization for Google Ads Bot
User-agent: AdsBot-Google-Mobile
User-agent: AdsBot-Google
Disallow: /_partials*
Disallow: /pro-gallery-webapp/v1/galleries/*

# Block PetalBot
User-agent: PetalBot
Disallow: /

# Crawl delay for overly enthusiastic bots
User-agent: dotbot
Crawl-delay: 10
User-agent: AhrefsBot
Crawl-delay: 10

Sitemap: https://www.mdgc.golf/sitemap.xml

# Auto generated, go to SEO Tools > Robots.txt Editor to change this
```

**Finding:** robots.txt declares `https://www.mdgc.golf/sitemap.xml` but that URL returns 404. Search engines have no sitemap for this site.

---

## 3. Narrative Findings by Page

### 3.1 Homepage (`/`)
- Title is the generic `Home | mdgc` — exactly the pattern the rebuild must replace.
- Hero/headline text (verbatim, including errors): **"18 HOLES, 70 PAR G0LF COURSE , ONE AMONG THE BEST HILL STATION GOLF COURSES IN INDIA"**
  - "G0LF" is spelled with a zero instead of the letter O.
  - Stray space before the comma; full uppercase paragraph; "ONE AMONG THE BEST" is exactly the promotional phrasing the editorial standards prohibit.
- **Announcement section is an empty table** (columns "Announcements" / "updated date", no rows with content) — dead UI shipped to visitors.
- **Testimonials section contains one name and no testimonial**: "Mr. Sunil Bhaskaran CEO and MD at AirAsia India" with no quote text. (Also factually stale: AirAsia India ceased operating under that brand after its merger into Air India Express.)
- "Play Golf like a Pro" copy (verbatim): *"The professional staff are on hand at all times to make all members feel welcome making sure they thoroughly enjoy the game. Our extensive learning center is open all year round."* — generic template copy; "extensive learning center" is an unverified facility claim.
- Room tariffs shown on the homepage under heading "ROOMS TARIFFS": GUEST ₹4000, MEMBER GUEST ₹3500, CLUB MEMBERS ₹2500, each "Tax - 12%". **These are room tariffs, not green fees** — the placement invites confusion, and no effective date is given. Duplicated on `/rooms`.
- Committee list (see contact register) has designations for only three officers; six names have no designation. No President listed. No term dates, no photos captioned.
- Footer: "© 2020 by MDGC Club. Proudly created by Quality Softwares, Kushalnagar" — copyright year six years stale.

### 3.2 History pages (`/mdgc-history` and `/history`) — duplicate content risk
Two separate history pages exist. `/history` (title `Club History | mdgc`, heading "HISTORY OF MDGC") yielded the narrative below; `/mdgc-history` (title `History of MDGC | mdgc`) exists but its body would not extract remotely — it must be captured manually and diffed against `/history` before either is migrated.

Narrative captured from `/history` (key passages verbatim):
- Early 1890s: *"a group of Englishmen clear-felled the area which was destined to become the Mercara Downs Golf Club."*
- By the turn of the century the course attracted increasing patronage; WWI brought military officers who boosted its popularity; by WWII *"one could see a sprinkling of Indians, both civilians, and officers alike, on the course."*
- Post-WWII: *"the exodus of British officers, Independent India came into being and the archives lost its most valuable records."*
- 1951: *"incorporated as an extension of the North Coorg Club"*; operated independently only from *"the early 80s."*
- Facilities: *"18 hole Golf Course spread over 100 acres"* with a clubhouse and *"eight chambers called 'Mercara Down's Retreat.'"* (note the erratic apostrophe: "Down's")
- Affiliations: *"65 clubs in India"* plus Nuwara Eliya (Sri Lanka) and Noosa Springs (Australia).

Issues: the 1890s claim, 1951 incorporation, "early 80s" independence, 100-acre figure and 65-club affiliation count are all unverified; the site itself admits the archives were lost. Use careful language ("Golf has been played on the Mercara Downs since the late nineteenth century") until documented.

### 3.3 Course Layout (`/course-layout`) — highest-value page
Course data block (verbatim as displayed):
- Altitude: **915 meters | 3000 feet**
- Coordinates: **12.9547° N, 77.6455° E**
- Grass: Greens — **Tiff Dwarf**; Fairways & Roughs — **Hybrid Bermuda**
- Course Par: **70**
- Length: Men **5500 Yards**; Ladies **4362 Yards**

**Critical inaccuracy:** 12.9547° N, 77.6455° E is in **Bengaluru** (roughly the Domlur/Indiranagar area), ~250 km from Madikeri. Madikeri is approximately 12.42° N, 75.73° E. The published coordinates are wrong and must not be migrated. The altitude (915 m) is also questionable — Madikeri town sits around 1,100–1,170 m; the figure needs survey/club confirmation.

All 18 hole names present and matching expectations: Fort Knox, Downs View, Blinder, Upper Crest, Leveller, Misty, Lapwing Nest, The Pride, Runway, Power Play, Rush Hour, Captain's Hole, Un Macho, Deceptive, Boomerang, Waterloo, Guts & Glory, Pressure. Full per-hole content is inventoried in `content-inventory.md`. Pars are stated per hole; only scattered yardages appear (Hole 2: 130–160 yds; Hole 8: 197 yds; Hole 17: 250 yds; Hole 18 carries: water 120 yds / OB 130 yds); **no stroke indexes and no full scorecard are published anywhere on the site**.

Grammar problems noted in hole text: "Do NOT want to belong on this hole" (Hole 9 — likely "be long"); "tough green to put on" (Hole 18 — should be "putt"); inconsistent capitalisation throughout.

### 3.4 Green fee pages — a mess of duplicates
- `/copy-of-green-fee` (title `MDGC - Green Fees`) is **noindex and contains no fee content at all** — only nav and footer contacts. A visitor landing here learns nothing.
- `/green-fee` (same title) carries a 12-row table (No. / Club / Week Days / Week End / GST / Total) — full table in `content-inventory.md`. **The page never states who these fees apply to.** The structure (fees at Coorg Golf Links, Bombay Presidency, Bangalore Golf Club etc.) strongly suggests these are the fees **MDGC members pay at reciprocal clubs**, not visitor fees at MDGC — but this is an inference and must be confirmed.
- **Nowhere on the site is MDGC's own visitor green fee, caddy charge, buggy charge or rental-set charge published.** This is the single largest commercial content gap.

### 3.5 Tournaments (`/tournaments`)
13 tournaments listed, spanning April 2022 – June 2023 (full list in inventory). No dates beyond month/year, no sponsors, no entry fees, no draws, no results, no winners. **Nothing from 2024, 2025 or 2026** — the page is 3 years stale and every entry would appear as a past event. Must migrate to an archive, never to "upcoming".

### 3.6 Rules & Regulations (`/rules-regulations`)
Page exists (HTTP 200) but body content would not extract remotely after two attempts — content is likely client-rendered or presented as images. **Manual browser capture required.** Per project instructions this page is known to mix course dress code, clubhouse dress code, dining dress code, local rules, marker colours and drop-zone instructions; it must be split into `/golf/local-rules`, `/visit/dress-code`, `/clubhouse/clubhouse-etiquette`, with the golf committee approving playing rules before launch.

### 3.7 Gallery (`/gallery`)
Eight images in a grid: `IMG_2567.jpg`, `IMG_2578.jpg`, `IMG_2451.jpg`, `IMG_2442.jpg`, `IMG_2427.jpg`, `IMG_2329.jpg`, `IMG_2377.jpg`, `4.jpg`. **No captions, no descriptive alt text** — filenames are camera defaults, exactly the accessibility/SEO failure the rebuild must fix. Subjects, resolution, copyright and usage permission all need manual audit (see content-gaps.md).

### 3.8 Rooms (`/rooms`)
Room description (verbatim): *"The fully furnished double bedroom features an LCD TV, air conditioning, table, and chair, attached modernized bathroom, overlooking the course or garden views."*
Tariffs: GUEST ₹4000 / MEMBER GUEST ₹3500 / CLUB MEMBERS ₹2500, all "Tax - 12%". Booking: Mr. Sachin — 7760032366, 8618647397.
Issues: single generic description for what `/history` says are **eight** chambers; no room categories, capacities, bed types, check-in/out times, cancellation policy, or effective date for tariffs; tariffs duplicated on homepage (two places to fall out of sync).

### 3.9 Bar & Dining (`/bar-dining`)
Only substantive policy line (verbatim): *"Note: The food and table must be ordered at least 1 hour prior to the desired timings."*
Reservation contacts: Mr. Umesh — 9740743943; Mr. Thimmanna — 9741772918.
No opening hours, no menu, no eligibility rules, no bar timings. Phone-number-only presentation — the pattern the rebuild replaces with structured dining content and a reservation form.

### 3.10 Contact (`/contact`)
Richest contact source, but chaotic (full register in `contact-verification-register.md`). Notable problems:
- **Five different email addresses** across the site: rm.downsretreat@gmail.com, mercaradownsgolfclub@hotmail.com, belurclub@gmail.com, mercaradowns@gmail.com — plus `belurclub@gmail.com` listed under MDGC dining looks like another club's address pasted in error (Belur Club, Somwarpet appears in the green-fee table as a separate club).
- **Ms. Sujatha (Account Manager) and Mr. Umesh (dining) share the same number** 9740743943 — at least one is wrong.
- Contact page shows 6360063918, a number appearing nowhere else; other pages show 8618647397 in its place.
- Airports table: Kannur 90.5 km, Mysore Mandakalli 130.6 km, Mangalore 243.8 km, Bangalore 289.7 km — distances only, no journey times; all need route verification.

### 3.11 Newsletters
- `/news-letter-2022`: **404** — the 2022 newsletter is already lost from the live site.
- `/news-letter-2023` and `/news-letter-2024`: pages load but display **no visible newsletter content** — apparently blank pages with an invisible/failed document embed. Source PDFs must be obtained directly from the club; do not attempt to migrate from these pages.

---

## 4. Cross-Site Issues Summary

1. **Duplicate content:** two history pages; two green-fee pages; room tariffs on two pages; contact block repeated in every footer with inconsistencies against the contact page.
2. **Stale content:** tournaments end June 2023; © 2020 footer; AirAsia India testimonial attribution; empty announcements table.
3. **Wrong facts:** course coordinates point to Bengaluru; altitude questionable; no source for 1890s/1951/100-acre/65-club claims.
4. **Missing commercial content:** no MDGC visitor green fees, caddy/buggy/rental charges, membership fees, dining hours, room policies, or effective dates on any price.
5. **Grammar/spelling:** "G0LF" (zero for O), "belong" for "be long", "put" for "putt", "Mercara Down's Retreat" apostrophe, "Coorg wilderness Resort" capitalisation, all-caps headline, stray spaces before punctuation.
6. **SEO:** no sitemap (despite robots.txt reference), generic `| mdgc` title pattern, noindex on a money page (`/copy-of-green-fee`), `copy-of-*` junk slugs, camera-filename images without alt text.
7. **Accessibility:** image-only content on at least two pages (history, rules), no alt text, empty data tables rendered to users.
8. **Facilities described in project brief as "expected 2024" (pool, gym, simulator, billiards, multi-utility hall, expanded clubhouse) were not found in the remotely-extractable text** — they likely live on the unextractable `/mdgc-history` page, an undiscovered "Club Profile" page, or in imagery. Manual review required; current operational status must come from the club regardless.
