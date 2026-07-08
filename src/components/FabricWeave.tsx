import { motion, useReducedMotion } from "framer-motion";

/**
 * The signature "fabric weave" motif — thin animated lines connecting
 * product nodes into the Security Fabric. Hero variant draws the full
 * weave; divider variant is a quiet single-thread section break.
 */

const THREADS = [
  "M0,64 C160,64 200,20 360,20 S560,96 720,96 S920,40 1080,40 S1280,80 1440,80",
  "M0,96 C180,96 240,48 400,48 S600,120 760,120 S960,64 1120,64 S1320,104 1440,104",
  "M0,32 C140,32 220,88 380,88 S580,24 740,24 S940,108 1100,108 S1300,48 1440,48",
  "M0,120 C200,120 260,72 420,72 S620,32 780,32 S980,96 1140,96 S1340,64 1440,64",
];

const NODES: [number, number][] = [
  [360, 20],
  [720, 96],
  [1080, 40],
  [400, 48],
  [760, 120],
  [1120, 64],
  [380, 88],
  [740, 24],
  [1100, 108],
];

export function FabricWeave({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 1440 140"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {THREADS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={i === 1 ? "var(--color-red)" : "var(--color-ink-600)"}
          strokeOpacity={i === 1 ? 0.65 : 0.8}
          strokeWidth="1"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 2.2, delay: i * 0.25, ease: "easeInOut" }}
        />
      ))}
      {NODES.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="2.5"
          fill={i % 3 === 1 ? "var(--color-red)" : "var(--color-fg-low)"}
          initial={reduce ? undefined : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 + i * 0.12, duration: 0.5 }}
        />
      ))}
    </svg>
  );
}

/** Quiet single-thread section divider. */
export function WeaveDivider({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative h-px w-full overflow-visible ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 8" className="absolute inset-x-0 -top-1 h-2 w-full" fill="none" preserveAspectRatio="none">
        <motion.path
          d="M0,4 C240,4 300,1 480,1 S720,7 960,7 S1200,4 1440,4"
          stroke="var(--color-ink-600)"
          strokeWidth="1"
          initial={reduce ? undefined : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <circle cx="480" cy="1" r="1.5" fill="var(--color-red)" />
        <circle cx="960" cy="7" r="1.5" fill="var(--color-fg-low)" />
      </svg>
    </div>
  );
}
