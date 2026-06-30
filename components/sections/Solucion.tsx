import { BadgeCheck, Smartphone, Wrench } from "lucide-react";
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

const icons = [BadgeCheck, Smartphone, Wrench];

export function Solucion() {
  const s = content.solucion;
  return (
    <Section tone="raised">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{s.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{s.text}</p>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {s.beneficios.map((b, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={b.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/5 transition-transform duration-200 ease-out hover:-translate-y-1">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-strong">{b.title}</h3>
                <p className="mt-2 text-ink/80">{b.text}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
