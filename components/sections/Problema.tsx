import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

export function Problema() {
  const p = content.problema;
  return (
    <Section tone="dark">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{p.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{p.text}</p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {p.items.map((item, i) => (
          <Reveal key={item} delay={i * 0.04}>
            <Card className="h-full">
              <p className="text-ink">{item}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
