import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { WeaveDivider } from "../components/FabricWeave";
import { CountUp } from "../components/CountUp";
import { Tag } from "../components/Badge";
import { sizeDeal } from "../lib/sizer";
import { saveSizerHandoff } from "../lib/store";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-widest text-fg-low uppercase">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 font-mono text-[10px] text-fg-low">{hint}</p>}
    </label>
  );
}

const inputCls =
  "w-full border border-ink-600 bg-ink-950 px-3 py-2 font-mono text-sm text-fg placeholder:text-fg-low focus:border-fg-low focus:outline-none";

function DealSizer() {
  const [sites, setSites] = useState(250);
  const [mbps, setMbps] = useState(300);
  const [ha, setHa] = useState(false);
  const [seats, setSeats] = useState(500);
  const [hubs, setHubs] = useState(2);
  const navigate = useNavigate();

  const result = useMemo(
    () => sizeDeal({ sites, mbpsPerSite: mbps, ha, saseSeats: seats, hubs }),
    [sites, mbps, ha, seats, hubs],
  );

  const requestBom = () => {
    saveSizerHandoff({
      sites,
      mbpsPerSite: mbps,
      ha,
      saseSeats: seats,
      hubs,
      branchModel: result.branchModel,
      hubModel: result.hubModel,
      license: result.license,
      createdAt: new Date().toISOString(),
    });
    navigate("/deal-desk?from=sizer");
  };

  return (
    <section aria-label="SD-WAN Deal Sizer" id="sizer">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="display text-3xl text-fg">SD-WAN Deal Sizer</h2>
        <p className="font-mono text-[11px] text-fg-low">
          Directional band, not a BOM — output labeled illustrative
        </p>
      </div>

      <div className="grid gap-px border border-ink-700 bg-ink-700 lg:grid-cols-5">
        {/* Inputs */}
        <div className="space-y-5 bg-ink-900 p-5 lg:col-span-2">
          <Field label="Site count" hint="Branches, stores, clinics — exclude hubs">
            <input
              type="number"
              min={1}
              value={sites}
              onChange={(e) => setSites(Math.max(1, Number(e.target.value) || 1))}
              className={inputCls}
            />
          </Field>
          <Field label="Bandwidth per site (Mbps)">
            <input
              type="number"
              min={10}
              step={50}
              value={mbps}
              onChange={(e) => setMbps(Math.max(10, Number(e.target.value) || 10))}
              className={inputCls}
            />
          </Field>
          <Field label="Regional hubs" hint="Always quoted as HA pairs">
            <input
              type="number"
              min={0}
              value={hubs}
              onChange={(e) => setHubs(Math.max(0, Number(e.target.value) || 0))}
              className={inputCls}
            />
          </Field>
          <Field label="FortiSASE seats" hint="Remote / hybrid users to cover">
            <input
              type="number"
              min={0}
              step={50}
              value={seats}
              onChange={(e) => setSeats(Math.max(0, Number(e.target.value) || 0))}
              className={inputCls}
            />
          </Field>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={ha}
              onChange={(e) => setHa(e.target.checked)}
              className="h-4 w-4 accent-[#da291c]"
            />
            <span className="font-mono text-sm text-fg">HA pair at every branch</span>
          </label>
        </div>

        {/* Output */}
        <div className="bg-ink-950 p-5 lg:col-span-3">
          <p className="font-mono text-[11px] tracking-widest text-red-hi uppercase">Recommended band</p>
          <div className="mt-4 overflow-x-auto">
            <table className="tbl">
              <tbody>
                <tr>
                  <td className="w-40 font-mono text-[11px] tracking-widest text-fg-low uppercase">Branch model</td>
                  <td><span className="sku text-base">{result.branchModel}</span><span className="ml-2 text-xs text-fg-low">{result.branchClass}</span></td>
                </tr>
                <tr>
                  <td className="font-mono text-[11px] tracking-widest text-fg-low uppercase">Hub model</td>
                  <td className="sku">{result.hubModel}</td>
                </tr>
                <tr>
                  <td className="font-mono text-[11px] tracking-widest text-fg-low uppercase">Licensing</td>
                  <td>
                    <span className="sku">{result.license}</span>
                    <p className="mt-1 text-xs leading-relaxed text-fg-mid">{result.licenseWhy}</p>
                  </td>
                </tr>
                <tr>
                  <td className="font-mono text-[11px] tracking-widest text-fg-low uppercase">Devices</td>
                  <td className="mono-data">
                    {result.branchDevices.toLocaleString()} branch · {result.hubDevices.toLocaleString()} hub
                  </td>
                </tr>
                <tr>
                  <td className="font-mono text-[11px] tracking-widest text-fg-low uppercase">FortiSASE</td>
                  <td className="mono-data">{result.saseBand}</td>
                </tr>
                <tr>
                  <td className="font-mono text-[11px] tracking-widest text-fg-low uppercase">Wireless WAN</td>
                  <td className="sku">{result.extenderAttach}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="mt-4 space-y-1.5">
            {result.notes.map((n, i) => (
              <li key={i} className="flex gap-2 text-xs leading-relaxed text-fg-mid">
                <span className="text-amber">▸</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={requestBom}
            className="mt-5 w-full border border-red bg-red px-4 py-2.5 font-mono text-sm text-white hover:bg-red/85 sm:w-auto"
          >
            Request formal BOM from CDW →
          </button>
        </div>
      </div>
    </section>
  );
}

export function SaseSdwan() {
  return (
    <div>
      <PageHeader
        kicker="Pillar 2 · The scale story"
        title="SASE & Secure SD-WAN"
        lede="One OS converges routing, security, and SD-WAN on FortiGate — so a 3,000-site rollout is a logistics problem, not an integration project. CDW does national logistics for a living."
      />

      <section className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-3">
        <div className="bg-ink-900 p-5">
          <div className="text-3xl text-fg"><CountUp to={3000} suffix="+" /></div>
          <p className="mt-1 text-sm text-fg-mid">sites in the anchor national retail/QSR pursuit — Canada + U.S., CDW as bidding partner</p>
          <p className="mt-1 font-mono text-[10px] text-fg-low">Anchor archetype, anonymized</p>
        </div>
        <div className="bg-ink-900 p-5">
          <div className="mono-data text-3xl text-fg">0-touch</div>
          <p className="mt-1 text-sm text-fg-mid">provisioning at multi-thousand-site scale — a store manager plugs it in</p>
          <p className="mt-1 font-mono text-[10px] text-fg-low">FortiZTP + FortiManager templates + CDW staging</p>
        </div>
        <div className="bg-ink-900 p-5">
          <div className="mono-data text-3xl text-fg">1 agent</div>
          <p className="mt-1 text-sm text-fg-mid">FortiClient covers ZTNA + SASE + posture — no second rollout for remote users</p>
          <p className="mt-1 font-mono text-[10px] text-fg-low">FortiSASE: SWG · ZTNA · CASB · FWaaS</p>
        </div>
      </section>

      <WeaveDivider className="my-12" />

      <DealSizer />

      <WeaveDivider className="my-12" />

      {/* Narrative blocks */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="panel p-6">
          <p className="font-mono text-[11px] tracking-[0.25em] text-red-hi uppercase">The convergence argument</p>
          <h3 className="display mt-2 text-2xl text-fg">No bolt-on security tax</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-mid">
            Every competitor bolts one thing onto another: security licenses onto thin SD-WAN edges,
            or someone else's SD-WAN under a cloud SSE. FortiGate ships routing, NGFW, and SD-WAN in
            one OS with ASIC acceleration — per-application steering, integrated inspection, one
            console (FortiManager) from 50 sites to 5,000.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Tag>Single OS</Tag>
            <Tag>ASIC-accelerated</Tag>
            <Tag>ADVPN branch-to-branch</Tag>
          </div>
        </div>
        <div className="panel p-6">
          <p className="font-mono text-[11px] tracking-[0.25em] text-red-hi uppercase">The single-vendor SASE narrative</p>
          <h3 className="display mt-2 text-2xl text-fg">Same policy, on-prem and cloud</h3>
          <p className="mt-3 text-sm leading-relaxed text-fg-mid">
            FortiSASE delivers SWG, ZTNA, CASB, and FWaaS from the cloud, converging with the
            on-prem FortiGate estate under one policy plane and one agent. Against stitched
            competitors, ask one question: how many vendors are in the packet path — and who owns
            the incident at 2am?
          </p>
          <div className="mt-4">
            <Link to="/tools/battlecards" className="font-mono text-xs text-red-hi hover:underline">
              Open the SASE battlecards →
            </Link>
          </div>
        </div>
      </section>

      <WeaveDivider className="my-12" />

      {/* Anchor case study */}
      <section className="panel" aria-label="Anchor case study">
        <div className="panel-title"><span>Anchor pursuit archetype · anonymized</span></div>
        <div className="grid gap-6 p-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="display text-2xl text-fg">3,000+ site national retail / QSR rollout</h3>
            <p className="mt-3 text-sm leading-relaxed text-fg-mid">
              A national quick-service brand consolidating store networking across Canada and the
              U.S.: FortiGate 40F/90G per store, FEX-211G wireless WAN for day-1 turn-up and circuit
              backup, regional FG-200G-class hub pairs, FortiSASE for the mobile workforce. CDW
              Canada bids as prime — staging every unit, pre-loading SD-WAN profiles, running the
              wave-based deployment calendar around retail freeze windows, and wrapping day-2
              managed support.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-mid">
              Use this archetype to frame any distributed-enterprise conversation: the platform is
              Fortinet, but the thing the customer is buying is a rollout that lands on schedule.
            </p>
          </div>
          <div className="space-y-3">
            {[
              ["Store platform", "FG-40F / FG-90G + UTP"],
              ["Wireless WAN", "FEX-211G dual-SIM per site"],
              ["Regional hubs", "FG-200G class, HA pairs"],
              ["Remote workforce", "FortiSASE seats, one agent"],
              ["CDW delivers", "Staging · logistics · deployment · day-2"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-3 border-b border-ink-700 pb-2">
                <span className="font-mono text-[11px] tracking-widest text-fg-low uppercase">{k}</span>
                <span className="sku text-right text-xs">{v}</span>
              </div>
            ))}
            <Link
              to="/why-cdw"
              className="block pt-2 text-right font-mono text-xs text-red-hi hover:underline"
            >
              What CDW brings →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
