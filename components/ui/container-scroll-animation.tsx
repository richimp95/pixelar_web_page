"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { useScroll, useTransform, motion, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * Efecto "device scroll" (adaptado): la tarjeta se endereza y escala al
 * hacer scroll. Con prefers-reduced-motion queda fija en su estado final
 * (sin tilt ni parallax), solo con la entrada por opacidad de Reveal externo.
 */
export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: ReactNode;
  children: ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const reduced = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleRange = isMobile ? [0.85, 0.95] : [1.03, 1];
  const rotate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : scaleRange);
  const translate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -60]);

  return (
    <div className="relative flex h-[46rem] items-center justify-center p-2 sm:h-[52rem] md:p-10" ref={containerRef}>
      <div className="relative w-full py-6 md:py-14" style={{ perspective: "1200px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
}

function Header({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: ReactNode }) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-3xl text-center">
      {titleComponent}
    </motion.div>
  );
}

function Card({ rotate, scale, children }: { rotate: MotionValue<number>; scale: MotionValue<number>; children: ReactNode }) {
  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className="mx-auto -mt-8 h-[26rem] w-full max-w-5xl rounded-[26px] border border-white/10 bg-ink-dark p-2 shadow-2xl shadow-black/40 sm:h-[32rem] md:mt-0 md:p-5"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0a1320]">{children}</div>
    </motion.div>
  );
}
