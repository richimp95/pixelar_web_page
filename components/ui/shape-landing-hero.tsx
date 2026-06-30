"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Circle } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  reduced = false,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  reduced?: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate }}
      transition={{
        duration: reduced ? 0.6 : 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: reduced ? 0.6 : 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.12]",
            "shadow-[0_8px_32px_0_rgba(198,134,98,0.12)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(224,168,131,0.18),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export function HeroGeometric({
  logo,
  badge = "WNRGY",
  title1 = "Páginas web modernas",
  title2,
  subtitle,
  children,
}: {
  logo?: ReactNode;
  badge?: string;
  title1?: string;
  title2?: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  const reduced = useReducedMotion() ?? false;

  const fadeUpVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.5 : 1, delay: 0.5 + i * 0.2, ease: [0.25, 0.4, 0.25, 1] as const },
    }),
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-bg"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-accent-3/[0.06] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <ElegantShape reduced={reduced} delay={0.3} width={600} height={140} rotate={12} gradient="from-accent/[0.18]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
        <ElegantShape reduced={reduced} delay={0.5} width={500} height={120} rotate={-15} gradient="from-accent-2/[0.16]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
        <ElegantShape reduced={reduced} delay={0.4} width={300} height={80} rotate={-8} gradient="from-accent-3/[0.18]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
        <ElegantShape reduced={reduced} delay={0.6} width={200} height={60} rotate={20} gradient="from-accent/[0.16]" className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
        <ElegantShape reduced={reduced} delay={0.7} width={150} height={40} rotate={-25} gradient="from-accent-2/[0.16]" className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {logo ? (
            <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="mb-6 flex justify-center md:mb-8">
              {logo}
            </motion.div>
          ) : null}
          <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] mb-8 md:mb-12">
            <Circle className="h-2 w-2 fill-accent text-accent" />
            <span className="text-sm text-ink/70 tracking-wide">{badge}</span>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 tracking-tight text-balance">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">{title1}</span>
              {title2 ? (
                <>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-2 via-white/90 to-accent">{title2}</span>
                </>
              ) : null}
            </h1>
          </motion.div>

          {subtitle ? (
            <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
              <p className="text-base sm:text-lg md:text-xl text-ink/70 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">{subtitle}</p>
            </motion.div>
          ) : null}

          {children ? (
            <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="flex flex-col items-center gap-6">
              {children}
            </motion.div>
          ) : null}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/80 pointer-events-none" />
    </section>
  );
}
