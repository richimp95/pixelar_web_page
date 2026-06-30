import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

export function Servicios() {
  const s = content.servicios;
  return (
    <Section id="servicios" tone="dark">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{s.title}</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {s.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.05}>
            <Card className="h-full">
              <h3 className="font-display text-xl font-semibold text-ink-strong">{item.title}</h3>
              <p className="mt-2 text-ink/80">{item.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
