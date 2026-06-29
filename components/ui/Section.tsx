import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Props = {
  id?: string;
  tone?: "dark" | "light";
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, tone = "dark", className, children }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "light" ? "bg-surface-light text-ink-dark" : "bg-bg text-ink",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}
