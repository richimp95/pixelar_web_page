import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Props = {
  id?: string;
  /** "base" = fondo navy; "raised" = banda navy elevada (da ritmo sin invertir el tema). */
  tone?: "base" | "raised";
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, tone = "base", className, children }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 text-ink sm:py-28",
        tone === "raised" ? "bg-surface/25 border-y border-white/[0.06]" : "bg-bg",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
