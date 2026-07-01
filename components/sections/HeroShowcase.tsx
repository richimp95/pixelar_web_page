import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { WebsiteMosaic } from "@/components/ui/WebsiteMosaic";
import { Reveal } from "@/components/motion/Reveal";

export function HeroShowcase() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <Reveal>
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="font-display text-3xl font-bold text-balance text-ink-strong sm:text-4xl md:text-5xl">
                Diseños con el nivel de las mejores agencias del mundo
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
                Cada proyecto se diseña a la medida, con color, tipografía e identidad propia.
              </p>
            </>
          }
        >
          <WebsiteMosaic />
        </ContainerScroll>
      </Reveal>
    </section>
  );
}
