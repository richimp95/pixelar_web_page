import { PenTool, RefreshCw, Wrench, Search } from "lucide-react";
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

const icons = [PenTool, RefreshCw, Wrench, Search];

export function Servicios() {
  const s = content.servicios;
  return (
    <Section id="servicios">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{s.title}</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {s.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={item.title} delay={i * 0.05}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-strong">{item.title}</h3>
                    <p className="mt-2 text-ink/80">{item.text}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
