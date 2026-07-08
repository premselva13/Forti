import { motion, useReducedMotion } from "framer-motion";

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-10 pb-6 lg:pt-14"
    >
      <p className="mb-3 font-mono text-[11px] tracking-[0.25em] text-red-hi uppercase">{kicker}</p>
      <h1 className="display max-w-3xl text-4xl text-fg sm:text-5xl lg:text-6xl">{title}</h1>
      {lede && <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-mid">{lede}</p>}
    </motion.div>
  );
}
