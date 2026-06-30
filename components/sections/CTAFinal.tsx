import { Phone, Mail } from "lucide-react";
import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/motion/Reveal";

export function CTAFinal() {
  const c = content.ctaFinal;
  const contacto = content.footer.contacto;
  return (
    <section id="contacto" className="relative overflow-hidden bg-gradient-to-br from-accent-2/20 via-bg to-bg py-24">
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">
            {c.title}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mx-auto mt-5 max-w-[60ch] text-lg text-ink/85">{c.text}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <WhatsAppButton>{c.primaryCta}</WhatsAppButton>
            <Button href="#planes" variant="secondary">{c.secondaryCta}</Button>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink/80">
            <a
              href={`tel:${contacto.telefono.replace(/[^+\d]/g, "")}`}
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="h-4 w-4 text-accent" aria-hidden />
              {contacto.telefono}
            </a>
            <a
              href={`mailto:${contacto.correo}`}
              className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="h-4 w-4 text-accent" aria-hidden />
              {contacto.correo}
            </a>
          </div>
          <p className="mt-5 text-sm text-muted">{c.microcopy}</p>
        </Reveal>
      </Container>
    </section>
  );
}
