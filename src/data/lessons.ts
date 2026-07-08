export type TrackId = "ai" | "sase";
export type LessonLevel = "Elevator · 5 min" | "Discovery call · 20 min" | "SE deep dive";

export interface Lesson {
  id: string;
  track: TrackId;
  level: LessonLevel;
  title: string;
  minutes: number;
  points: string[]; // the lesson body, seller-ready
  discoveryQuestions: [string, string, string];
  objection: { theyObject: string; youAnswer: string };
}

export const LESSONS: Lesson[] = [
  // ————— PILLAR 1: Security for AI —————
  {
    id: "ai-elevator",
    track: "ai",
    level: "Elevator · 5 min",
    title: "The 60-second Security-for-AI pitch",
    minutes: 5,
    points: [
      "Every customer already has an AI problem: employees are using GenAI tools nobody sanctioned, with company data in the prompts. That's shadow AI, and it's governance — not blocking — that fixes it.",
      "Fortinet's answer starts at the network layer the customer may already own: FortiAI-Protect catalogs 6,500+ GenAI URLs — the largest catalog in CDW's 16-vendor comparison — with shadow-AI detection and real-time user coaching.",
      "FortiOS 8.0 (March 2026) adds the headline: visibility into MCP and agent-to-agent traffic. Only a handful of vendors can see AI agents talking to each other at the network layer.",
      "Position honestly: Fortinet is Native in User AI Access Governance, wide (8 of 12 domains) elsewhere — and CDW pairs partners into the gaps (AI-SPM, red teaming, resilience). That honesty is the wedge that makes CDW the advisor, not the reseller.",
    ],
    discoveryQuestions: [
      "How many GenAI tools do you think are in use in your company right now — and how would you check?",
      "Do you want to block AI or govern it?",
      "Are any teams experimenting with AI agents or MCP yet?",
    ],
    objection: {
      theyObject: "\"We already blocked ChatGPT at the firewall. Problem solved.\"",
      youAnswer:
        "Blocking one URL created your shadow-AI problem — users moved to the other 6,499 tools you can't see. Governance means allowing the sanctioned tool, coaching the user in the moment, and blocking the risky action inside the app. That's what AI-aware application control in FortiOS 8.0 does, and a two-week discovery report will show you exactly what's flowing today.",
    },
  },
  {
    id: "ai-discovery",
    track: "ai",
    level: "Discovery call · 20 min",
    title: "Running the AI-risk discovery call",
    minutes: 20,
    points: [
      "Open with the assessment frame: CDW evaluates AI security across 12 domains, from asset discovery to safety. It de-vendorizes the conversation and positions CDW as the assessor.",
      "Map their estate: consuming AI (SaaS GenAI) → lead FortiAI-Protect + FortiOS 8.0 app control. Building AI (own LLM apps) → add FortiAIGate guardrails + FortiDLP prompt-layer masking. Deploying agents → MCP/A2A visibility is your differentiator.",
      "Quantify shadow AI: propose a two-week egress discovery (FortiGate eval or existing estate). The report — apps, users, data categories, geos — writes the business case for you.",
      "Name the gaps before they ask: AI-SPM, red teaming, resilience/recovery. Then attach CDW partners. 'Where Fortinet leads / where we pair' is a slide, not a secret.",
      "Close on a domain: pick the reddest tile in the Domain Explorer conversation and book the follow-up on that single domain with the right SE.",
    ],
    discoveryQuestions: [
      "Which describes you: consuming AI, building AI, or deploying agents — or all three?",
      "If we handed your CISO a shadow-AI report in two weeks, what would they do with it?",
      "Who owns AI risk today — security, data, legal, or nobody?",
    ],
    objection: {
      theyObject: "\"We're waiting for the AI security market to mature before buying anything.\"",
      youAnswer:
        "Waiting is a decision to run ungoverned AI. The mature move is layering: govern user access now (that's Native, GA, shipping), get agent visibility as a FortiOS 8.0 upgrade you may already be entitled to, and hold the immature categories — that's exactly the wide-vs-deep honesty in CDW's 12-domain assessment. You don't have to buy the future; you have to see the present.",
    },
  },
  {
    id: "ai-deepdive",
    track: "ai",
    level: "SE deep dive",
    title: "SE deep dive: the Fortinet AI security stack, domain by domain",
    minutes: 45,
    points: [
      "D10 (Native): FortiAI-Protect — 6,500+ AI URL catalog with use case, model, geolocation context; shadow-AI detection; real-time user coaching; zero-trust GenAI access. FortiOS 8.0 AI-aware app control distinguishes tool from action: allow ChatGPT, block file upload into it.",
      "D11 (Partial, strategic): FortiOS 8.0 parses MCP and A2A flows at the network layer — inventory of agent activity, app↔agent↔tool interactions. It's visibility today, not entitlement mapping or rollback; roadmap conversation for full governance.",
      "D1/D2 plumbing: FortiView for AI (attack surface + shadow AI dashboards); FortiDLP masks sensitive data pre-LLM; OCR-DLP catches image/screenshot exfil — demo this, it lands.",
      "D4/D12 (FortiAIGate): guardrail chaining, prompt sanitization, anomaly detection inbound; output sanitization and content filtering outbound. Know the honest bar: purpose-built AI firewalls (Cisco AI Defense, Lakera, Falcon AIDR) publish higher efficacy — sell FortiAIGate as Fabric-integrated, not benchmark-topping.",
      "Gaps to architect around: D5 AI-SPM, D7 resilience, D8 red teaming, D9 supply chain. Reference architectures should show the partner product in the diagram — customers trust a design that names its seams.",
      "Sizing note: AI URL filtering and app control ride existing FortiGate licensing (UTP/ENT); FortiAIGate and FortiDLP are separate line items. Check entitlement before quoting new boxes.",
    ],
    discoveryQuestions: [
      "What model families and hosting patterns (API, VPC, on-prem) do your AI apps use?",
      "Do your agents authenticate as users, service accounts, or nothing?",
      "What logging pipeline would MCP/A2A flow records land in — SIEM ready?",
    ],
    objection: {
      theyObject: "\"FortiAIGate benchmarks below the dedicated AI firewalls. Why not buy best-of-breed?\"",
      youAnswer:
        "If detection efficacy on a standalone benchmark is the whole decision, buy the specialist — and we'll sell it to you, because CDW carries them. But run the full architecture: the specialist needs traffic steering, policy integration, logging, and enforcement points — which is the FortiGate estate you already run. Most customers land on Fabric-integrated guardrails for the 80% and a specialist where the risk concentrates. That's a design decision, and it's exactly the conversation the 12-domain assessment structures.",
    },
  },
  // ————— PILLAR 2: SASE & SD-WAN —————
  {
    id: "sase-elevator",
    track: "sase",
    level: "Elevator · 5 min",
    title: "The 60-second SD-WAN/SASE pitch",
    minutes: 5,
    points: [
      "One sentence: Fortinet converges routing, security, and SD-WAN in one OS on one box — so a 3,000-site rollout is a logistics problem, not an integration project. CDW does national logistics for a living.",
      "The bolt-on tax: every competitor either bolts security onto SD-WAN (Meraki licenses, Cato thin sockets) or bolts SD-WAN onto security (Zscaler needs someone's edge). FortiGate ships both, ASIC-accelerated, in the base platform.",
      "FortiSASE extends the same policy to users off-network: SWG, ZTNA, CASB, FWaaS — one agent (FortiClient), one console with the on-prem estate. Single-vendor SASE, not a stitched narrative.",
      "Proof point: CDW Canada's anchor pursuit archetype — 3,000+ site national retail/QSR across Canada and the U.S., zero-touch provisioned, staged and deployed by CDW.",
    ],
    discoveryQuestions: [
      "How many sites, and what does truck-roll cost you per site today?",
      "When a branch circuit degrades at 2pm, what happens to your POS / voice traffic?",
      "Are remote users on the same security policy as branch users — or a different stack?",
    ],
    objection: {
      theyObject: "\"SD-WAN is a commodity. We'll take the cheapest bid.\"",
      youAnswer:
        "The overlay is a commodity; the security stack riding it is not. The cheapest SD-WAN bid arrives without NGFW at the edge, and you'll buy that separately — different vendor, different console, different renewal. Price the five-year converged TCO with the security line included and Fortinet usually wins the 'cheapest bid' too. We can build that comparison this week from the Deal Sizer.",
    },
  },
  {
    id: "sase-discovery",
    track: "sase",
    level: "Discovery call · 20 min",
    title: "Discovery for distributed enterprise: sites, circuits, seats",
    minutes: 20,
    points: [
      "Get the four numbers that size everything: site count (by class: micro/branch/hub), bandwidth per site, HA requirement per class, and remote/hybrid user count for SASE seats. The Deal Sizer turns these into a model band in 60 seconds.",
      "Ask about the underlay: dual ISP? LTE/5G backup? FortiExtender 211G makes day-1 connectivity a SKU, not a project plan — decisive in retail rollouts where circuit lead times slip.",
      "Surface the operations pain: how many consoles run the WAN today? Who owns firewall policy vs. routing? Convergence sells to the operations lead, not just the architect.",
      "Position CDW's delivery: staging + configuration + logistics + deployment + day-2. In multi-thousand-site pursuits the services bench is the differentiator — Fortinet brings the platform, CDW brings the rollout machine.",
      "Always leave with a Deal Sizer output and a registered deal. Speed to quote wins these.",
    ],
    discoveryQuestions: [
      "Walk me through your site classes — how many micro, branch, hub — and what's in the rack today?",
      "What's your target for zero-touch: can a store manager plug this in?",
      "What broke during your last WAN outage, and what did it cost?",
    ],
    objection: {
      theyObject: "\"We're already deep into a Meraki estate. Switching costs are too high.\"",
      youAnswer:
        "Switching costs cut both ways: your next Meraki renewal is a switching cost too — advanced security licenses, per-feature add-ons, and a separate answer for SASE. The Meraki→Fortinet migration play runs site classes in waves behind zero-touch provisioning, so the switch rides your refresh cycle instead of fighting it. CDW has run exactly this displacement at national scale; ask us for the reference architecture.",
    },
  },
  {
    id: "sase-deepdive",
    track: "sase",
    level: "SE deep dive",
    title: "SE deep dive: architecture for the 3,000-site rollout",
    minutes: 45,
    points: [
      "Reference topology: FG-40F/70F at micro-sites, FG-90G/91G performance branches, FG-120G/121G large sites, FG-200G-class hub pairs per region. Overlay: ADVPN for branch-to-branch; per-application steering with SLA probes on every underlay.",
      "Zero-touch at scale: FortiZTP + FortiManager templates; device ships to site with nothing but a serial number claimed. CDW staging pre-stages SD-WAN profiles so the in-store step is power + WAN.",
      "Wireless WAN: FEX-211G dual-SIM for day-1 turn-up and circuit backup; 511G where wireless is primary. Model the failover policy explicitly — retail POS gets the protected queue.",
      "FortiSASE integration: same policy objects extended to remote users; thin-branch mode for sites too small for a FortiGate. One FortiClient agent covers ZTNA + SASE posture.",
      "Licensing architecture: UTP on internet-edge branches; ATP where no direct internet breakout; Enterprise bundle for OT-adjacent (fuel, QSR kitchen systems). FortiSASE seats banded by volume tier.",
      "Day-2 model: FortiManager/FortiAnalyzer centralized ops, CDW managed-services wrap available — this is the line that wins against box-only bids.",
    ],
    discoveryQuestions: [
      "What's the real per-site change window — overnight retail freeze calendars included?",
      "Which apps get the protected SLA class — POS, voice, video, SaaS?",
      "Where do logs live: FortiAnalyzer on-prem, cloud, or customer SIEM?",
    ],
    objection: {
      theyObject: "\"Single-vendor everything is a lock-in risk. We want best-of-breed per layer.\"",
      youAnswer:
        "Lock-in risk is real — measure it against integration risk, which shows up as outages and finger-pointing between four vendors at 2am. Fortinet's convergence is one throat to choke at the edge, while standards (BGP, IPsec, SAML) keep the exits open. And note what we're not saying: CDW is multi-vendor by design — where best-of-breed genuinely wins a layer, we'll put it in the design. That's the same honesty we bring to the AI portfolio.",
    },
  },
];

export const TRACKS: { id: TrackId; name: string; tagline: string }[] = [
  {
    id: "ai",
    name: "Security for AI",
    tagline: "The growth story — govern shadow AI, see agent traffic, attach partners into the gaps.",
  },
  {
    id: "sase",
    name: "SASE & Secure SD-WAN",
    tagline: "The scale story — one OS from branch to cloud, provisioned by the thousand.",
  },
];
