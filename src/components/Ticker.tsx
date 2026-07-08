import { Link } from "react-router-dom";
import { INTEL } from "../data/intel";

const TAG_COLOR: Record<string, string> = {
  LAUNCH: "text-red-hi",
  COMPETITIVE: "text-amber",
  ANALYST: "text-fg-mid",
  PROGRAM: "text-amber",
  PLAY: "text-win",
};

/** Terminal-style intel ticker. Duplicated content loops seamlessly. */
export function Ticker() {
  const items = INTEL.slice(0, 6);
  const strip = (
    <>
      {items.map((item) => (
        <span key={item.id} className="inline-flex items-center gap-2 px-6 font-mono text-xs whitespace-nowrap">
          <span className={`${TAG_COLOR[item.tag]} font-medium tracking-widest`}>{item.tag}</span>
          <span className="text-fg-mid">{item.headline}</span>
          <span className="text-fg-low">·</span>
          <span className="text-fg-low">{item.date}</span>
        </span>
      ))}
    </>
  );
  return (
    <Link
      to="/intel"
      className="block border-b border-ink-700 bg-ink-900 py-1.5 hover:bg-ink-850"
      aria-label="Intel feed ticker — open Intel Feed"
    >
      <div className="relative overflow-hidden">
        <div className="animate-ticker flex w-max">
          {strip}
          {strip}
        </div>
      </div>
    </Link>
  );
}
