import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { WeaveDivider } from "../components/FabricWeave";
import { Tag } from "../components/Badge";
import { MIGRATIONS } from "../data/migrations";

export function MigrationPlays() {
  return (
    <div>
      <PageHeader
        kicker="Engage · Tools"
        title="Migration Plays"
        lede="Guided competitive-displacement flows with sizing-equivalence tables. Every play starts from a trigger event — listen for it, then run the phases."
      />

      <div className="space-y-10">
        {MIGRATIONS.map((play) => (
          <article key={play.id} id={play.id} className="panel scroll-mt-24">
            <div className="panel-title">
              <span className="text-fg">{play.name}</span>
              <span className="mono-data normal-case">{play.from} → {play.to}</span>
            </div>

            <div className="grid gap-px bg-ink-700 lg:grid-cols-3">
              <div className="bg-ink-900 p-5">
                <p className="font-mono text-[11px] tracking-widest text-red-hi uppercase">Why this play wins</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-mid">{play.why}</p>
                <p className="mt-4 font-mono text-[11px] tracking-widest text-fg-low uppercase">Listen for</p>
                <ul className="mt-2 space-y-1.5">
                  {play.triggers.map((t, i) => (
                    <li key={i} className="flex gap-2 text-sm text-fg-mid">
                      <span className="text-amber">▸</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-ink-900 p-5">
                <p className="font-mono text-[11px] tracking-widest text-fg-low uppercase">Run the phases</p>
                <ol className="mt-2 space-y-3">
                  {play.steps.map((s) => (
                    <li key={s.phase}>
                      <p className="mono-data text-xs text-fg">{s.phase}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-fg-mid">{s.detail}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-ink-900 p-5">
                <p className="font-mono text-[11px] tracking-widest text-fg-low uppercase">Sizing equivalence</p>
                <div className="tbl-scroll mt-2">
                  <table className="tbl">
                    <thead>
                      <tr>
                        <th>From</th>
                        <th>To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {play.equivalence.map((row) => (
                        <tr key={row.from}>
                          <td className="mono-data text-xs">{row.from}</td>
                          <td>
                            <span className="sku text-xs">{row.to}</span>
                            <span className="block font-mono text-[10px] text-fg-low">{row.note}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link
                  to={`/deal-desk?play=${play.id}`}
                  className="mt-4 block border border-red bg-red px-4 py-2 text-center font-mono text-sm text-white hover:bg-red/85"
                >
                  {play.cta} →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <WeaveDivider className="my-10" />
      <p className="font-mono text-[11px] text-fg-low">
        Equivalence bands are directional starting points <Tag tone="amber">SE validation required</Tag> — throughput
        mixes (SSL inspection %, IPS profiles) move the band. Request formal sizing via the Deal Desk.
      </p>
    </div>
  );
}
