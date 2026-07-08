import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PageHeader } from "../components/PageHeader";
import { WeaveDivider } from "../components/FabricWeave";
import { LevelBadge, Tag } from "../components/Badge";
import { CountUp } from "../components/CountUp";
import { AI_DOMAINS, ASSESSMENT_META, type AiDomain } from "../data/domains";

function DomainDetail({ domain }: { domain: AiDomain }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <p className="font-mono text-[11px] tracking-widest text-fg-low uppercase">Assessment rationale</p>
        <p className="mt-2 text-sm leading-relaxed text-fg-mid">{domain.rationale}</p>
        {domain.products.length > 0 && (
          <div className="mt-4">
            <p className="font-mono text-[11px] tracking-widest text-fg-low uppercase">Products that map here</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {domain.products.map((p) => (
                <span key={p} className="chip border-ink-600 text-fg">{p}</span>
              ))}
            </div>
          </div>
        )}
        {domain.attachPlay && (
          <div className="mt-4 border-l-2 border-amber pl-3">
            <p className="font-mono text-[11px] tracking-widest text-amber uppercase">Partner-attach play</p>
            <p className="mt-1 text-sm leading-relaxed text-fg-mid">{domain.attachPlay}</p>
          </div>
        )}
      </div>
      <div>
        <p className="font-mono text-[11px] tracking-widest text-red-hi uppercase">Seller talk track</p>
        <p className="mt-2 text-sm leading-relaxed text-fg">{domain.talkTrack}</p>
        <p className="mt-4 font-mono text-[11px] tracking-widest text-fg-low uppercase">Discovery questions</p>
        <ol className="mt-2 space-y-2">
          {domain.discoveryQuestions.map((q, i) => (
            <li key={i} className="flex gap-2 text-sm leading-relaxed text-fg-mid">
              <span className="mono-data shrink-0 text-fg-low">{String(i + 1).padStart(2, "0")}</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function DomainExplorer() {
  const [openId, setOpenId] = useState<string | null>("D10");
  const reduce = useReducedMotion();
  const open = AI_DOMAINS.find((d) => d.id === openId) ?? null;

  return (
    <section aria-label="AI Security Domain Explorer">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="display text-3xl text-fg">The 12-Domain Explorer</h2>
        <p className="font-mono text-[11px] text-fg-low">{ASSESSMENT_META.source}</p>
      </div>

      <div className="grid grid-cols-2 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-3 lg:grid-cols-4">
        {AI_DOMAINS.map((d) => (
          <button
            key={d.id}
            id={d.id}
            onClick={() => setOpenId(openId === d.id ? null : d.id)}
            aria-expanded={openId === d.id}
            className={`flex min-h-28 flex-col justify-between bg-ink-900 p-4 text-left transition-colors hover:bg-ink-850 ${
              openId === d.id ? "bg-ink-850 outline outline-1 outline-red/50" : ""
            }`}
          >
            <div className="flex w-full items-start justify-between gap-2">
              <span className="mono-data text-xs text-fg-low">{d.id}</span>
              <LevelBadge level={d.level} />
            </div>
            <span className="mt-3 text-sm leading-snug font-medium text-fg">{d.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key={open.id}
            initial={reduce ? undefined : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border border-t-0 border-ink-700 bg-ink-900"
          >
            <div className="p-5 lg:p-6">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="mono-data text-sm text-fg-low">{open.id}</span>
                <h3 className="text-lg font-semibold text-fg">{open.name}</h3>
                <LevelBadge level={open.level} />
              </div>
              <DomainDetail domain={open} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-3 font-mono text-[11px] leading-relaxed text-fg-low">
        Scoring: Native = GA, purpose-built · Partial = adjacent, preview, or integration required ·
        Gap = no meaningful capability today. Scope: {ASSESSMENT_META.scope}
      </p>
    </section>
  );
}

export function SecurityForAI() {
  const leads = AI_DOMAINS.filter((d) => d.level === "Native");
  const pairs = AI_DOMAINS.filter((d) => d.level === "Gap");

  return (
    <div>
      <PageHeader
        kicker="Pillar 1 · The growth story"
        title="Security for AI"
        lede="Every customer already has an AI problem: ungoverned GenAI use, invisible agent traffic, data in prompts. Fortinet answers at the network layer they may already own — and CDW pairs partners into the rest."
      />

      {/* Hero stat strip */}
      <section className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-3">
        <div className="bg-ink-900 p-5">
          <div className="text-3xl text-win"><CountUp to={6500} suffix="+" /></div>
          <p className="mt-1 text-sm text-fg-mid">GenAI URLs catalogued by FortiAI-Protect — the largest catalog assessed</p>
          <p className="mt-1 font-mono text-[10px] text-fg-low">vs. Palo Alto ~4,000+ · Cato ~950+ · CDW comparison, Apr 2026</p>
        </div>
        <div className="bg-ink-900 p-5">
          <div className="mono-data text-3xl text-fg">MCP/A2A</div>
          <p className="mt-1 text-sm text-fg-mid">agent-traffic visibility at the network layer — one of a handful of vendors on earth</p>
          <p className="mt-1 font-mono text-[10px] text-fg-low">FortiOS 8.0 · announced Mar 10 2026, Accelerate</p>
        </div>
        <div className="bg-ink-900 p-5">
          <div className="mono-data text-3xl text-fg">8<span className="text-fg-low">/12</span></div>
          <p className="mt-1 text-sm text-fg-mid">domains covered — wide coverage, one Native, honest about the rest</p>
          <p className="mt-1 font-mono text-[10px] text-fg-low">1 Native · 7 Partial · 4 Gap — all Gaps are attach plays</p>
        </div>
      </section>

      <WeaveDivider className="my-12" />

      <DomainExplorer />

      <WeaveDivider className="my-12" />

      {/* Honesty module */}
      <section aria-label="Where Fortinet leads and where we pair" className="grid gap-6 lg:grid-cols-2">
        <div className="panel border-win/30">
          <div className="panel-title text-win">
            <span>Where Fortinet leads</span>
          </div>
          <div className="space-y-4 p-5">
            {leads.map((d) => (
              <div key={d.id}>
                <p className="font-medium text-fg">{d.id} · {d.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-mid">{d.rationale}</p>
              </div>
            ))}
            <div>
              <p className="font-medium text-fg">D11 · Agent AI Access Governance <span className="font-mono text-[10px] text-amber">STRATEGIC</span></p>
              <p className="mt-1 text-sm leading-relaxed text-fg-mid">
                FortiOS 8.0 MCP/A2A visibility is an emerging capability only a handful of vendors offer.
                Partial today — but it's the wedge into every agent-security conversation.
              </p>
            </div>
          </div>
        </div>
        <div className="panel border-amber/30">
          <div className="panel-title text-amber">
            <span>Where we pair</span>
          </div>
          <div className="space-y-4 p-5">
            {pairs.map((d) => (
              <div key={d.id}>
                <p className="font-medium text-fg">{d.id} · {d.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-mid">{d.attachPlay}</p>
              </div>
            ))}
            <p className="border-t border-ink-700 pt-3 font-mono text-[11px] leading-relaxed text-fg-low">
              Sellers trust portals that don't lie to them. Name the gap, bring the partner, own the
              architecture — that's the multi-vendor attach that makes CDW the advisor.
            </p>
          </div>
        </div>
      </section>

      <WeaveDivider className="my-12" />

      {/* Competitive context + CTA */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="panel lg:col-span-2">
          <div className="panel-title"><span>Competitive context · 16 vendors assessed</span></div>
          <div className="p-5">
            <p className="text-sm leading-relaxed text-fg-mid">{ASSESSMENT_META.ranking}</p>
            <p className="mt-3 text-sm leading-relaxed text-fg-mid">
              Fortinet's differentiation: Security Fabric breadth, the largest GenAI URL catalog, and
              FortiOS 8.0 AI-aware controls. Lead with shadow-AI governance and MCP/A2A visibility;
              pair for AI-SPM, red teaming, and resilience.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Tag tone="win">Lead: D10 governance</Tag>
              <Tag tone="red">Headline: MCP/A2A</Tag>
              <Tag tone="amber">Pair: D5 · D7 · D8 · D9</Tag>
            </div>
          </div>
        </div>
        <div className="panel flex flex-col justify-between p-5">
          <div>
            <p className="display text-2xl text-fg">Run the play</p>
            <p className="mt-2 text-sm leading-relaxed text-fg-mid">
              Propose the two-week shadow-AI discovery. The report writes the business case.
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Link to="/learn#ai-elevator" className="border border-ink-600 px-4 py-2 text-center font-mono text-sm text-fg hover:border-fg-low">
              Open the 5-min talk track
            </Link>
            <Link to="/deal-desk" className="border border-red bg-red px-4 py-2 text-center font-mono text-sm text-white hover:bg-red/85">
              Register this deal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
