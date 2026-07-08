import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { Tag } from "../components/Badge";
import { LESSONS, TRACKS, type TrackId } from "../data/lessons";
import { useLocalStorage } from "../lib/store";

export function Learn() {
  const [track, setTrack] = useState<TrackId>("ai");
  const [done, setDone] = useLocalStorage<Record<string, boolean>>("fx.learn.progress", {});
  const [open, setOpen] = useState<string | null>(null);

  const lessons = LESSONS.filter((l) => l.track === track);
  const doneCount = lessons.filter((l) => done[l.id]).length;

  return (
    <div>
      <PageHeader
        kicker="Learn · The Seller Track"
        title="From elevator to deep dive."
        lede="Progressive enablement per pillar: 5-minute elevator → 20-minute discovery call → SE deep dive. Every lesson ends with three discovery questions and one objection rep. Progress saves on this device."
      />

      <div className="mb-6 grid gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2">
        {TRACKS.map((t) => {
          const tl = LESSONS.filter((l) => l.track === t.id);
          const td = tl.filter((l) => done[l.id]).length;
          return (
            <button
              key={t.id}
              onClick={() => setTrack(t.id)}
              aria-pressed={track === t.id}
              className={`bg-ink-900 p-5 text-left transition-colors hover:bg-ink-850 ${
                track === t.id ? "outline outline-1 outline-red/50" : ""
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="display text-xl text-fg">{t.name}</span>
                <span className="mono-data text-xs text-fg-low">
                  {td}/{tl.length} complete
                </span>
              </div>
              <p className="mt-1 text-sm text-fg-mid">{t.tagline}</p>
              <div className="mt-3 h-1 w-full bg-ink-700">
                <div
                  className={td === tl.length && tl.length > 0 ? "h-1 bg-win" : "h-1 bg-red"}
                  style={{ width: `${tl.length ? (td / tl.length) * 100 : 0}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <p className="mb-3 font-mono text-[11px] tracking-widest text-fg-low uppercase">
        {doneCount}/{lessons.length} lessons complete on this track
      </p>

      <div className="space-y-4">
        {lessons.map((lesson) => {
          const isOpen = open === lesson.id;
          const complete = !!done[lesson.id];
          return (
            <article key={lesson.id} id={lesson.id} className="panel scroll-mt-24">
              <button
                onClick={() => setOpen(isOpen ? null : lesson.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-ink-850"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`mono-data flex h-6 w-6 shrink-0 items-center justify-center border text-xs ${
                      complete ? "border-win/50 text-win" : "border-ink-600 text-fg-low"
                    }`}
                    aria-hidden="true"
                  >
                    {complete ? "✓" : "·"}
                  </span>
                  <div>
                    <p className="font-medium text-fg">{lesson.title}</p>
                    <p className="font-mono text-[11px] text-fg-low">{lesson.level} · {lesson.minutes} min</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-fg-low">{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="border-t border-ink-700 p-5">
                  <ul className="space-y-3">
                    {lesson.points.map((p, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-fg-mid">
                        <span className="mono-data shrink-0 text-fg-low">{String(i + 1).padStart(2, "0")}</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <div>
                      <p className="font-mono text-[11px] tracking-widest text-red-hi uppercase">Ask these three</p>
                      <ol className="mt-2 space-y-2">
                        {lesson.discoveryQuestions.map((q, i) => (
                          <li key={i} className="flex gap-2 text-sm leading-relaxed text-fg">
                            <span className="mono-data shrink-0 text-fg-low">Q{i + 1}</span>
                            <span>{q}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="border-l-2 border-amber pl-4">
                      <p className="font-mono text-[11px] tracking-widest text-amber uppercase">Objection rep</p>
                      <p className="mt-2 text-sm text-fg-mid italic">{lesson.objection.theyObject}</p>
                      <p className="mt-2 text-sm leading-relaxed text-fg">{lesson.objection.youAnswer}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setDone({ ...done, [lesson.id]: !complete })}
                    className={`mt-6 border px-4 py-2 font-mono text-sm ${
                      complete
                        ? "border-ink-600 text-fg-low hover:text-fg"
                        : "border-win/50 text-win hover:bg-win/10"
                    }`}
                  >
                    {complete ? "Mark incomplete" : "Mark lesson complete"}
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <p className="mt-6 font-mono text-[11px] text-fg-low">
        <Tag>Local only</Tag> Completion state lives in this browser — no backend in v1.
      </p>
    </div>
  );
}
