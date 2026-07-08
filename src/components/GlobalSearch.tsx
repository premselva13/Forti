import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SKUS } from "../data/skus";
import { BATTLECARDS } from "../data/battlecards";
import { AI_DOMAINS } from "../data/domains";
import { LESSONS } from "../data/lessons";
import { MIGRATIONS } from "../data/migrations";

interface SearchHit {
  kind: string;
  title: string;
  detail: string;
  to: string;
}

const PAGES: SearchHit[] = [
  { kind: "PAGE", title: "Command Deck", detail: "Home dashboard", to: "/" },
  { kind: "PAGE", title: "Security for AI", detail: "Pillar 1 — Domain Explorer", to: "/security-for-ai" },
  { kind: "PAGE", title: "SASE & Secure SD-WAN", detail: "Pillar 2 — Deal Sizer", to: "/sase-sd-wan" },
  { kind: "PAGE", title: "Battlecard Engine", detail: "Competitive cards", to: "/tools/battlecards" },
  { kind: "PAGE", title: "SKU Navigator", detail: "Most-quoted SKUs, lifecycle flags", to: "/tools/skus" },
  { kind: "PAGE", title: "Migration Plays", detail: "Displacement flows", to: "/tools/migrations" },
  { kind: "PAGE", title: "Learn — Seller Track", detail: "Enablement paths", to: "/learn" },
  { kind: "PAGE", title: "Deal Desk", detail: "Register, quote, co-sell", to: "/deal-desk" },
  { kind: "PAGE", title: "Why CDW", detail: "For Fortinet field", to: "/why-cdw" },
  { kind: "PAGE", title: "Intel Feed", detail: "Launches & competitive intel", to: "/intel" },
];

function buildIndex(): SearchHit[] {
  return [
    ...PAGES,
    ...SKUS.map((s) => ({
      kind: "SKU",
      title: s.sku,
      detail: `${s.name} — ${s.positioning}`,
      to: `/tools/skus?q=${encodeURIComponent(s.sku)}`,
    })),
    ...BATTLECARDS.map((b) => ({
      kind: "BATTLECARD",
      title: `vs. ${b.competitor}`,
      detail: b.arena,
      to: `/tools/battlecards#${b.id}`,
    })),
    ...AI_DOMAINS.map((d) => ({
      kind: "AI DOMAIN",
      title: `${d.id} · ${d.name}`,
      detail: `${d.level} — ${d.products.join(", ") || "partner attach"}`,
      to: `/security-for-ai#${d.id}`,
    })),
    ...LESSONS.map((l) => ({
      kind: "LESSON",
      title: l.title,
      detail: l.level,
      to: `/learn#${l.id}`,
    })),
    ...MIGRATIONS.map((m) => ({
      kind: "PLAY",
      title: m.name,
      detail: m.why,
      to: `/tools/migrations#${m.id}`,
    })),
  ];
}

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const index = useMemo(buildIndex, []);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 10);
    return index
      .filter((h) => `${h.kind} ${h.title} ${h.detail}`.toLowerCase().includes(q))
      .slice(0, 12);
  }, [query, index]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  if (!open) return null;

  const go = (hit: SearchHit) => {
    onClose();
    const hash = hit.to.split("#")[1];
    navigate(hit.to);
    if (hash) {
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ block: "start" }), 80);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink-950/80 p-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Global search"
      onClick={onClose}
    >
      <div className="panel w-full max-w-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-ink-700 px-4">
          <span className="font-mono text-xs text-red-hi">&gt;_</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") onClose();
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor((c) => Math.min(c + 1, hits.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor((c) => Math.max(c - 1, 0));
              }
              if (e.key === "Enter" && hits[cursor]) go(hits[cursor]);
            }}
            placeholder="Search SKUs, battlecards, domains, playbooks…"
            className="w-full bg-transparent py-3 font-mono text-sm text-fg placeholder:text-fg-low focus:outline-none"
          />
          <kbd className="chip border-ink-600 text-fg-low">esc</kbd>
        </div>
        <ul className="max-h-[50vh] overflow-y-auto py-1">
          {hits.length === 0 && (
            <li className="px-4 py-6 text-center font-mono text-xs text-fg-low">
              No matches. Try a SKU, competitor, or domain.
            </li>
          )}
          {hits.map((hit, i) => (
            <li key={`${hit.kind}-${hit.title}`}>
              <button
                onMouseEnter={() => setCursor(i)}
                onClick={() => go(hit)}
                className={`flex w-full items-baseline gap-3 px-4 py-2 text-left ${
                  i === cursor ? "bg-ink-800" : ""
                }`}
              >
                <span className="w-24 shrink-0 font-mono text-[10px] tracking-widest text-fg-low uppercase">
                  {hit.kind}
                </span>
                <span className="shrink-0 font-mono text-sm text-fg">{hit.title}</span>
                <span className="truncate text-xs text-fg-low">{hit.detail}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-ink-700 px-4 py-1.5 font-mono text-[10px] tracking-wider text-fg-low">
          ↑↓ navigate · ↵ open · reaches SKUs, battlecards, domains, lessons, plays
        </div>
      </div>
    </div>
  );
}
