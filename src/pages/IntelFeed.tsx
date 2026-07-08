import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Tag } from "../components/Badge";
import { INTEL, type IntelTag } from "../data/intel";

const TAGS: ("ALL" | IntelTag)[] = ["ALL", "LAUNCH", "COMPETITIVE", "ANALYST", "PROGRAM", "PLAY"];

const TAG_TONE: Record<IntelTag, "red" | "amber" | "neutral" | "win"> = {
  LAUNCH: "red",
  COMPETITIVE: "amber",
  ANALYST: "neutral",
  PROGRAM: "amber",
  PLAY: "win",
};

export function IntelFeed() {
  const [tag, setTag] = useState<(typeof TAGS)[number]>("ALL");
  const items = INTEL.filter((i) => tag === "ALL" || i.tag === tag).sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <div>
      <PageHeader
        kicker="Intel Feed"
        title="Signal, not newsletter."
        lede="Launches, competitive moves, analyst placements, and program windows — one stream, terminal-styled. Content is a one-file edit (src/data/intel.ts)."
      />

      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter intel by tag">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            aria-pressed={tag === t}
            className={`chip cursor-pointer ${
              tag === t ? "border-red/60 text-red-hi" : "border-ink-600 text-fg-low hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ol className="panel divide-y divide-ink-700">
        {items.map((item) => (
          <li key={item.id} className="grid gap-2 px-5 py-4 sm:grid-cols-[110px_90px_1fr]">
            <span className="mono-data text-xs text-fg-low">{item.date}</span>
            <span><Tag tone={TAG_TONE[item.tag]}>{item.tag}</Tag></span>
            <div>
              <p className="text-sm leading-snug font-medium text-fg">
                {item.pinned && <span className="mr-2 font-mono text-[10px] text-amber">★ PINNED</span>}
                {item.headline}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-mid">{item.summary}</p>
              <p className="mt-1.5 font-mono text-[10px] tracking-wide text-fg-low">SOURCE: {item.source}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
