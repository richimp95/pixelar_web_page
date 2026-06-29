import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";

export function Renovacion() {
  const r = content.renovacion;
  return (
    <Section tone="dark">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{r.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{r.text}</p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-2xl bg-white/[0.03] p-6 ring-1 ring-red-400/20">
            <h3 className="font-display text-lg font-semibold text-red-300">Antes</h3>
            <ul className="mt-4 space-y-2 text-ink/80">
              {r.antes.map((x) => (
                <li key={x} className="flex gap-2"><span aria-hidden className="text-red-300">✕</span>{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="h-full rounded-2xl bg-white/[0.03] p-6 ring-1 ring-accent/30">
            <h3 className="font-display text-lg font-semibold text-accent">Después con Pixelar</h3>
            <ul className="mt-4 space-y-2 text-ink/90">
              {r.despues.map((x) => (
                <li key={x} className="flex gap-2"><span aria-hidden className="text-accent">✓</span>{x}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="mt-10">
          <WhatsAppButton message="Hola Pixelar, quiero renovar mi página web actual. ¿Me pueden ayudar?">
            {r.cta}
          </WhatsAppButton>
        </div>
      </Reveal>
    </Section>
  );
}
