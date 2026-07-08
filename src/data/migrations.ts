export interface MigrationStep {
  phase: string;
  detail: string;
}

export interface EquivalenceRow {
  from: string;
  to: string;
  note: string;
}

export interface MigrationPlay {
  id: string;
  name: string;
  from: string;
  to: string;
  why: string;
  triggers: string[]; // buying triggers to listen for
  steps: MigrationStep[];
  equivalence: EquivalenceRow[];
  cta: string;
}

export const MIGRATIONS: MigrationPlay[] = [
  {
    id: "sonicwall-fortigate",
    name: "SonicWall → FortiGate",
    from: "SonicWall TZ / NSa estate",
    to: "FortiGate F/G-series + UTP",
    why: "Aging platform, no SASE path, no AI-aware controls, recurring edge-device CVEs. The renewal letter is your trigger event.",
    triggers: [
      "Support renewal within 6 months",
      "Cyber-insurance questionnaire flags EOL/EOS gear",
      "M&A forcing network standardization",
      "Auditor asks about GenAI usage controls",
    ],
    steps: [
      { phase: "1 · Assess", detail: "Free CDW migration assessment: export SonicWall config, map objects/policies with FortiConverter, produce gap report." },
      { phase: "2 · Design", detail: "Size per equivalence table; add SD-WAN and FortiSASE options SonicWall never had. Quote UTP bundle by default." },
      { phase: "3 · Stage", detail: "CDW staging pre-loads converted config; ship site-ready units." },
      { phase: "4 · Cut over", detail: "Per-site maintenance window with parallel-run option; rollback plan documented." },
      { phase: "5 · Expand", detail: "Attach FortiAP/FortiSwitch on refresh cycles — single-console LAN edge closes the account." },
    ],
    equivalence: [
      { from: "TZ 270/370", to: "FG-40F", note: "Small branch; UTP bundle" },
      { from: "TZ 470/570", to: "FG-70F", note: "Mid branch" },
      { from: "TZ 670 / NSa 2700", to: "FG-90G", note: "Performance branch; SP5 ASIC headroom" },
      { from: "NSa 3700/4700", to: "FG-120G / 121G", note: "Large branch / small campus" },
      { from: "NSa 5700+", to: "FG-200G class", note: "Campus / DC edge — involve SE for sizing" },
    ],
    cta: "Open the free migration assessment request",
  },
  {
    id: "meraki-fortinet",
    name: "Meraki → Fortinet SD-WAN",
    from: "Cisco Meraki MX estate",
    to: "FortiGate Secure SD-WAN (+FortiAP/FortiSwitch)",
    why: "License-ladder economics (Advanced Security add-ons), thin NGFW depth, and no converged SASE story. Displace at renewal or at the SD-WAN scale-out moment.",
    triggers: [
      "Meraki co-term renewal quote lands",
      "Site count outgrowing MX performance tiers",
      "Security team wants real IPS/SSL inspection at the edge",
      "SASE evaluation kicks off separately from the WAN",
    ],
    steps: [
      { phase: "1 · Baseline", detail: "Inventory MX models, licenses, and renewal dates; capture per-site bandwidth and app SLAs." },
      { phase: "2 · Prove", detail: "Two-site pilot: FortiGate + zero-touch provisioning next to production MX; measure app steering + inspection throughput." },
      { phase: "3 · Wave plan", detail: "Migrate by site class in waves; FortiManager templates mirror Meraki network tags." },
      { phase: "4 · LAN follow-on", detail: "FortiAP/FortiSwitch on the same console retires the Meraki dashboard line item entirely." },
    ],
    equivalence: [
      { from: "MX 67/68", to: "FG-40F", note: "Micro branch" },
      { from: "MX 75/85", to: "FG-70F / 90G", note: "Branch; 90G if inspection-heavy" },
      { from: "MX 95/105", to: "FG-120G / 121G", note: "Large branch" },
      { from: "MX 250/450", to: "FG-200G class", note: "Campus / concentrator — SE sizing" },
      { from: "MR access points", to: "FAP-241K / 441K", note: "Wi-Fi 7 refresh on FortiLink" },
    ],
    cta: "Request the two-site pilot kit",
  },
  {
    id: "vpn-ztna",
    name: "Legacy VPN → ZTNA / FortiSASE",
    from: "Concentrator VPN (any vendor)",
    to: "FortiClient ZTNA + FortiSASE",
    why: "Flat-network VPN is the breach pattern of the decade. ZTNA converts a compliance finding into a quick win — and seeds the full SASE estate.",
    triggers: [
      "Pen test flags lateral movement from VPN",
      "Cyber-insurance requires MFA + least-privilege access",
      "VPN concentrator EOL or capacity ceiling",
      "Hybrid-work policy refresh",
    ],
    steps: [
      { phase: "1 · Map", detail: "Inventory apps behind the VPN; classify by sensitivity and user population." },
      { phase: "2 · Broker", detail: "Stand up ZTNA application gateways on existing FortiGates — often zero new hardware." },
      { phase: "3 · Migrate cohorts", detail: "Move user groups app-by-app; legacy VPN shrinks to a break-glass path." },
      { phase: "4 · Extend to SASE", detail: "Add FortiSASE seats for SWG/CASB coverage; same FortiClient agent, no second rollout." },
    ],
    equivalence: [
      { from: "VPN concentrator", to: "FortiGate ZTNA gateway", note: "Existing estate — license check only" },
      { from: "VPN client", to: "FortiClient", note: "One agent: ZTNA + SASE + posture" },
      { from: "Split-tunnel exceptions", to: "FortiSASE SWG", note: "Inspect the traffic VPN never saw" },
    ],
    cta: "Request the ZTNA quick-win workshop",
  },
];
