import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type PlanFeature = {
  icon: LucideIcon;
  name: string;
  detail: string;
};

type Props = {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  subtitle: string;
  amount: string;
  period: string;
  features: PlanFeature[];
  note?: string;
  cta: React.ReactNode;
  highlighted?: boolean;
  className?: string;
};

/**
 * Tarjeta de plan glassmorphism. Estructura/sombras/blur/ring tomadas del
 * template provisto por el cliente; sólo se recolorearon los acentos a la
 * paleta de marca (cobre).
 */
export function PlanCard({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  amount,
  period,
  features,
  note,
  cta,
  highlighted = false,
  className,
}: Props) {
  return (
    <div className={cn("relative mr-auto ml-auto w-full max-w-sm sm:max-w-md", className)}>
      {/* Shadowed card behind */}
      <div className="absolute -z-10 left-6 right-0 top-6 bottom-0 rounded-3xl bg-white/5 ring-1 ring-white/10" />

      {/* Primary card */}
      <div
        className={cn(
          "relative overflow-hidden sm:p-8 bg-white/5 rounded-3xl pt-6 pr-6 pb-6 pl-6 shadow-2xl backdrop-blur-xl ring-1",
          highlighted ? "ring-accent/50" : "ring-white/10"
        )}
      >
        {/* Decorative inner glow */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-accent-2/10 blur-3xl" />

        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-accent-2 to-accent px-4 py-1.5 text-ink-dark shadow-lg ring-1 ring-white/20">
            <BadgeIcon className="h-4 w-4" aria-hidden />
            <span className="text-xs font-medium">{badge}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-5 text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h3>
        <p className="mt-1 text-center text-sm font-normal text-slate-300 sm:text-base">{subtitle}</p>

        {/* Amount */}
        <p className="mt-5 text-center text-5xl font-semibold tracking-tight text-white sm:text-6xl">{amount}</p>
        <p className="mt-2 text-center text-xs font-medium text-slate-300 sm:text-sm">{period}</p>

        {/* Features list */}
        <div className="mt-6 space-y-3">
          {features.map((f) => (
            <div
              key={f.name}
              className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10 transition-colors hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900/60 ring-1 ring-white/10">
                  <f.icon className="h-4 w-4 text-accent" aria-hidden />
                </div>
                <span className="text-sm font-medium text-slate-200">{f.name}</span>
              </div>
              <span className="ml-3 shrink-0 text-sm font-semibold text-slate-100">{f.detail}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6">{cta}</div>

        {/* Note */}
        {note ? (
          <p className="mt-5 text-center text-[11px] font-normal leading-5 text-slate-400">{note}</p>
        ) : null}
      </div>
    </div>
  );
}
