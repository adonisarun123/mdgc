# Mercara Downs Golf Club — Website

A complete rebuild of [mdgc.golf](https://www.mdgc.golf/) as a Next.js application with a
staff-editable CMS. This is not a visual redesign of the legacy site: it is a content audit,
factual verification exercise, IA redesign, editorial rewrite and platform migration.

## Stack

- **Next.js 16** (App Router, Server Components, Turbopack)
- **Payload CMS 3** — admin panel at `/admin`, runs inside the same Next.js app
- **PostgreSQL** (local for dev; point `DATABASE_URL` at Supabase or any Postgres in production)
- **Tailwind CSS 4**, TypeScript strict mode, Zod-validated server actions
- Self-hosted fonts (Fraunces + Inter via Fontsource)

## Getting started

```bash
cp .env.example .env       # fill in DATABASE_URL + PAYLOAD_SECRET
npm install
npx payload migrate        # create the database schema
npx payload run src/seed.ts  # optional: load audited legacy content (all marked pending verification)
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin` to create the
first admin user.

## The verification model — read this before editing content

Nothing from the legacy website is treated as fact. Fact-bearing records (course holes, course
info, tariffs, rooms, affiliated clubs, tournaments) carry a `verification` group:

- `pending` — migrated from the legacy site or otherwise unconfirmed. The frontend hides the
  fact or renders neutral language instead. **Never** shown as fact publicly.
- `verified` — confirmed by the club, with verifier and date recorded.

Additional guards:

- **Tariffs** require an effective date, tax note, review date and content owner. A rate whose
  review date has passed disappears from the site automatically until re-confirmed.
- **Contacts** live in one directory; only `publicStatus: public` records render. Personal
  staff numbers stay internal unless explicitly approved.
- **Committee members** move to an archive (`memberStatus: former`) instead of being deleted.
- Known-bad legacy data (Bengaluru coordinates, questionable 915 m altitude) was deliberately
  **not** migrated — see `docs/factual-verification-register.md`.

## Documentation

The audit that drives the migration lives in `docs/`:

| File | Purpose |
| --- | --- |
| `current-site-audit.md` | Page-by-page audit of the legacy site |
| `content-inventory.md` | All reusable legacy content, by topic |
| `content-migration-map.md` | Old URL → new URL → status |
| `url-redirect-map.md` | 301 redirect table (mirrored in `next.config.ts`) |
| `factual-verification-register.md` | Every fact awaiting club sign-off |
| `contact-verification-register.md` | Every phone/email found, verification status |
| `content-gaps.md` | Information the new site needs that the old site lacked |

## Launch gate

The site must not launch until the club signs off the items in
`docs/factual-verification-register.md` — coordinates, scorecard, hole names, fees, tariffs,
contacts, committee, history claims, policies. The seeded pars sum to 68 against a published
course par of 70; resolve against the official scorecard before verifying course data.
