import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  const h = content.hero;
  return (
    <section id="inicio" className="relative overflow-hidden bg-bg pt-24 pb-20 sm:pt-28 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]
        [background-image:linear-gradient(var(--color-accent)_1px,transparent_1px),linear-gradient(90deg,var(--color-accent)_1px,transparent_1px)]
        [background-size:40px_40px]"
      />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <h1 className="font-display text-4xl font-bold leading-tight text-ink-strong text-balance sm:text-5xl lg:text-6xl">
              {h.title}
            </h1>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-[60ch] text-lg text-ink/90">{h.subtitle}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-4">
              <WhatsAppButton>{h.primaryCta}</WhatsAppButton>
              <Button href="#planes" variant="secondary">{h.secondaryCta}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 text-sm text-muted">{h.microcopy}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <HeroMockup />
        </Reveal>
      </Container>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface p-3 shadow-2xl shadow-accent/10">
      <div className="mb-3 flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
        <span className="h-3 w-3 rounded-full bg-green-400/70" />
      </div>
      <div className="space-y-3 rounded-xl bg-bg p-4">
        <div className="h-24 rounded-lg bg-gradient-to-r from-accent/30 to-accent-2/30" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-white/5 p-3">
              <div className="mb-2 h-6 w-10 rounded bg-accent/40" />
              <div className="h-2 w-full rounded bg-white/10" />
              <div className="mt-1 h-2 w-2/3 rounded bg-white/10" />
            </div>
          ))}
        </div>
        <div className="h-2 w-1/2 rounded bg-white/10" />
        <div className="h-2 w-3/4 rounded bg-white/10" />
      </div>
    </div>
  );
}
