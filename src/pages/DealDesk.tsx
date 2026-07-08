import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { WeaveDivider } from "../components/FabricWeave";
import { Tag } from "../components/Badge";
import { loadSizerHandoff } from "../lib/store";
import { MIGRATIONS } from "../data/migrations";

const inputCls =
  "w-full border border-ink-600 bg-ink-950 px-3 py-2 font-mono text-sm text-fg placeholder:text-fg-low focus:border-fg-low focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-widest text-fg-low uppercase">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

/**
 * Forms validate and produce a structured payload preview — the exact JSON a
 * CRM/PRM integration would receive. Wire the submit handler to a real API in v2.
 */
function PayloadPreview({ payload }: { payload: object }) {
  return (
    <div className="mt-4 border border-win/30 bg-ink-950 p-4">
      <p className="font-mono text-[11px] tracking-widest text-win uppercase">
        Payload preview — what would be sent to CRM
      </p>
      <pre className="tbl-scroll mt-2 font-mono text-xs leading-relaxed text-fg-mid">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
}

const COSELL_PLAYS = [
  {
    name: "Bring Fortinet to the meeting",
    detail:
      "Request a Fortinet SE or field rep for a joint customer call. 48-hour turnaround target through the CDW partner desk.",
  },
  {
    name: "Shadow-AI discovery co-sell",
    detail:
      "CDW runs the two-week discovery; Fortinet SE presents the findings. The report meeting is the close meeting.",
  },
  {
    name: "National rollout pursuit team",
    detail:
      "For 500+ site opportunities: CDW logistics + services scoping with Fortinet distributed-enterprise specialists on the bid.",
  },
];

export function DealDesk() {
  const [params] = useSearchParams();
  const fromSizer = params.get("from") === "sizer";
  const playId = params.get("play");
  const play = MIGRATIONS.find((m) => m.id === playId);
  const sizer = useMemo(() => (fromSizer ? loadSizerHandoff() : null), [fromSizer]);

  const [form, setForm] = useState({
    customer: "",
    seller: "",
    email: "",
    opportunity: play ? `${play.name} migration` : sizer ? "SD-WAN / SASE refresh" : "",
    pillar: sizer ? "SASE & Secure SD-WAN" : play ? "NGFW / Refresh" : "",
    notes: sizer
      ? `Sizer output: ${sizer.sites.toLocaleString()} sites @ ${sizer.mbpsPerSite} Mbps` +
        `${sizer.ha ? ", HA branches" : ""}, ${sizer.hubs} hubs, ${sizer.saseSeats.toLocaleString()} SASE seats. ` +
        `Band: ${sizer.branchModel} branch / ${sizer.hubModel} / ${sizer.license} licensing.`
      : "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const payload = {
    type: "deal_registration",
    source: fromSizer ? "deal_sizer" : play ? `migration_play:${play.id}` : "deal_desk",
    submittedAt: new Date().toISOString(),
    customer: form.customer,
    seller: { name: form.seller, email: form.email },
    opportunity: form.opportunity,
    pillar: form.pillar,
    notes: form.notes,
    sizerBand: sizer ?? undefined,
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer.trim() || !form.seller.trim() || !form.opportunity.trim()) {
      setError("Customer, seller, and opportunity are required.");
      setSubmitted(false);
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("That email doesn't parse — check it.");
      setSubmitted(false);
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div>
      <PageHeader
        kicker="Sell · Deal Desk"
        title="Register it before lunch."
        lede="Deal registration hand-off, quote requests pre-filled from the Sizer, and co-sell plays. No backend in v1 — forms produce the exact payload a CRM integration will receive."
      />

      {(sizer || play) && (
        <div className="mb-6 border border-amber/40 bg-ink-900 px-4 py-3">
          <p className="font-mono text-xs text-amber">
            {sizer &&
              `Pre-filled from Deal Sizer · ${sizer.sites.toLocaleString()} sites · ${sizer.branchModel} band · saved ${new Date(sizer.createdAt).toLocaleString()}`}
            {play && `Pre-filled from migration play · ${play.name}`}
          </p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <form onSubmit={submit} className="panel space-y-4 p-5 lg:col-span-3" noValidate>
          <p className="font-mono text-[11px] tracking-[0.2em] text-red-hi uppercase">
            Deal registration / quote request
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Customer *">
              <input
                className={inputCls}
                value={form.customer}
                onChange={(e) => setForm({ ...form, customer: e.target.value })}
                placeholder="Acme Retail Group"
              />
            </Field>
            <Field label="Seller name *">
              <input
                className={inputCls}
                value={form.seller}
                onChange={(e) => setForm({ ...form, seller: e.target.value })}
                placeholder="Your name"
              />
            </Field>
            <Field label="Seller email">
              <input
                className={inputCls}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@cdw.com"
              />
            </Field>
            <Field label="Pillar / motion">
              <select
                className={inputCls}
                value={form.pillar}
                onChange={(e) => setForm({ ...form, pillar: e.target.value })}
              >
                <option value="">Select…</option>
                <option>Security for AI</option>
                <option>SASE & Secure SD-WAN</option>
                <option>NGFW / Refresh</option>
                <option>LAN Edge (AP/Switch)</option>
              </select>
            </Field>
          </div>
          <Field label="Opportunity *">
            <input
              className={inputCls}
              value={form.opportunity}
              onChange={(e) => setForm({ ...form, opportunity: e.target.value })}
              placeholder="One line: what are we selling, to whom, by when"
            />
          </Field>
          <Field label="Notes / sizing context">
            <textarea
              className={`${inputCls} min-h-24`}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Site counts, incumbents, renewal dates, competitive pressure…"
            />
          </Field>

          {error && <p className="font-mono text-xs text-red-hi">{error}</p>}
          {submitted && !error && (
            <p className="font-mono text-xs text-win">
              Validated. Payload below is ready for the CRM hook — v1 stops here by design.
            </p>
          )}

          <button
            type="submit"
            className="border border-red bg-red px-5 py-2.5 font-mono text-sm text-white hover:bg-red/85"
          >
            Register this deal
          </button>

          {submitted && !error && <PayloadPreview payload={payload} />}
        </form>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="panel">
            <div className="panel-title"><span>Co-sell playbooks</span></div>
            <ul>
              {COSELL_PLAYS.map((p) => (
                <li key={p.name} className="border-b border-ink-700 px-4 py-3 last:border-0">
                  <p className="text-sm font-medium text-fg">{p.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-fg-mid">{p.detail}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-5">
            <p className="font-mono text-[11px] tracking-[0.2em] text-fg-low uppercase">Ground rules</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-fg-mid">
              <li className="flex gap-2"><span className="text-amber">▸</span>Register before you quote — protection follows registration.</li>
              <li className="flex gap-2"><span className="text-amber">▸</span>Sizer bands are directional; formal BOMs come from the CDW Fortinet desk.</li>
              <li className="flex gap-2"><span className="text-amber">▸</span>Never commit SPIFF numbers from the portal — confirm current program terms.</li>
            </ul>
            <p className="mt-4"><Tag>v1 · local only</Tag></p>
          </div>
        </div>
      </div>

      <WeaveDivider className="my-10" />
    </div>
  );
}
