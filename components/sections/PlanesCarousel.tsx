"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PlanCard, type BadgeVariant } from "@/components/ui/PlanCard";
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
  const initial = Math.max(items.findIndex((p) => p.highlighted), 0);
  const [selected, setSelected] = useState(initial);
  const [active, setActive] = useState(initial);
  const scroller = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);

  // Dot activo en móvil: IntersectionObserver sobre el contenedor scroll (sin scroll listener).
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { root, threshold: 0.6 }
    );
    slides.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const goTo = (i: number) =>
    slides.current[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });

  return (
    <div>
      <div
        ref={scroller}
        className={cn(
          "flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-4",
          "lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-8 lg:overflow-visible lg:px-0 lg:pb-0",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        {items.map((plan, i) => (
          <div
            key={plan.name}
            data-idx={i}
            ref={(el) => {
              slides.current[i] = el;
            }}
            className="shrink-0 basis-[88%] snap-center sm:basis-[62%] lg:min-w-0 lg:shrink lg:basis-auto"
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
              className={plan.highlighted ? "lg:scale-[1.02]" : undefined}
              cta={
                <WhatsAppButton
                  variant={selected === i ? "primary" : "secondary"}
                  message={`Hola WNRGY, me interesa el Plan ${plan.name} (${plan.price}/mes). Me gustaría más información.`}
                  className="w-full"
                >
                  {plan.cta}
                </WhatsAppButton>
              }
            />
          </div>
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
