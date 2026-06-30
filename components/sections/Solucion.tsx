import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function Solucion() {
  const s = content.solucion;
  return (
    <Section tone="light">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-dark text-balance sm:text-4xl">{s.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink-dark/70">{s.text}</p>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {s.beneficios.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.05}>
            <div className="h-full rounded-2xl bg-white p-6 shadow-lg shadow-black/5 ring-1 ring-black/5 transition-transform duration-200 ease-out hover:-translate-y-1">
              <h3 className="font-display text-xl font-semibold text-ink-dark">{b.title}</h3>
              <p className="mt-2 text-ink-dark/70">{b.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
