import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function Problema() {
  const p = content.problema;
  return (
    <Section>
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{p.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{p.text}</p>
      </Reveal>
      <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {p.items.map((item, i) => (
          <Reveal key={item} delay={i * 0.04}>
            <li className="flex items-start gap-3 border-b border-white/[0.06] pb-4 text-ink/90">
              <span aria-hidden className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
              {item}
            </li>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
