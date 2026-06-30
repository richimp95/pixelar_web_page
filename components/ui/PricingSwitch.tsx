"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Value = "mensual" | "anual";

export function PricingSwitch({
  value,
  onChange,
}: {
  value: Value;
  onChange: (v: Value) => void;
}) {
  const reduced = useReducedMotion() ?? false;
  const options: { id: Value; label: string }[] = [
    { id: "mensual", label: "Mensual" },
    { id: "anual", label: "Anual" },
  ];

  return (
    <div className="flex justify-center">
      <div className="relative flex w-fit rounded-full border border-white/10 bg-surface/60 p-1">
        {options.map((opt) => {
          const isActive = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={isActive}
              className={cn(
                "relative z-10 h-10 rounded-full px-5 text-sm font-medium transition-colors duration-200 sm:px-6",
                isActive ? "text-ink-dark" : "text-ink/70 hover:text-ink"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="planSwitch"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-accent-2 to-accent shadow-sm shadow-accent/40"
                  transition={
                    reduced ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }
                  }
                />
              )}
              <span className="relative">{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
