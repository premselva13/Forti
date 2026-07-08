export interface Battlecard {
  id: string;
  competitor: string;
  arena: "SASE / SD-WAN" | "Security for AI" | "NGFW / Refresh";
  theySay: string;
  weSay: string;
  proof: string[];
  landmine: string; // the question to plant
}

export const BATTLECARDS: Battlecard[] = [
  {
    id: "palo-alto",
    competitor: "Palo Alto Networks",
    arena: "Security for AI",
    theySay:
      "\"Precision AI and AI Access Security make us the platform for securing AI — Prisma covers your SASE too.\"",
    weSay:
      "Fortinet's GenAI catalog is measurably larger — 6,500+ AI URLs vs. Palo Alto's ~4,000+ — and FortiOS 8.0 adds MCP/A2A traffic visibility that Prisma doesn't surface at the network layer. And the economics: one OS on your own ASIC-accelerated hardware vs. a platform priced like three.",
    proof: [
      "6,500+ vs ~4,000+ GenAI URL catalog (CDW Canada 12-domain assessment, Apr 2026)",
      "Both score Native in User AI Access Governance — Fortinet wins catalog breadth",
      "FortiOS 8.0 MCP/A2A visibility: one of a handful of vendors, GA March 2026",
      "Single-OS FortiGate consolidation vs. Panorama + Prisma + add-on licensing",
    ],
    landmine:
      "Ask them to show agent-to-agent and MCP traffic on the Prisma console — then ask what the three-year renewal looks like.",
  },
  {
    id: "cisco-meraki",
    competitor: "Cisco / Meraki",
    arena: "SASE / SD-WAN",
    theySay:
      "\"You're a Cisco shop. Meraki is simple, Catalyst is proven, and it's all one Cisco story now.\"",
    weSay:
      "Which Cisco story — Meraki, Catalyst SD-WAN (Viptela), or Secure Connect? That's three dashboards and a migration between Cisco products. Fortinet is one OS from branch firewall to SD-WAN to SASE, with NGFW security in the base platform instead of a license ladder.",
    proof: [
      "Single FortiOS image across FortiGate; SD-WAN included, no per-feature licensing",
      "Meraki advanced security requires MX Advanced Security license; Fortinet ships NGFW-grade inspection natively",
      "Zero-touch provisioning at multi-thousand-site scale, proven in national retail rollouts",
    ],
    landmine:
      "Ask which of the three Cisco SD-WAN platforms they're being quoted — and what the roadmap says about the other two.",
  },
  {
    id: "zscaler",
    competitor: "Zscaler",
    arena: "SASE / SD-WAN",
    theySay:
      "\"Cloud-native SSE is the future. Hardware firewalls are legacy. Route everything through our cloud.\"",
    weSay:
      "Zscaler still needs something at the branch to get traffic to their cloud — usually somebody else's SD-WAN. FortiSASE gives you the same SWG/ZTNA/CASB cloud stack, but converged with the FortiGate you run at the edge: one agent (FortiClient), one policy plane, no traffic tax on east-west or OT flows that never should have gone to a cloud POP.",
    proof: [
      "FortiSASE + FortiGate: single policy plane on-prem and cloud; Zscaler requires a separate SD-WAN vendor",
      "One agent (FortiClient) for ZTNA + SASE + EPP hooks vs. Zscaler Client Connector + a second stack",
      "Local internet breakout with full NGFW at the branch — no hairpin for latency-sensitive apps",
    ],
    landmine:
      "Ask who provides the branch routing and SD-WAN in the Zscaler proposal — and who you call when the two vendors point at each other.",
  },
  {
    id: "cato",
    competitor: "Cato Networks",
    arena: "SASE / SD-WAN",
    theySay:
      "\"True single-vendor SASE, born in the cloud, one converged backbone. Simple.\"",
    weSay:
      "Simple until you need depth: Cato's GenAI catalog is ~950+ URLs vs. Fortinet's 6,500+, their socket is a thin edge — not an NGFW — and their private backbone is a recurring cost you pay forever. Fortinet delivers converged SASE plus real security processing at the edge, on hardware you own.",
    proof: [
      "6,500+ vs ~950+ GenAI URLs (CDW Canada assessment, Apr 2026)",
      "Cato socket has no local NGFW inspection depth; FortiGate inspects at the edge with ASIC acceleration",
      "No mandatory backbone toll — use any underlay, steer per-application",
    ],
    landmine:
      "Ask what happens to inspection when a site's traffic never leaves the local network — where does Cato enforce?",
  },
  {
    id: "hpe-mist",
    competitor: "HPE Aruba / Juniper Mist",
    arena: "SASE / SD-WAN",
    theySay:
      "\"Mist AI runs your network autonomously. AIOps first — and now we have security through the HPE portfolio.\"",
    weSay:
      "Great wireless story, assembled security story. Post-acquisition, the SD-WAN + security stack is EdgeConnect + Mist + Axis Security + third-party firewalls — integration promised, not shipped. Fortinet's convergence isn't a roadmap slide: routing, SD-WAN, NGFW, and SASE are one OS today.",
    proof: [
      "FortiGate = router + SD-WAN + NGFW in one box, one OS, GA for years",
      "Fortinet Secure SD-WAN: repeated Gartner MQ leader placement; single-vendor SASE with FortiSASE",
      "No multi-console operations tax: FortiManager for thousands of sites",
    ],
    landmine:
      "Ask for the single SKU-level BOM that delivers routing, SD-WAN, firewall, and SASE — count the vendors on the page.",
  },
  {
    id: "sonicwall",
    competitor: "SonicWall (displacement)",
    arena: "NGFW / Refresh",
    theySay:
      "\"Your SonicWall renewal is cheap. Why change what works for a mid-market network?\"",
    weSay:
      "The renewal is cheap because it's yesterday's platform. No SD-WAN fabric, no SASE path, no AI-aware controls, a history of exploited edge vulnerabilities — and the customer's next audit will ask about all four. FortiGate G-series lands at mid-market price points with an enterprise runway: same OS from the 40F branch box to the data center.",
    proof: [
      "FortiGate 90G/120G class: ASIC-accelerated NGFW at mid-market street pricing",
      "Built-in SD-WAN + path to FortiSASE — no forklift when the customer grows",
      "FortiOS 8.0 AI-aware controls: shadow-AI governance SonicWall has no answer to",
    ],
    landmine:
      "Ask how they'll govern GenAI usage and remote access on the current platform — then offer the migration assessment CDW runs at no cost.",
  },
  {
    id: "check-point",
    competitor: "Check Point",
    arena: "NGFW / Refresh",
    theySay:
      "\"Highest catch rates in the industry. Infinity is the consolidated architecture. We invented this market.\"",
    weSay:
      "Respect the history — then look at the modern footprint: Check Point's SD-WAN is young, its SASE is acquired (Perimeter 81), and Quantum appliances carry premium pricing without an ASIC story. Fortinet delivers comparable efficacy with a converged edge that Check Point still assembles from parts.",
    proof: [
      "Purpose-built ASICs (SP5/NP7) vs. general-purpose compute at higher cost/Gbps",
      "Organic SD-WAN + SASE convergence vs. Perimeter 81 bolt-on",
      "One management plane (FortiManager/FortiAnalyzer) across NGFW, SD-WAN, WLAN, switching",
    ],
    landmine:
      "Ask when the Perimeter 81 policy engine and Quantum policy engine become one — and what the migration between them costs.",
  },
];
