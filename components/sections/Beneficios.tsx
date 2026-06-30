import { Palette, Target, Smartphone, Layers, ShieldCheck, Search } from "lucide-react";
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

const icons = [Palette, Target, Smartphone, Layers, ShieldCheck, Search];

export function Beneficios() {
  const b = content.beneficios;
  return (
    <Section>
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{b.title}</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {b.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={item.title} delay={i * 0.04}>
              <Card className="h-full">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink-strong">{item.title}</h3>
                <p className="mt-2 text-ink/80">{item.text}</p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
