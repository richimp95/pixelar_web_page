import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Logo } from "@/components/ui/Logo";

export function Hero() {
  const h = content.hero;
  return (
    <HeroGeometric
      logo={
        <Logo
          orientation="vertical"
          markClassName="h-16 w-auto sm:h-20"
          textClassName="text-3xl text-ink-strong sm:text-4xl"
        />
      }
      badge="Startups y PYMEs · Guatemala"
      title1="Páginas web modernas"
      title2="para negocios que crecen"
      subtitle="Creamos, renovamos y administramos páginas web profesionales para empresas en Guatemala."
    >
      <div className="flex flex-wrap items-center justify-center gap-4">
        <WhatsAppButton>{h.primaryCta}</WhatsAppButton>
        <Button href="#planes" variant="secondary">{h.secondaryCta}</Button>
      </div>
    </HeroGeometric>
  );
}
