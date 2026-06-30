"use client";
import { useEffect, useRef, useState } from "react";

type State = "init" | "hidden" | "shown";

/**
 * Reveal de entrada que NO bloquea la visibilidad del contenido.
 * - SSR / sin JS / reduced-motion: el contenido se renderiza visible (estado "init").
 * - Con JS: solo se oculta lo que está fuera de pantalla al montar (sin flash),
 *   y se revela al entrar en viewport. Failsafe muestra todo si el observer no dispara.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("init");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Estos setState son síncronos a propósito: medimos el layout al montar
    // para fijar la visibilidad inicial sin flash. No pueden ir a un
    // useState initializer (el ref aún no existe) ni diferirse a rAF (reintroduce
    // el flash). Por eso desactivamos la regla heurística set-state-in-effect.
    /* eslint-disable react-hooks/set-state-in-effect */
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }

    // Si ya está en pantalla al montar, mantener visible (evita flash).
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      setState("shown");
      return;
    }

    // Fuera de pantalla: ocultar (no se ve el cambio) y animar al entrar.
    setState("hidden");
    /* eslint-enable react-hooks/set-state-in-effect */
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);

    // Failsafe: si nunca dispara (headless, tab oculta), mostrar igualmente.
    const t = window.setTimeout(() => setState("shown"), 1500);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const hidden = state === "hidden";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? "translateY(16px)" : "none",
        transition:
          "opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
