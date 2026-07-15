# Fortinet Partner Dashboard — Design Framework & 3 UI Directions

A design exploration for the next generation of the partner platform, inspired by
FortiSOC's fabric aesthetic and built for one audience: **people who sell
cybersecurity for a living**.

Open **`index.html`** for the gallery, or jump straight in:

| # | Prototype | One-liner |
|---|---|---|
| 1 | [`option-1-fabric-command.html`](option-1-fabric-command.html) | **Fabric Command** — the FortiSOC homage; revenue as a living fabric flowing into an attainment core |
| 2 | [`option-2-the-desk.html`](option-2-the-desk.html) | **The Desk** — a trading terminal for security deals; ticker tape, live book, expiry clocks |
| 3 | [`option-3-the-briefing.html`](option-3-the-briefing.html) | **The Briefing** — an executive morning memo; editorial, calm, ends in an action |

Everything is self-contained HTML/CSS/JS — no build step, no network calls. Open any
file directly in a browser.

---

## 1 · Who this is for (and what that changes)

Cybersecurity technology sellers are a specific crowd:

- **They think in quota math.** Attainment, coverage, pace, protection windows.
  The dashboard's first job is answering "where am I against my number?" in under
  two seconds — before any animation plays.
- **They respond to scarcity and clocks.** SPIFF deadlines, deal-registration
  expiry, price-list changes, EOL waves. Deadlines are first-class UI objects here
  (countdown clocks, expiring chips), not footnotes.
- **They speak SOC.** Severity chips, live indicators, fabric metaphors feel like
  home, not decoration. We borrow FortiSOC's language — *cases → deals, indicators
  → plays, assets → install base* — so the sales tool feels like the product they sell.
- **They perform for customers.** At least one face of the platform must be
  presentable in a QBR or on a demo floor without apology.

The three options are three different weightings of those four truths.

## 2 · Design principles (shared by all three)

1. **The number before the theater.** Ambient motion never sits between the seller
   and attainment/pipeline/protection. KPIs render immediately; animation happens
   around them.
2. **Motion communicates state, never decorates longer than it informs.**
   Three sanctioned motion classes:
   - *Ambient* (continuous, sub-1% attention): fabric flow, tape scroll, live dot.
   - *Transitional* (150–700 ms, cubic-bezier(.22,1,.36,1)): reveals, hovers, fills.
   - *Evidential* (~1.2 s, once): count-ups, row flashes on data change, meter fills.
   Everything honors `prefers-reduced-motion: reduce` — ambient stops, evidential
   snaps to final state.
3. **Severity is a reserved language.** good / warning / serious / critical use the
   fixed status palette with icon + label, never color alone, and never double as
   chart series.
4. **Fortinet red is chrome, not data.** In a security context a red data series
   reads as "breach." Red drives brand moments (CTAs, the FortiGate emphasis
   stream, alerts); teal/blue carries neutral data.
5. **Every chart is honest and reachable.** One axis, no donuts for comparison, a
   legend whenever there are ≥ 2 series, hover **and** keyboard tooltips, and a
   "View data" table twin under every chart.

## 3 · Validated color system

Palettes were computed, not eyeballed — all pass the dataviz six-checks validator
(lightness band, chroma floor, CVD ΔE, normal-vision floor, contrast) on their
actual surfaces:

| Role | Dark surfaces (`#0C1A20`, `#101014`) | Light surface (`#FAF9F7`) |
|---|---|---|
| Categorical (5 slots, fixed order) | `#189EC0 #D55181 #C98500 #9085E9 #199E70` | `#1187A8 #EDA100 #4A3AA7 #008300 #E87BA4` |
| Ordinal ramp (funnel stages) | `#14536A #186E8C #1E8AAD #2AA6CC #49C0E3` | `#7AB8C9 #54A0B4 #33879E #1C6D84 #0D5368` |
| Status (fixed, icon + label always) | `good #0CA30C · warning #FAB219 · serious #EC835A · critical #D03B3B` | same |
| Brand / chrome accent | Fortinet red `#E5484D`–`#FF4D42`, fabric teal `#35CBE8` | Fortinet red `#DA291C` |

Light-mode yellow and magenta sit in the contrast relief band (< 3:1), which is why
every chart ships a legend **and** a data table — the relief channel is structural,
not optional. Categorical slot order is the CVD-safety mechanism: never reorder or
cycle it, fold a 6th series into "Other."

## 4 · The module system (one IA, three skins)

All three prototypes draw from the same module inventory, so options can be mixed
after a decision:

| Module | What it answers | 1 | 2 | 3 |
|---|---|---|---|---|
| Attainment core / hero | Where am I against my number? | hex core | quota ladder | hero + meter |
| KPI spine | Pipeline, deals, renewals, bench | right rail | hero strip | side stats |
| Fabric map | What's flowing, from which pillar? | ● centerpiece | — | — |
| Deal book / watchlist | What moved today? | — | ● live table | — |
| Expiry board | What's about to lapse? | chips | ● countdowns | attention list |
| Funnel | Where does pipeline sit? | ● | — | ● |
| Product mix | What am I actually selling? | ● stacked bar | — | ● stacked bar |
| Bookings trend | Is the quarter shaped right? | quarterly cols | weekly cols | monthly line |
| Bench / certifications | Can we deliver what we sell? | KPI | — | ● ring + table |
| Intel / tape | What changed in the program? | — | ● tape + notes | — |
| Next best actions | What should I do right now? | — | desk notes | ● ranked cards |

The likely end state is not "pick one": **The Desk** as the daily driver, **Fabric
Command** as the presentation/lobby mode, **The Briefing** as the weekly digest and
QBR export. One data layer, three renderers.

## 5 · Implementation path (this repo)

The v1 app (Vite + React 19 + Tailwind 4 + Framer Motion) already has the right
bones — `CommandDeck`, typed data files, `CountUp`, `Ticker`, `FabricWeave`:

1. Lift the chosen option's tokens into Tailwind theme variables (`src/index.css`).
2. Port modules as components: fabric map → extend `FabricWeave` (SVG paths +
   Framer Motion); deal book → new `DealBook` fed by a typed `deals.ts`; charts →
   plain SVG components (no chart lib needed at this size), keeping tooltips,
   table twins, and reduced-motion guards.
3. Keep the data-honesty rules from the root README: illustrative figures labeled,
   no invented pricing.
4. Wire real numbers via the v2 endpoints noted there (CRM/PRM, feed API).

## 6 · Compliance notes

- Replaced the reference portal's donuts with stacked bars + tables (donuts hide
  close values; the seller comparison is exact share).
- No dual axes, no rainbow ramps, no color-only meaning anywhere.
- All figures marked *illustrative*; deadlines and SPIFFs are placeholders until
  confirmed with the partner desk.
