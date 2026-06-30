import { content } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export function Hero() {
  const h = content.hero;
  return (
    <HeroGeometric
      badge={content.nav.brand}
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
