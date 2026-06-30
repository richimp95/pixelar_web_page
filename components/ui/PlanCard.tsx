"use client";

import { ShieldCheck, Sparkles, Crown, Rocket, Gift, type LucideIcon } from "lucide-react";
import { iconFor } from "@/lib/planIcons";
import { cn } from "@/lib/cn";

const badgeIcons = { shield: ShieldCheck, sparkles: Sparkles, crown: Crown, rocket: Rocket } as const;
export type BadgeVariant = keyof typeof badgeIcons;

type Props = {
  badge: string;
  badgeVariant: BadgeVariant;
  title: string;
  subtitle: string;
  amount: string;
  period: string;
  features: ReadonlyArray<{ name: string; detail: string }>;
  note?: string;
  cta: React.ReactNode;
  highlighted?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  /** Cuando true (toggle Anual), el precio no cambia pero se muestra el regalo. */
  isYearly?: boolean;
  className?: string;
};

/**
 * Tarjeta de plan (look "Neuro" recoloreado a la marca navy + cobre). Card única
 * (sin capa trasera) → simétrica y sin recorte superior. Altura completa para
 * igualar tamaños. Estados hover/seleccionado con curva ease-out fuerte (Emil)
 * y respeto a prefers-reduced-motion. Resuelve íconos Lucide internamente.
 */
export function PlanCard({
  badge,
  badgeVariant,
  title,
  subtitle,
  amount,
  period,
  features,
  note,
  cta,
  highlighted = false,
  selected = false,
  onSelect,
  isYearly = false,
  className,
}: Props) {
  const BadgeIcon: LucideIcon = badgeIcons[badgeVariant];
  const shownPeriod = isYearly ? "/ mes · facturado anual" : period;
  return (
    <div
      onClick={onSelect}
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl p-6 sm:p-7",
        "bg-gradient-to-br from-surface via-[#243750] to-surface ring-1",
        "transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
        "[@media(hover:hover)]:hover:-translate-y-1.5 active:scale-[0.99]",
        "motion-reduce:!translate-y-0 motion-reduce:!transition-none",
        onSelect && "cursor-pointer",
        selected
          ? "z-20 ring-accent shadow-[0_-13px_180px_-30px_rgba(198,134,98,0.6)]"
          : cn(
              "z-10",
              highlighted ? "ring-accent/50" : "ring-white/10",
              "focus-within:ring-accent/60 [@media(hover:hover)]:hover:ring-accent/40"
            ),
        className
      )}
    >
      {/* Glow decorativo superior */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />

      {/* Badge */}
      <div className="relative flex">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-accent-2 to-accent px-3.5 py-1.5 text-ink-dark shadow-lg ring-1 ring-white/20">
          <BadgeIcon className="h-4 w-4" aria-hidden />
          <span className="text-xs font-medium">{badge}</span>
        </div>
      </div>

      {/* Encabezado */}
      <h3 className="relative mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h3>
      <p className="relative mt-1 text-sm text-slate-300">{subtitle}</p>

      {/* Precio */}
      <div className="relative mt-5 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{amount}</span>
        <span className="text-sm text-slate-300">{shownPeriod}</span>
      </div>

      {/* Regalo anual */}
      {isYearly ? (
        <div className="relative mt-4 inline-flex items-center gap-2 self-start rounded-lg bg-accent/10 px-3 py-2 text-sm font-medium text-accent ring-1 ring-accent/25">
          <Gift className="h-4 w-4" aria-hidden />
          Landing Page gratis incluida
        </div>
      ) : null}

      {/* Features */}
      <div className="relative mt-6 border-t border-white/10 pt-6">
        <p className="mb-3 text-sm font-medium text-slate-200">Incluye:</p>
        <div className="space-y-3">
          {features.map((f) => {
            const Icon = iconFor(f.name);
            return (
              <div
                key={f.name}
                className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 transition-colors duration-200 hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900/60 ring-1 ring-white/10">
                    <Icon className="h-4 w-4 text-accent" aria-hidden />
                  </div>
                  <span className="text-sm font-medium text-slate-200">{f.name}</span>
                </div>
                <span className="ml-3 shrink-0 text-sm font-semibold text-slate-100">{f.detail}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA (no dispara selección) */}
      <div className="relative mt-auto pt-6" onClick={(e) => e.stopPropagation()}>
        {cta}
      </div>

      {/* Nota */}
      {note ? (
        <p className="relative mt-5 text-center text-[11px] font-normal leading-5 text-slate-300">{note}</p>
      ) : null}
    </div>
  );
}
