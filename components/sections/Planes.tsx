import { Gift, Info } from "lucide-react";
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PlanCard } from "@/components/ui/PlanCard";
import { PlanesCarousel } from "@/components/sections/PlanesCarousel";
import { Reveal } from "@/components/motion/Reveal";

export function Planes() {
  const p = content.planes;
  const s = p.startSprint;
  return (
    <Section id="planes">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{p.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{p.subtitle}</p>
      </Reveal>

      {/* Promo anual */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-accent/15 to-accent-2/10 p-5 ring-1 ring-accent/25 sm:flex-row sm:p-6">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
            <Gift className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-ink-strong">{p.promo.title}</p>
            <p className="mt-1 text-sm text-ink/80">{p.promo.text}</p>
          </div>
        </div>
      </Reveal>

      {/* Planes de mantenimiento: carrusel en móvil, grid en desktop */}
      <Reveal delay={0.1}>
        <div className="mt-12">
          <PlanesCarousel items={p.items} />
        </div>
      </Reveal>

      <Reveal>
        <p className="mx-auto mt-8 max-w-[70ch] text-center text-sm text-muted">{p.extraNote}</p>
      </Reveal>
      <Reveal delay={0.03}>
        <div className="mx-auto mt-4 flex max-w-[70ch] items-start gap-3 rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <p className="text-sm text-ink/70">{p.platformNote}</p>
        </div>
      </Reveal>

      {/* Start Your Page */}
      <Reveal>
        <div className="mt-20 text-center">
          <h3 className="font-display text-2xl font-bold text-ink-strong sm:text-3xl">¿Aún no tienes página web?</h3>
          <p className="mx-auto mt-3 max-w-[60ch] text-ink/80">
            La construimos por fases con sprints ágiles y pagos cómodos por etapa terminada.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="mt-10">
          <PlanCard
            badge={s.badge}
            badgeVariant="rocket"
            title={s.name}
            subtitle={s.audience}
            amount={s.price}
            period={s.period}
            features={s.features}
            note={s.note}
            className="max-w-xl"
            cta={
              <WhatsAppButton
                message={`Hola WNRGY, quiero desarrollar mi página desde cero con el plan ${s.name}. ¿Cómo empezamos?`}
                className="w-full"
              >
                {s.cta}
              </WhatsAppButton>
            }
          />
        </div>
      </Reveal>
    </Section>
  );
}
