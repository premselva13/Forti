import { PageHeader } from "../components/PageHeader";
import { WeaveDivider } from "../components/FabricWeave";
import { CountUp } from "../components/CountUp";
import { Tag } from "../components/Badge";

const COVERAGE = [
  { region: "British Columbia", hub: "Vancouver", note: "West coast logistics + field services" },
  { region: "Prairies", hub: "Calgary · Edmonton · Winnipeg", note: "Energy & agri-industrial coverage" },
  { region: "Ontario", hub: "Toronto (HQ) · Ottawa", note: "National HQ, federal & enterprise practice" },
  { region: "Québec", hub: "Montréal", note: "Bilingual delivery, provincial public sector" },
  { region: "Atlantic", hub: "Halifax", note: "Maritime coverage via partner-delivery bench" },
  { region: "Cross-border", hub: "U.S. via CDW LLC", note: "One partner for Canada + U.S. rollouts" },
];

const SERVICES = [
  ["Staging & configuration", "Every unit pre-loaded with SD-WAN profiles before it ships — the in-store step is power + WAN."],
  ["National logistics", "Warehousing, kitting, and scheduled site delivery across every province and the U.S."],
  ["Deployment services", "Wave-based rollout calendars, certified field techs, retail freeze-window discipline."],
  ["Day-2 managed services", "Monitoring, change management, and incident response wrap on the Fortinet estate."],
  ["Security assessments", "Shadow-AI discovery, migration assessments, ZTNA workshops — the engagements that open doors."],
] as const;

const ARCHETYPES = [
  {
    name: "3,000+ site national retail / QSR SD-WAN",
    detail:
      "Canada + U.S. rollout, CDW as bidding partner: FortiGate per store, FEX-211G wireless WAN, regional hubs, FortiSASE for the mobile workforce. CDW staged, shipped, deployed, and runs day-2.",
    tags: ["Secure SD-WAN", "National logistics"],
  },
  {
    name: "Mid-market SonicWall displacement program",
    detail:
      "Renewal-cohort campaign converting aging estates to FortiGate G-series with free migration assessments — a repeatable, quarter-over-quarter motion.",
    tags: ["NGFW refresh", "Migration services"],
  },
  {
    name: "Shadow-AI governance land-and-expand",
    detail:
      "Two-week discovery on the existing FortiGate estate; report lands, FortiAI-Protect governance follows; partner attach covers AI-SPM and red teaming.",
    tags: ["Security for AI", "Multi-vendor attach"],
  },
];

export function WhyCdw() {
  return (
    <div>
      <PageHeader
        kicker="For Fortinet field"
        title="Bring CDW into your next deal."
        lede="This page is the co-sell pitch inverted: what CDW Canada puts on the table when a Fortinet rep needs the deal delivered, not just quoted."
      />

      <section className="grid grid-cols-2 gap-px border border-ink-700 bg-ink-700 lg:grid-cols-4" aria-label="CDW numbers">
        <div className="bg-ink-900 p-5">
          <div className="text-3xl text-fg"><CountUp to={6} /></div>
          <p className="mt-1 text-sm text-fg-mid">delivery regions across Canada, plus U.S. reach via CDW LLC</p>
        </div>
        <div className="bg-ink-900 p-5">
          <div className="text-3xl text-fg"><CountUp to={5} /></div>
          <p className="mt-1 text-sm text-fg-mid">services lines from staging to day-2 managed support</p>
        </div>
        <div className="bg-ink-900 p-5">
          <div className="text-3xl text-fg"><CountUp to={12} /></div>
          <p className="mt-1 text-sm text-fg-mid">domain Security-for-AI assessment framework — CDW's own methodology</p>
        </div>
        <div className="bg-ink-900 p-5">
          <div className="mono-data text-3xl text-fg">2</div>
          <p className="mt-1 text-sm text-fg-mid">languages of delivery — English and French, coast to coast</p>
        </div>
      </section>

      <WeaveDivider className="my-12" />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel">
          <div className="panel-title"><span>Coverage map · Canada + cross-border</span></div>
          <div className="tbl-scroll">
            <table className="tbl">
              <thead>
                <tr><th>Region</th><th>Hubs</th><th>What's there</th></tr>
              </thead>
              <tbody>
                {COVERAGE.map((c) => (
                  <tr key={c.region}>
                    <td className="whitespace-nowrap text-fg">{c.region}</td>
                    <td className="mono-data text-xs whitespace-nowrap">{c.hub}</td>
                    <td>{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title"><span>Services bench</span></div>
          <ul>
            {SERVICES.map(([name, detail]) => (
              <li key={name} className="border-b border-ink-700 px-4 py-3 last:border-0">
                <p className="text-sm font-medium text-fg">{name}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-mid">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <WeaveDivider className="my-12" />

      <section aria-label="Joint win archetypes">
        <h2 className="display mb-4 text-3xl text-fg">Joint win archetypes</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {ARCHETYPES.map((a) => (
            <div key={a.name} className="panel flex flex-col p-5">
              <h3 className="text-base font-semibold text-fg">{a.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-mid">{a.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {a.tags.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <WeaveDivider className="my-12" />

      <section className="panel p-6 lg:p-8" aria-label="Specialist practice">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="font-mono text-[11px] tracking-[0.25em] text-red-hi uppercase">Named specialist practice</p>
            <h2 className="display mt-2 text-3xl text-fg">A Fortinet practice, not a Fortinet aisle.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-mid">
              CDW Canada fields dedicated Fortinet-certified solution architects, a distributed-enterprise
              SD-WAN design team, and the Security-for-AI assessment methodology behind this portal's
              Domain Explorer. When you bring CDW into a deal, you get a bench that has already built the
              reference architecture — and a partner honest enough to tell the customer where Fortinet
              leads and where the design pairs in another vendor. That honesty closes bigger deals.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <a
              href="mailto:fortinet-practice@cdw.ca?subject=Co-sell%20request%20via%20The%20Fabric%20Exchange"
              className="border border-red bg-red px-4 py-2.5 text-center font-mono text-sm text-white hover:bg-red/85"
            >
              Request a co-sell engagement
            </a>
            <p className="text-center font-mono text-[10px] text-fg-low">
              Illustrative contact — replace with the live practice alias at launch
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
