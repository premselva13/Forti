# The Fabric Exchange

**CDW Canada × Fortinet partner portal** — a trading terminal for security deals, not a resource center. Built for CDW sellers, solution architects, and Fortinet field reps who need the right talk track, battlecard, sizing band, and quote request in under 90 seconds.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · React Router (hash routing — deploys to any static host).

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build → dist/
npm run preview  # serve the production build
```

## Map

| Route | Module |
| --- | --- |
| `/` | **Command Deck** — stats, pillar tiles, featured plays, program clocks, intel |
| `/security-for-ai` | **Pillar 1** — AI Security Domain Explorer (12-domain CDW assessment) |
| `/sase-sd-wan` | **Pillar 2** — SD-WAN Deal Sizer + anchor 3,000-site pursuit archetype |
| `/tools/battlecards` | Battlecard Engine (they say / we say / proof / landmine) |
| `/tools/skus` | SKU Navigator with lifecycle + successor flags |
| `/tools/migrations` | Migration plays: SonicWall→FortiGate, Meraki→Fortinet, VPN→ZTNA |
| `/learn` | Seller Track — elevator → discovery → SE deep dive (progress in localStorage) |
| `/deal-desk` | Deal registration + quote request; emits CRM-ready payload preview (no backend in v1) |
| `/why-cdw` | The co-sell pitch inverted, for Fortinet field |
| `/intel` | Intel Feed — static JSON-driven ticker stream |

Global search: **⌘K / Ctrl-K** — reaches SKUs, battlecards, domains, lessons, and plays.

## Editing content

All content lives in typed data files — no component edits needed:

- `src/data/domains.ts` — 12-domain AI assessment (source: CDW Canada, Apr 2026)
- `src/data/battlecards.ts` — competitive cards
- `src/data/skus.ts` — SKU catalog + lifecycle flags
- `src/data/intel.ts` — intel feed + promo clocks
- `src/data/lessons.ts` — learn tracks
- `src/data/migrations.ts` — displacement plays

## Data honesty rules

- No invented pricing anywhere; every sizing output is labeled directional/illustrative.
- Assessment figures cite the CDW Canada 12-domain comparison (Apr 2026).
- SPIFF/promo entries are marked illustrative until confirmed with the partner desk.

## v2 wiring points

- `DealDesk` payload preview → POST to CRM/PRM endpoint
- `store.ts` localStorage hooks → user profile service
- `intel.ts` → CMS or feed API
