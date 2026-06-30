"use client";

import { ShieldCheck, Sparkles, Crown, Rocket, type LucideIcon } from "lucide-react";
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
  className?: string;
};

/**
 * Tarjeta de plan glassmorphism. Estructura/sombras/blur/ring del template del
 * cliente, recoloreadas a la paleta de marca (cobre). Estados hover/seleccionado
 * con curva ease-out fuerte (Emil) y respeto a prefers-reduced-motion.
 * Resuelve los íconos Lucide internamente para no cruzar funciones server→client.
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
  className,
}: Props) {
  const BadgeIcon: LucideIcon = badgeIcons[badgeVariant];
  return (
    <div className={cn("relative mr-auto ml-auto w-full max-w-sm sm:max-w-md", className)}>
      {/* Capa de profundidad detrás (simétrica para no descuadrar la tarjeta) */}
      <div className="absolute -z-10 inset-x-3 top-5 bottom-0 rounded-3xl bg-white/5 ring-1 ring-white/10" />

      {/* Tarjeta principal */}
      <div
        onClick={onSelect}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-3xl bg-white/5 p-6 shadow-2xl backdrop-blur-xl ring-1 sm:p-8",
          "transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
          "[@media(hover:hover)]:hover:-translate-y-1.5 active:scale-[0.99]",
          "motion-reduce:!translate-y-0 motion-reduce:!transition-none",
          onSelect && "cursor-pointer",
          selected
            ? "ring-2 ring-accent shadow-[0_22px_60px_-18px] shadow-accent/40 -translate-y-1"
            : cn(
                highlighted ? "ring-accent/50" : "ring-white/10",
                "focus-within:ring-accent/60 [@media(hover:hover)]:hover:ring-accent/40"
              )
        )}
      >
        {/* Glow decorativo */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-accent-2 to-accent px-4 py-1.5 text-ink-dark shadow-lg ring-1 ring-white/20">
            <BadgeIcon className="h-4 w-4" aria-hidden />
            <span className="text-xs font-medium">{badge}</span>
          </div>
        </div>

        {/* Título */}
        <h3 className="mt-5 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h3>
        <p className="mt-1 text-center text-sm font-normal text-slate-300 sm:text-base">{subtitle}</p>

        {/* Monto */}
        <p className="mt-5 text-center text-5xl font-semibold tracking-tight text-white sm:text-6xl">{amount}</p>
        <p className="mt-2 text-center text-xs font-medium text-slate-300 sm:text-sm">{period}</p>

        {/* Features */}
        <div className="mt-6 space-y-3">
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

        {/* CTA (no debe disparar la selección de la tarjeta) */}
        <div className="mt-auto pt-6" onClick={(e) => e.stopPropagation()}>
          {cta}
        </div>

        {/* Nota */}
        {note ? (
          <p className="mt-5 text-center text-[11px] font-normal leading-5 text-slate-400">{note}</p>
        ) : null}
      </div>
    </div>
  );
}
