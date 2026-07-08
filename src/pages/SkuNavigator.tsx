import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { Tag } from "../components/Badge";
import { SKUS, type SkuCategory } from "../data/skus";

const CATEGORIES: ("All" | SkuCategory)[] = [
  "All",
  "FortiGate",
  "FortiAP",
  "FortiSwitch",
  "FortiExtender",
  "Licensing",
];

export function SkuNavigator() {
  const [params, setParams] = useSearchParams();
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const query = params.get("q") ?? "";

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKUS.filter(
      (s) =>
        (category === "All" || s.category === category) &&
        (!q || `${s.sku} ${s.name} ${s.positioning} ${s.specs}`.toLowerCase().includes(q)),
    );
  }, [category, query]);

  return (
    <div>
      <PageHeader
        kicker="Engage · Tools"
        title="SKU Navigator"
        lede="The most-quoted lines with lifecycle flags and successor mapping. Specs are sizing-conversation approximations — validate against the current datasheet, and never quote pricing from this portal."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setParams(e.target.value ? { q: e.target.value } : {}, { replace: true })}
          placeholder="Filter: FG-90G, Wi-Fi 7, UTP…"
          aria-label="Filter SKUs"
          className="w-full max-w-xs border border-ink-600 bg-ink-950 px-3 py-2 font-mono text-sm text-fg placeholder:text-fg-low focus:border-fg-low focus:outline-none"
        />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`chip cursor-pointer ${
                category === c ? "border-red/60 text-red-hi" : "border-ink-600 text-fg-low hover:text-fg"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="tbl-scroll panel">
        <table className="tbl min-w-[900px]">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Line</th>
              <th>Positioning</th>
              <th>Spec class</th>
              <th>Lifecycle</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.sku}>
                <td className="sku">{s.sku}</td>
                <td className="whitespace-nowrap text-fg">{s.name}</td>
                <td className="max-w-md">
                  {s.positioning}
                  {s.notes && <span className="mt-1 block font-mono text-[10px] text-fg-low">{s.notes}</span>}
                </td>
                <td className="mono-data text-xs whitespace-nowrap">{s.specs}</td>
                <td className="whitespace-nowrap">
                  {s.endOfOrder ? (
                    <div className="space-y-1">
                      <Tag tone="amber">EOO flag</Tag>
                      {s.successor && (
                        <p className="font-mono text-[10px] text-fg-low">
                          → <span className="text-win">{s.successor}</span>
                        </p>
                      )}
                    </div>
                  ) : s.successor ? (
                    <p className="font-mono text-[10px] text-fg-low">
                      next gen → <span className="text-fg">{s.successor}</span>
                    </p>
                  ) : (
                    <Tag>Current</Tag>
                  )}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center font-mono text-xs text-fg-low">
                  No SKUs match. Clear the filter or try a family name.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-4 font-mono text-[11px] leading-relaxed text-fg-low">
        EOO flags are directional — verify end-of-order dates on the current Fortinet price list.
        Licensing SKUs shown are family placeholders; exact SKUs are per-model. Request a formal BOM
        from the Deal Desk for anything customer-facing.
      </p>
    </div>
  );
}
