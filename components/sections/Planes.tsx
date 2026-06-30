import {
  RefreshCw,
  DatabaseBackup,
  ShieldCheck,
  Headset,
  Gauge,
  FileText,
  TrendingUp,
  CalendarCheck,
  CalendarRange,
  Wallet,
  PackageCheck,
  ArrowRightCircle,
  Check,
  Gift,
  Sparkles,
  Crown,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { content } from "@/lib/content";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PlanCard, type PlanFeature } from "@/components/ui/PlanCard";
import { Reveal } from "@/components/motion/Reveal";

function iconFor(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes("actualiz")) return RefreshCw;
  if (n.includes("backup")) return DatabaseBackup;
  if (n.includes("firewall") || n.includes("caída") || n.includes("segur")) return ShieldCheck;
  if (n.includes("soporte")) return Headset;
  if (n.includes("velocidad") || n.includes("optimiz")) return Gauge;
  if (n.includes("reporte")) return FileText;
  if (n.includes("seo") || n.includes("analít")) return TrendingUp;
  if (n.includes("revisi")) return CalendarCheck;
  if (n.includes("sprint")) return CalendarRange;
  if (n.includes("pago")) return Wallet;
  if (n.includes("entrega")) return PackageCheck;
  if (n.includes("mantenim") || n.includes("pase")) return ArrowRightCircle;
  return Check;
}

function withIcons(features: ReadonlyArray<{ name: string; detail: string }>): PlanFeature[] {
  return features.map((f) => ({ icon: iconFor(f.name), name: f.name, detail: f.detail }));
}

const badgeIcons: LucideIcon[] = [ShieldCheck, Sparkles, Crown];

export function Planes() {
  const p = content.planes;
  const s = p.startSprint;
  return (
    <Section id="planes">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-ink-strong text-balance sm:text-4xl">{p.title}</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="mt-4 max-w-[65ch] text-lg text-ink/80">{p.subtitle}</p>
      </Reveal>

      {/* Promo anual */}
      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-accent/15 to-accent-2/10 p-5 ring-1 ring-accent/25 sm:flex-row sm:p-6">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30">
            <Gift className="h-6 w-6" aria-hidden />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-ink-strong">{p.promo.title}</p>
            <p className="mt-1 text-sm text-ink/80">{p.promo.text}</p>
          </div>
        </div>
      </Reveal>

      {/* Planes de mantenimiento */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:items-start">
        {p.items.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.06}>
            <PlanCard
              badge={plan.badge}
              badgeIcon={badgeIcons[i % badgeIcons.length]}
              title={plan.name}
              subtitle={plan.audience}
              amount={plan.price}
              period={plan.period}
              features={withIcons(plan.features)}
              note={plan.note}
              highlighted={plan.highlighted}
              className={plan.highlighted ? "lg:scale-[1.03]" : undefined}
              cta={
                <WhatsAppButton
                  variant={plan.highlighted ? "primary" : "secondary"}
                  message={`Hola WNRGY, me interesa el Plan ${plan.name} (${plan.price}/mes). Me gustaría más información.`}
                  className="w-full"
                >
                  {plan.cta}
                </WhatsAppButton>
              }
            />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mx-auto mt-8 max-w-[70ch] text-center text-sm text-muted">{p.extraNote}</p>
      </Reveal>

      {/* Start Your Page */}
      <Reveal>
        <div className="mt-20 text-center">
          <h3 className="font-display text-2xl font-bold text-ink-strong sm:text-3xl">¿Aún no tienes página web?</h3>
          <p className="mx-auto mt-3 max-w-[60ch] text-ink/80">
            La construimos por fases con sprints ágiles y pagos cómodos por etapa terminada.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <div className="mt-10">
          <PlanCard
            badge={s.badge}
            badgeIcon={Rocket}
            title={s.name}
            subtitle={s.audience}
            amount={s.price}
            period={s.period}
            features={withIcons(s.features)}
            note={s.note}
            className="max-w-xl"
            cta={
              <WhatsAppButton
                message={`Hola WNRGY, quiero desarrollar mi página desde cero con el plan ${s.name}. ¿Cómo empezamos?`}
                className="w-full"
              >
                {s.cta}
              </WhatsAppButton>
            }
          />
        </div>
      </Reveal>
    </Section>
  );
}
