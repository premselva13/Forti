import type { CapabilityLevel } from "../data/domains";

/** Capability level chip. Green is reserved for Native/win — never decorative. */
export function LevelBadge({ level }: { level: CapabilityLevel }) {
  const styles: Record<CapabilityLevel, string> = {
    Native: "border-win/40 text-win",
    Partial: "border-amber/40 text-amber",
    Gap: "border-ink-600 text-fg-low",
  };
  const dot: Record<CapabilityLevel, string> = {
    Native: "bg-win",
    Partial: "bg-amber",
    Gap: "bg-fg-low",
  };
  return (
    <span className={`chip ${styles[level]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot[level]}`} />
      {level}
    </span>
  );
}

export function Tag({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "red" | "amber" | "win" }) {
  const tones = {
    neutral: "border-ink-600 text-fg-low",
    red: "border-red/50 text-red-hi",
    amber: "border-amber/40 text-amber",
    win: "border-win/40 text-win",
  };
  return <span className={`chip ${tones[tone]}`}>{children}</span>;
}
