export type IntelTag = "LAUNCH" | "COMPETITIVE" | "ANALYST" | "PROGRAM" | "PLAY";

export interface IntelItem {
  id: string;
  date: string; // ISO
  tag: IntelTag;
  headline: string;
  summary: string;
  source: string;
  pinned?: boolean;
}

/** Intel Feed — static JSON-driven; content updates are one-file edits here. */
export const INTEL: IntelItem[] = [
  {
    id: "fos80-launch",
    date: "2026-03-10",
    tag: "LAUNCH",
    headline: "FortiOS 8.0 announced at Accelerate 2026 — MCP/A2A visibility headlines",
    summary:
      "AI-aware application control (allow sanctioned GenAI tools, block risky actions inside them), FortiView for AI attack surface and shadow AI, OCR-enhanced DLP for images/screenshots, and network-layer Model Context Protocol + agent-to-agent traffic visibility. Only a handful of vendors can see MCP/A2A traffic at all — make it the headline in every AI conversation.",
    source: "Fortinet Accelerate 2026, Mar 10 2026",
    pinned: true,
  },
  {
    id: "cdw-assessment",
    date: "2026-04-15",
    tag: "ANALYST",
    headline: "CDW Canada 12-domain Security-for-AI assessment: Fortinet 8/12, Native in User AI Access Governance",
    summary:
      "Across 16 vendors and 192 assessments, Fortinet scores 1 Native + 7 Partial. The 6,500+ GenAI URL catalog is the largest in the comparison (Palo Alto ~4,000+, Cato ~950+). Gaps: AI-SPM, red teaming, resilience, supply chain — all partner-attach plays. Use the Domain Explorer for the full map.",
    source: "CDW Canada Service Strategy Development, Apr 2026",
    pinned: true,
  },
  {
    id: "fortiaigate-ga",
    date: "2026-02-02",
    tag: "LAUNCH",
    headline: "FortiAIGate GA: LLM guardrail chaining for customer-built AI apps",
    summary:
      "Prompt sanitization, guardrail chaining, anomaly detection, and output content filtering for AI-generated responses. Position for customers hosting their own LLM applications; pair with AI-SPM partners for posture depth.",
    source: "Fortinet product announcement",
  },
  {
    id: "pa-catalog",
    date: "2026-03-24",
    tag: "COMPETITIVE",
    headline: "Palo Alto pushes AI Access Security hard in enterprise accounts",
    summary:
      "Field reports of aggressive Prisma-led AI-governance bundling. Counter: catalog size (6,500+ vs ~4,000+), MCP/A2A visibility Prisma lacks at the network layer, and consolidation economics. Battlecard updated.",
    source: "CDW field intel",
  },
  {
    id: "qsr-pursuit",
    date: "2026-05-04",
    tag: "PLAY",
    headline: "Anchor pursuit archetype: 3,000+ site national retail/QSR SD-WAN, Canada + U.S.",
    summary:
      "CDW Canada bidding as prime with Fortinet Secure SD-WAN: zero-touch provisioning at scale, FEX-211G day-1 wireless WAN, national staging and rollout logistics, day-2 managed support. Use this archetype to frame every distributed-enterprise conversation. Details in Why CDW.",
    source: "CDW Canada pursuit team (anonymized)",
  },
  {
    id: "sdwan-mq",
    date: "2025-10-01",
    tag: "ANALYST",
    headline: "Fortinet again placed as a Leader for SD-WAN",
    summary:
      "Continued Leaders-quadrant placement for Secure SD-WAN strengthens the single-vendor SASE narrative vs. stitched competitors. Cite the placement, not the plot, in customer decks — verify current report year before quoting.",
    source: "Industry analyst placement — verify current edition",
  },
  {
    id: "sonicwall-window",
    date: "2026-04-20",
    tag: "PLAY",
    headline: "SonicWall displacement window: renewal cohort hits H2 2026",
    summary:
      "Mid-market SonicWall estates face renewals with no SASE path and no AI-aware controls. Migration Play ships with sizing-equivalence table and a free CDW migration assessment offer. Target: 40F/70F/90G class landings.",
    source: "CDW Canada partner desk",
  },
  {
    id: "spiff-q3",
    date: "2026-07-01",
    tag: "PROGRAM",
    headline: "Q3 accelerators live: G-series refresh + FortiSASE attach",
    summary:
      "Program window runs to Sep 30. Illustrative — confirm current SPIFF terms with the CDW Fortinet partner desk before committing numbers to a customer.",
    source: "Partner program — illustrative, confirm terms",
  },
];

/** Promo / SPIFF countdowns for the Command Deck. Illustrative — confirm terms. */
export interface Promo {
  id: string;
  name: string;
  endsAt: string; // ISO date
  detail: string;
}

export const PROMOS: Promo[] = [
  {
    id: "gseries-q3",
    name: "G-Series Refresh Accelerator",
    endsAt: "2026-09-30",
    detail: "Illustrative — confirm current terms with the partner desk.",
  },
  {
    id: "sase-attach",
    name: "FortiSASE Attach SPIFF",
    endsAt: "2026-09-30",
    detail: "Illustrative — confirm current terms with the partner desk.",
  },
];
