import { Plus } from "lucide-react";
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function FAQ() {
  const f = content.faq;
  return (
    <Section tone="raised">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{f.title}</h2>
      </Reveal>
      <div className="mx-auto mt-10 max-w-3xl divide-y divide-white/10">
        {f.items.map((item, i) => (
          <Reveal key={item.q} delay={i * 0.03}>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink-strong">
                {item.q}
                <Plus
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-accent transition-transform duration-200 group-open:rotate-45"
                />
              </summary>
              <p className="mt-3 text-ink/70">{item.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
