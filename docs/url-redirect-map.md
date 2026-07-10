# MDGC URL Redirect Map — 301 Permanent Redirects

Compiled: 10 July 2026. All redirects are HTTP 301 (permanent). Implement in Next.js `next.config` redirects (or at the edge). The legacy site has **no sitemap.xml** (robots.txt references one but it 404s), so this map is built from live navigation + known slugs; re-crawl Google's index (`site:mdgc.golf`) before launch to catch any indexed URL not listed here.

| # | Old path | New path | Status | Notes |
|---|---|---|---|---|
| 1 | `/` | `/` | 301 n/a | Same root; domain-level redirect only if domain changes |
| 2 | `/mdgc-history` | `/club/heritage` | 301 | |
| 3 | `/history` | `/club/heritage` | 301 | Two legacy history pages collapse into one canonical page |
| 4 | `/copy-of-affiliated-clubs-old-1` | `/membership/affiliated-clubs` | 301 | Junk `copy-of-*-old-1` slug retired |
| 5 | `/course-layout` | `/golf/course-guide` | 301 | |
| 6 | `/copy-of-green-fee` | `/golf/visitor-fees` | 301 | Page was noindex/empty; redirect kept for stray links. `/golf/visitor-fees` itself canonicalises to `/visit/green-fees` if IA settles there — pick ONE final canonical before launch |
| 7 | `/green-fee` | `/membership/affiliated-clubs` | 301 | Content is the reciprocal-club fee table. If club confirms table is visitor-facing instead, retarget to `/visit/green-fees` |
| 8 | `/tournaments` | `/tournaments` | 301 n/a | Path retained; legacy listing content lands at `/tournaments/past-tournaments` |
| 9 | `/rules-regulations` | `/golf/rules-and-etiquette` | 301 | Hub page linking the three split pages (`/golf/local-rules`, `/visit/dress-code`, `/clubhouse/clubhouse-etiquette`) |
| 10 | `/gallery` | `/clubhouse/gallery` | 301 | |
| 11 | `/rooms` | `/stay` | 301 | |
| 12 | `/bar-dining` | `/clubhouse/dining` | 301 | |
| 13 | `/contact` | `/contact` | 301 n/a | Path retained |
| 14 | `/news-letter-2022` | `/club/newsletters/2022` | 301 | Old URL already 404s; redirect still worth adding for external links |
| 15 | `/news-letter-2023` | `/club/newsletters/2023` | 301 | |
| 16 | `/news-letter-2024` | `/club/newsletters/2024` | 301 | |
| 17 | `/*?lightbox=*` | strip query → same path | 301 | Wix lightbox URLs (robots.txt disallows them; some may be indexed) |
| 18 | `/_partials*`, `/pro-gallery-webapp/*` | `410 Gone` or `/` | — | Wix internals; do not recreate |

## Pending additions (resolve during manual review)

| Old path | Issue |
|---|---|
| "Club Profile" nav item | Real slug unknown (`/club-profile` returns 404). Find via browser dev tools / Google index, then map to `/club/heritage` or `/clubhouse` |
| "Downs Retreat" nav item | `/downs-retreat` returns 404 — likely a dropdown label; confirm no real page exists |
| Any additional Wix pages found via `site:mdgc.golf` | Add rows before launch; goal is zero unmapped indexed URLs |

## Verification checklist before launch
- [ ] Crawl `site:mdgc.golf` in Google/Bing; every indexed URL has a mapped 301
- [ ] All redirects return exactly one hop (no chains, e.g. `/copy-of-green-fee` → final canonical directly)
- [ ] Canonical tags on new pages match redirect targets
- [ ] New sitemap.xml submitted in Search Console; legacy property retained to monitor crawl errors
