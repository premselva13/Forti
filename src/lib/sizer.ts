/**
 * SD-WAN Deal Sizer — recommendation logic.
 * Output is a directional sizing band, never a formal BOM.
 * All quantities are illustrative — request a formal BOM from CDW.
 */

export interface SizerInput {
  sites: number;
  mbpsPerSite: number;
  ha: boolean;
  saseSeats: number;
  hubs: number;
}

export interface SizerResult {
  branchModel: string;
  branchClass: string;
  hubModel: string;
  license: "UTP" | "ATP" | "Enterprise";
  licenseWhy: string;
  branchDevices: number;
  hubDevices: number;
  saseBand: string;
  extenderAttach: string;
  notes: string[];
}

export function sizeDeal(input: SizerInput): SizerResult {
  const { sites, mbpsPerSite, ha, saseSeats, hubs } = input;

  let branchModel: string;
  let branchClass: string;
  if (mbpsPerSite <= 100) {
    branchModel = "FG-40F";
    branchClass = "Micro branch class";
  } else if (mbpsPerSite <= 300) {
    branchModel = "FG-70F";
    branchClass = "Mid branch class";
  } else if (mbpsPerSite <= 1000) {
    branchModel = "FG-90G / FG-91G";
    branchClass = "Performance branch class (SP5 ASIC)";
  } else {
    branchModel = "FG-120G / FG-121G";
    branchClass = "Large branch / campus edge class";
  }

  const hubModel =
    sites > 500 ? "FG-200G class (HA pair per region)" : sites > 50 ? "FG-200G class (HA pair)" : "FG-120G class (HA pair)";

  let license: SizerResult["license"];
  let licenseWhy: string;
  if (sites >= 1000) {
    license = "UTP";
    licenseWhy =
      "Internet-edge branches at volume: UTP (NGFW + web/DNS filtering + IPS + app control) is the default. Consider Enterprise on OT-adjacent site classes.";
  } else if (mbpsPerSite > 1000) {
    license = "Enterprise";
    licenseWhy =
      "High-bandwidth sites typically carry compliance or OT adjacency — Enterprise bundle adds IoT/OT services and attack-surface security.";
  } else {
    license = "UTP";
    licenseWhy =
      "Direct internet breakout at the branch: UTP covers NGFW, web/DNS filtering, IPS, and app control with FortiCare Premium.";
  }

  const perSite = ha ? 2 : 1;
  const branchDevices = sites * perSite;
  const hubDevices = hubs * 2; // hubs always quoted HA

  const saseBand =
    saseSeats === 0
      ? "No SASE seats — revisit for hybrid-work coverage"
      : saseSeats < 500
        ? `${saseSeats} seats — entry volume band`
        : saseSeats < 5000
          ? `${saseSeats} seats — mid volume band`
          : `${saseSeats} seats — enterprise band (engage FortiSASE specialist)`;

  const notes: string[] = [
    "All quantities illustrative — request a formal BOM from CDW before quoting.",
    "Add FortiExtender 211G per site for day-1 wireless WAN and circuit backup.",
  ];
  if (sites > 500)
    notes.push(
      "Multi-hundred-site rollout: include FortiManager/FortiAnalyzer, FortiZTP zero-touch provisioning, and CDW staging + deployment services in the design.",
    );
  if (ha) notes.push("HA pairs quoted per branch — confirm per-site-class HA policy; many designs reserve HA for hub and large-branch classes only.");
  if (saseSeats > 0)
    notes.push("FortiSASE seats ride the same FortiClient agent as ZTNA — bundle with the refresh, one rollout.");

  return {
    branchModel,
    branchClass,
    hubModel,
    license,
    licenseWhy,
    branchDevices,
    hubDevices,
    saseBand,
    extenderAttach: "FEX-211G × " + sites.toLocaleString() + " (recommended attach)",
    notes,
  };
}
