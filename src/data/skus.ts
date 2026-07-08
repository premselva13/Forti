/**
 * SKU Navigator data. Positioning and lifecycle data for the most-quoted lines.
 * Performance figures are datasheet-class approximations for sizing conversation
 * only — always validate against the current Fortinet datasheet and price list
 * before quoting. Never quote pricing from this portal.
 */

export type SkuCategory =
  | "FortiGate"
  | "FortiAP"
  | "FortiSwitch"
  | "FortiExtender"
  | "Licensing";

export interface Sku {
  sku: string;
  name: string;
  category: SkuCategory;
  positioning: string;
  specs: string; // short mono-rendered spec line, approximate
  successor?: string; // successor SKU if in lifecycle transition
  endOfOrder?: string; // end-of-order flag, e.g. "EOO announced — verify date"
  notes?: string;
}

export const SKUS: Sku[] = [
  // — FortiGate —
  {
    sku: "FG-40F",
    name: "FortiGate 40F",
    category: "FortiGate",
    positioning:
      "Small branch / retail micro-site. The default for sub-50-user sites with basic segmentation.",
    specs: "Desktop | 5×GE | small-branch NGFW class",
    successor: "FG-50G class",
    notes: "Workhorse of multi-hundred-site retail rollouts.",
  },
  {
    sku: "FG-70F",
    name: "FortiGate 70F",
    category: "FortiGate",
    positioning:
      "Mid branch, 50–150 users, heavier inspection or more WAN links.",
    specs: "Desktop | 8×GE | mid-branch NGFW class",
    notes: "Common HA-pair candidate at branch when uptime SLAs bite.",
  },
  {
    sku: "FG-90G",
    name: "FortiGate 90G",
    category: "FortiGate",
    positioning:
      "Current-gen branch flagship. SP5 ASIC, big inspection headroom, 5GE ports — sized for the branch that grows.",
    specs: "Desktop | SP5 ASIC | 2×5GE + 8×GE | performance branch class",
    notes: "Lead quote for new branch designs in 2026.",
  },
  {
    sku: "FG-91G",
    name: "FortiGate 91G",
    category: "FortiGate",
    positioning:
      "90G platform + onboard storage for local logging / SD-WAN analytics retention.",
    specs: "Desktop | SP5 ASIC | +128GB SSD | performance branch class",
    notes: "Pick over 90G when local log retention is a requirement.",
  },
  {
    sku: "FG-120G",
    name: "FortiGate 120G",
    category: "FortiGate",
    positioning:
      "Large branch / small campus edge. Rackmount, 10GE uplinks, hub-capable in modest SD-WAN designs.",
    specs: "1RU | SP5 ASIC | 2×25GE + 2×10GE + 16×GE | campus-edge class",
  },
  {
    sku: "FG-121G",
    name: "FortiGate 121G",
    category: "FortiGate",
    positioning: "120G platform + onboard storage.",
    specs: "1RU | SP5 ASIC | +256GB SSD | campus-edge class",
  },
  {
    sku: "FG-200G",
    name: "FortiGate 200G",
    category: "FortiGate",
    positioning:
      "Regional hub / data-center edge for distributed-enterprise SD-WAN. Terminates hundreds of branch overlays.",
    specs: "1RU | NP7-class | 25GE-capable | hub / DC-edge class",
    notes: "Typical hub for 500–3,000-site retail topologies (pair for HA).",
  },
  // — FortiAP —
  {
    sku: "FAP-231F",
    name: "FortiAP 231F",
    category: "FortiAP",
    positioning: "Wi-Fi 6 general-purpose indoor AP. Volume deployment unit.",
    specs: "Wi-Fi 6 | 2×2 | tri-radio",
    successor: "FAP-241K",
    endOfOrder: "Generational transition to K-series — verify EOO date on price list",
  },
  {
    sku: "FAP-431F",
    name: "FortiAP 431F",
    category: "FortiAP",
    positioning: "Wi-Fi 6 high-density AP — the F-series flagship, now in transition.",
    specs: "Wi-Fi 6 | 4×4 | tri-radio",
    successor: "FAP-441K",
    endOfOrder: "Generational transition to K-series — verify EOO date on price list",
    notes: "Quote FAP-441K on new designs; 431F only to extend existing estates.",
  },
  {
    sku: "FAP-241K",
    name: "FortiAP 241K",
    category: "FortiAP",
    positioning: "Wi-Fi 7 general-purpose successor to 231F. Default volume AP for new builds.",
    specs: "Wi-Fi 7 | 2×2 | tri-radio",
  },
  {
    sku: "FAP-441K",
    name: "FortiAP 441K",
    category: "FortiAP",
    positioning: "Wi-Fi 7 high-density successor to 431F. Lead AP for offices, retail floors, warehouses.",
    specs: "Wi-Fi 7 | 4×4 | tri-radio | 10GE uplink",
  },
  // — FortiSwitch —
  {
    sku: "FS-124F-POE",
    name: "FortiSwitch 124F PoE",
    category: "FortiSwitch",
    positioning: "24-port access switch for branch — powers APs and phones, managed from the FortiGate (FortiLink).",
    specs: "24×GE PoE+ | 4×10G SFP+ | FortiLink managed",
  },
  {
    sku: "FS-148F-POE",
    name: "FortiSwitch 148F PoE",
    category: "FortiSwitch",
    positioning: "48-port access switch for larger branches and small campus.",
    specs: "48×GE PoE+ | 4×10G SFP+ | FortiLink managed",
  },
  // — FortiExtender —
  {
    sku: "FEX-211G",
    name: "FortiExtender 211G",
    category: "FortiExtender",
    positioning: "5G/LTE WAN gateway — instant-on connectivity for new sites and wireless-WAN backup for SD-WAN.",
    specs: "5G sub-6 | dual-SIM | GE LAN",
    notes: "Attach to every retail/QSR site quote: day-1 connectivity before circuits land.",
  },
  {
    sku: "FEX-511G",
    name: "FortiExtender 511G",
    category: "FortiExtender",
    positioning: "Performance 5G WAN for primary-wireless sites, vehicles, pop-ups.",
    specs: "5G sub-6/mmWave-ready | dual-SIM | 2.5GE LAN",
  },
  // — Licensing —
  {
    sku: "FC-FG-UTP",
    name: "Unified Threat Protection (UTP) bundle",
    category: "Licensing",
    positioning:
      "The default branch bundle: NGFW + web/DNS filtering + AV + IPS + app control + FortiCare. Quote on every internet-edge FortiGate.",
    specs: "per-device | annual | incl. FortiCare Premium",
    notes: "SKU shown is a family placeholder — exact SKU is per-model (e.g. FC-10-0090G-950-02-12).",
  },
  {
    sku: "FC-FG-ATP",
    name: "Advanced Threat Protection (ATP) bundle",
    category: "Licensing",
    positioning:
      "IPS + AV + sandbox for FortiGates that don't need web filtering (internal segmentation, data-center edge).",
    specs: "per-device | annual | incl. FortiCare Premium",
    notes: "Family placeholder — exact SKU is per-model.",
  },
  {
    sku: "FC-FG-ENT",
    name: "Enterprise Protection bundle",
    category: "Licensing",
    positioning:
      "Everything in UTP plus IoT/OT security services, attack-surface security, FortiConverter. For regulated and OT-adjacent sites.",
    specs: "per-device | annual | incl. FortiCare Premium",
    notes: "Family placeholder — exact SKU is per-model.",
  },
  {
    sku: "FC-FSASE-USR",
    name: "FortiSASE user licenses",
    category: "Licensing",
    positioning:
      "Per-user SASE (SWG + ZTNA + CASB + FWaaS), one FortiClient agent. Bundle with SD-WAN refresh for hybrid-work coverage.",
    specs: "per-user | annual | tiered volume bands",
    notes: "Thin-branch (site-based) licensing also available for agentless sites.",
  },
  {
    sku: "FC-FCARE-PREM",
    name: "FortiCare Premium",
    category: "Licensing",
    positioning: "24×7 support baseline on every quote. Elevate to Elite for 15-min response on critical infra.",
    specs: "per-device | annual",
  },
];
