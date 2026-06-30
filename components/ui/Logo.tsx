import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

type Props = {
  orientation?: "horizontal" | "vertical";
  className?: string;
  /** Clases para la marca (ícono). Controla el tamaño con h-*. */
  markClassName?: string;
  /** Clases para el wordmark de texto. */
  textClassName?: string;
};

/**
 * Lockup de marca: ícono cobre (sin texto) + "WNRGY" con la tipografía de la
 * página (font-display / Manrope). Reemplaza al SVG de logo con wordmark propio.
 */
export function Logo({
  orientation = "horizontal",
  className,
  markClassName = "h-7 w-auto",
  textClassName = "text-xl text-accent",
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        orientation === "vertical" ? "flex-col gap-3" : "gap-2.5",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset("/logo/mark-copper-transparent.svg")} alt="" aria-hidden className={markClassName} />
      <span className={cn("font-display font-bold leading-none tracking-tight", textClassName)}>WNRGY</span>
    </span>
  );
}
