"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PlanCard, type BadgeVariant } from "@/components/ui/PlanCard";
import { PricingSwitch } from "@/components/ui/PricingSwitch";
import { cn } from "@/lib/cn";

const badgeVariants: BadgeVariant[] = ["shield", "sparkles", "crown"];

type PlanItem = {
  name: string;
  badge: string;
  audience: string;
  price: string;
  period: string;
  highlighted: boolean;
  features: ReadonlyArray<{ name: string; detail: string }>;
  note: string;
  cta: string;
};

export function PlanesCarousel({ items }: { items: readonly PlanItem[] }) {
  const initial = Math.max(
    items.findIndex((p) => p.highlighted),
    0
  );
  const [selected, setSelected] = useState(initial);
  const [active, setActive] = useState(initial);
  const [isYearly, setIsYearly] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const scroller = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);

  // Slide activo en móvil (IntersectionObserver) → además auto-selecciona.
  // Solo en móvil: en el grid de desktop todas las cards intersectan y romperían
  // la selección por defecto.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const isMobile = () => window.matchMedia("(max-width: 1023px)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        if (!isMobile()) return;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.idx);
            setActive(i);
            setSelected(i);
          }
        });
      },
      { root, threshold: 0.6 }
    );
    slides.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Centra un slide DENTRO del carrusel (scroll horizontal del contenedor),
  // sin desplazar verticalmente la página (scrollIntoView movía toda la página).
  const centerSlide = (i: number, smooth: boolean) => {
    const root = scroller.current;
    const el = slides.current[i];
    if (!root || !el) return;
    const left =
      root.scrollLeft +
      el.getBoundingClientRect().left -
      root.getBoundingClientRect().left -
      (root.clientWidth - el.clientWidth) / 2;
    root.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  };

  // Al montar (móvil), centrar la recomendada para que quede seleccionada por default.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 1023px)").matches) return;
    centerSlide(initial, false);
  }, [initial]);

  const goTo = (i: number) => centerSlide(i, true);

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <PricingSwitch value={isYearly ? "anual" : "mensual"} onChange={(v) => setIsYearly(v === "anual")} />
      </div>

      <div
        ref={scroller}
        className={cn(
          "flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 py-8",
          "lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-8 lg:overflow-visible lg:px-0",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {items.map((plan, i) => (
          <motion.div
            key={plan.name}
            data-idx={i}
            ref={(el) => {
              slides.current[i] = el;
            }}
            initial={reduced ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.12, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="flex shrink-0 basis-[88%] snap-center sm:basis-[62%] lg:min-w-0 lg:shrink lg:basis-auto"
          >
            <PlanCard
              badge={plan.badge}
              badgeVariant={badgeVariants[i % badgeVariants.length]}
              title={plan.name}
              subtitle={plan.audience}
              amount={plan.price}
              period={plan.period}
              features={plan.features}
              note={plan.note}
              highlighted={plan.highlighted}
              selected={selected === i}
              onSelect={() => setSelected(i)}
              isYearly={isYearly}
              cta={
                <WhatsAppButton
                  variant={selected === i ? "primary" : "secondary"}
                  message={`Hola WNRGY, me interesa el Plan ${plan.name} (${plan.price}/mes${
                    isYearly ? ", plan anual con Landing Page gratis" : ""
                  }). Me gustaría más información.`}
                  className="w-full"
                >
                  {plan.cta}
                </WhatsAppButton>
              }
            />
          </motion.div>
        ))}
      </div>

      {/* Indicadores (solo móvil) */}
      <div className="mt-4 flex justify-center gap-2 lg:hidden">
        {items.map((plan, i) => (
          <button
            key={plan.name}
            type="button"
            aria-label={`Ver plan ${plan.name}`}
            aria-current={active === i}
            onClick={() => goTo(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
              active === i ? "w-6 bg-accent" : "w-2 bg-white/25 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
