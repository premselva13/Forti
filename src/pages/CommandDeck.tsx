import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { FabricWeave, WeaveDivider } from "../components/FabricWeave";
import { CountUp } from "../components/CountUp";
import { Tag } from "../components/Badge";
import { INTEL, PROMOS } from "../data/intel";

function daysLeft(iso: string) {
  return Math.max(0, Math.ceil((new Date(iso + "T23:59:59").getTime() - Date.now()) / 86400000));
}

const STATS = [
  { value: 6500, suffix: "+", label: "GenAI URLs catalogued — largest on the market", source: "FortiAI-Protect · CDW 16-vendor comparison, Apr 2026" },
  { value: 8, suffix: "/12", label: "AI security domains covered, 1 Native", source: "CDW Canada 12-domain assessment" },
  { value: 3000, suffix: "+", label: "sites in the anchor SD-WAN pursuit archetype", source: "National retail/QSR, Canada + U.S. (anonymized)" },
  { value: 1, suffix: " OS", label: "routing, security, SD-WAN converged on FortiOS", source: "FortiGate single-OS architecture" },
];

const FEATURED_PLAYS = [
  {
    title: "Shadow-AI discovery report",
    detail: "Two-week egress discovery on the customer's FortiGate estate. The report writes the AI-governance business case for you.",
    to: "/security-for-ai",
    cta: "Open the talk track",
  },
  {
    title: "SonicWall renewal displacement",
    detail: "H2 renewal cohort, no SASE path, no AI controls. Free migration assessment converts the renewal letter into a FortiGate quote.",
    to: "/tools/migrations#sonicwall-fortigate",
    cta: "Open the play",
  },
  {
    title: "SASE attach on every WAN refresh",
    detail: "Same FortiClient agent, same policy plane. Add seats to every SD-WAN quote — hybrid work coverage with one rollout.",
    to: "/sase-sd-wan",
    cta: "Size a deal",
  },
];

export function CommandDeck() {
  const reduce = useReducedMotion();
  const latest = INTEL.slice(0, 4);

  return (
    <div>
      {/* ————— Hero ————— */}
      <section className="relative overflow-hidden pt-14 pb-10 lg:pt-24 lg:pb-16">
        <FabricWeave className="pointer-events-none absolute inset-x-0 top-6 h-36 w-full opacity-70" />
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative pt-20 lg:pt-28"
        >
          <p className="mb-4 font-mono text-[11px] tracking-[0.3em] text-red-hi uppercase">
            CDW Canada × Fortinet · Partner Terminal
          </p>
          <h1 className="display max-w-4xl text-5xl text-fg sm:text-6xl lg:text-7xl">
            Ninety seconds to the right answer.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-mid">
            Talk tracks, battlecards, sizing bands, and deal registration for every Fortinet
            conversation — built for sellers mid-deal, not marketing reviewers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/security-for-ai"
              className="border border-red bg-red px-5 py-2.5 font-mono text-sm text-white hover:bg-red/85"
            >
              Security for AI →
            </Link>
            <Link
              to="/sase-sd-wan"
              className="border border-ink-600 px-5 py-2.5 font-mono text-sm text-fg hover:border-fg-low"
            >
              SASE &amp; SD-WAN →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ————— Stat row ————— */}
      <section aria-label="Key numbers" className="grid grid-cols-2 gap-px border border-ink-700 bg-ink-700 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="bg-ink-900 p-5">
            <div className="text-3xl text-fg lg:text-4xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-2 text-sm text-fg-mid">{s.label}</p>
            <p className="mt-1 font-mono text-[10px] tracking-wide text-fg-low">{s.source}</p>
          </div>
        ))}
      </section>

      <WeaveDivider className="my-12" />

      {/* ————— Two pillars ————— */}
      <section aria-label="Hero pillars" className="grid gap-6 lg:grid-cols-2">
        <Link to="/security-for-ai" className="group panel relative overflow-hidden p-6 transition-colors hover:border-red/60 lg:p-8">
          <p className="font-mono text-[11px] tracking-[0.25em] text-red-hi uppercase">Pillar 1 · The growth story</p>
          <h2 className="display mt-3 text-3xl text-fg lg:text-4xl">Security for AI</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-mid">
            Govern shadow AI with the market's largest GenAI catalog. See MCP and agent-to-agent
            traffic almost nobody else can. Attach partners into the gaps — honestly.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Tag tone="win">Native · User AI Access Governance</Tag>
            <Tag tone="red">FortiOS 8.0 MCP/A2A visibility</Tag>
          </div>
          <p className="mt-6 font-mono text-xs text-fg-low group-hover:text-red-hi">
            Open the 12-domain explorer →
          </p>
        </Link>

        <Link to="/sase-sd-wan" className="group panel relative overflow-hidden p-6 transition-colors hover:border-red/60 lg:p-8">
          <p className="font-mono text-[11px] tracking-[0.25em] text-red-hi uppercase">Pillar 2 · The scale story</p>
          <h2 className="display mt-3 text-3xl text-fg lg:text-4xl">SASE &amp; Secure SD-WAN</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-fg-mid">
            One OS converging routing, security, and SD-WAN — provisioned zero-touch by the
            thousand. CDW brings the national rollout machine.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Tag tone="amber">3,000+ site pursuit archetype</Tag>
            <Tag>Single-vendor SASE</Tag>
          </div>
          <p className="mt-6 font-mono text-xs text-fg-low group-hover:text-red-hi">
            Open the Deal Sizer →
          </p>
        </Link>
      </section>

      <WeaveDivider className="my-12" />

      {/* ————— Plays + promos + intel ————— */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="panel lg:col-span-2">
          <div className="panel-title">
            <span>Featured plays · this month</span>
            <Link to="/deal-desk" className="text-red-hi normal-case tracking-normal hover:underline">
              Register a deal →
            </Link>
          </div>
          <ul>
            {FEATURED_PLAYS.map((p) => (
              <li key={p.title} className="border-b border-ink-700 last:border-0">
                <Link to={p.to} className="group flex flex-col gap-1 px-4 py-4 hover:bg-ink-850">
                  <span className="font-medium text-fg">{p.title}</span>
                  <span className="text-sm text-fg-mid">{p.detail}</span>
                  <span className="mt-1 font-mono text-xs text-red-hi opacity-80 group-hover:opacity-100">
                    {p.cta} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <div className="panel">
            <div className="panel-title">
              <span>Program clocks</span>
            </div>
            {PROMOS.map((p) => (
              <div key={p.id} className="flex items-baseline justify-between gap-3 border-b border-ink-700 px-4 py-3 last:border-0">
                <div>
                  <p className="text-sm text-fg">{p.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] text-fg-low">{p.detail}</p>
                </div>
                <div className="text-right">
                  <span className="mono-data text-2xl text-amber">{daysLeft(p.endsAt)}</span>
                  <span className="ml-1 font-mono text-[10px] text-fg-low">days</span>
                </div>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="panel-title">
              <span>Latest intel</span>
              <Link to="/intel" className="text-red-hi normal-case tracking-normal hover:underline">
                Full feed →
              </Link>
            </div>
            <ul>
              {latest.map((i) => (
                <li key={i.id} className="border-b border-ink-700 px-4 py-2.5 last:border-0">
                  <p className="font-mono text-[10px] tracking-widest text-fg-low">
                    {i.date} · {i.tag}
                  </p>
                  <p className="mt-0.5 text-sm leading-snug text-fg-mid">{i.headline}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
