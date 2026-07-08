import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Tag } from "../components/Badge";
import { BATTLECARDS } from "../data/battlecards";

const ARENAS = ["All", "SASE / SD-WAN", "Security for AI", "NGFW / Refresh"] as const;

export function Battlecards() {
  const [arena, setArena] = useState<(typeof ARENAS)[number]>("All");
  const cards = BATTLECARDS.filter((b) => arena === "All" || b.arena === arena);

  return (
    <div>
      <PageHeader
        kicker="Engage · Tools"
        title="Battlecard Engine"
        lede="They say / we say / proof / the landmine question to plant. Pull the card before the call, plant the landmine during it."
      />

      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by arena">
        {ARENAS.map((a) => (
          <button
            key={a}
            onClick={() => setArena(a)}
            aria-pressed={arena === a}
            className={`chip cursor-pointer ${
              arena === a ? "border-red/60 text-red-hi" : "border-ink-600 text-fg-low hover:text-fg"
            }`}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {cards.map((card) => (
          <article key={card.id} id={card.id} className="panel scroll-mt-24">
            <div className="panel-title">
              <span className="text-fg">vs. {card.competitor}</span>
              <Tag tone={card.arena === "Security for AI" ? "red" : "amber"}>{card.arena}</Tag>
            </div>
            <div className="grid gap-px bg-ink-700 lg:grid-cols-2">
              <div className="bg-ink-900 p-5">
                <p className="font-mono text-[11px] tracking-widest text-fg-low uppercase">They say</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-mid italic">{card.theySay}</p>
                <p className="mt-4 font-mono text-[11px] tracking-widest text-red-hi uppercase">We say</p>
                <p className="mt-2 text-sm leading-relaxed text-fg">{card.weSay}</p>
              </div>
              <div className="bg-ink-900 p-5">
                <p className="font-mono text-[11px] tracking-widest text-fg-low uppercase">Proof</p>
                <ul className="mt-2 space-y-1.5">
                  {card.proof.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed text-fg-mid">
                      <span className="mono-data shrink-0 text-fg-low">{String(i + 1).padStart(2, "0")}</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-l-2 border-amber pl-3">
                  <p className="font-mono text-[11px] tracking-widest text-amber uppercase">Landmine to plant</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg">{card.landmine}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 font-mono text-[11px] leading-relaxed text-fg-low">
        Catalog and assessment figures: CDW Canada Security for AI Partner Capability Comparison, Apr 2026.
        Verify analyst-report editions before quoting externally.
      </p>
    </div>
  );
}
