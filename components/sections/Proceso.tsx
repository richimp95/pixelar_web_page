import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function Proceso() {
  const p = content.proceso;
  return (
    <Section id="proceso" tone="raised">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{p.title}</h2>
      </Reveal>
      <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {p.steps.map((step, i) => (
          <Reveal key={step.n} delay={i * 0.05}>
            <li className="h-full rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/5">
              <span className="font-display text-3xl font-bold text-accent">
                {String(step.n).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ink-strong">{step.title}</h3>
              <p className="mt-2 text-sm text-ink/75">{step.text}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
