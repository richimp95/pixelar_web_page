import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

export function Planes() {
  const p = content.planes;
  return (
    <Section id="planes">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{p.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{p.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-start">
        {p.items.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.06}>
            <div
              className={cn(
                "relative flex h-full flex-col rounded-2xl p-7 ring-1 transition-transform duration-200 ease-out hover:-translate-y-1",
                plan.highlighted
                  ? "bg-surface ring-accent shadow-2xl shadow-accent/20 lg:scale-[1.03]"
                  : "bg-white/[0.03] ring-white/10"
              )}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-ink-dark">
                  {plan.tag}
                </span>
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">{plan.tag}</span>
              )}
              <h3 className="mt-2 font-display text-2xl font-bold text-ink-strong">{plan.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent">Cotización personalizada</p>
              <p className="mt-3 text-sm text-ink/80">{plan.desc}</p>

              <ul className="mt-6 space-y-2 text-sm text-ink/90">
                {plan.includes.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span aria-hidden className="text-accent">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
                {"notIncludes" in plan &&
                  plan.notIncludes?.map((f) => (
                    <li key={f} className="flex gap-2 text-muted line-through">
                      <span aria-hidden>✕</span>
                      <span>{f}</span>
                    </li>
                  ))}
              </ul>

              <div className="mt-7 pt-2">
                <WhatsAppButton
                  variant={plan.highlighted ? "primary" : "secondary"}
                  message={`Hola WNRGY, me interesa el Plan ${plan.name}. Me gustaría recibir más información.`}
                  className="w-full"
                >
                  {plan.cta}
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="max-w-[55ch] text-ink/80">{p.helpText}</p>
          <WhatsAppButton message="Hola WNRGY, no estoy seguro de qué plan elegir. ¿Me pueden asesorar?">
            {p.helpCta}
          </WhatsAppButton>
        </div>
      </Reveal>
    </Section>
  );
}
