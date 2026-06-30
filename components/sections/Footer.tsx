import { ArrowUpRight } from "lucide-react";
import { content } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { waLink } from "@/lib/whatsapp";

// Marcas: lucide-react ya no exporta íconos de marca, se usan paths inline.
const socials = [
  {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 3.675a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm6.406-.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
  {
    label: "Facebook",
    path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
  {
    label: "LinkedIn",
    path: "M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.23 8.27h4.54V23H.23V8.27zM8.3 8.27h4.35v2.01h.06c.61-1.16 2.12-2.38 4.37-2.38 4.67 0 5.53 3.07 5.53 7.06V23h-4.54v-7.07c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.74V23H8.3V8.27z",
  },
];

export function Footer() {
  const f = content.footer;
  const c = f.contacto;
  const tel = c.telefono.replace(/[^+\d]/g, "");

  return (
    <footer className="mx-auto max-w-6xl px-4 pt-20 pb-12">
      <div className="rounded-3xl bg-gradient-to-br from-accent/[0.06] via-accent/[0.10] to-accent/[0.06] p-6 ring-1 ring-accent/15 sm:p-10">
        {/* CTA banner */}
        <div className="flex flex-col items-center justify-between gap-6 px-2 py-2 md:flex-row md:px-4">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink-strong lg:text-4xl">
            Hablemos de tu proyecto
            <ArrowUpRight className="ml-3 inline-block h-9 w-9 text-accent" aria-hidden />
          </h2>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center rounded-full bg-gradient-to-bl from-accent-2 via-accent to-accent-2 px-6 text-sm font-semibold text-ink-dark shadow-lg shadow-accent/20 transition-[filter,box-shadow] duration-200 hover:brightness-110 hover:shadow-[0_0_40px_rgba(198,134,98,0.5)]"
          >
            Cotizar por WhatsApp
          </a>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        {/* Columnas */}
        <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <Logo markClassName="h-7 w-auto" textClassName="text-xl text-accent" />
            <p className="mt-4 max-w-xs text-xs leading-5 text-ink/70">{f.desc}</p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-accent">Navegación</h3>
            <ul className="space-y-2">
              {content.nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink/70 transition-colors hover:text-ink-strong">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-accent">Contacto</h3>
            <ul className="space-y-2 text-ink/70">
              <li>
                <a href={`tel:${tel}`} className="transition-colors hover:text-ink-strong">
                  Tel: {c.telefono}
                </a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink-strong">
                  WhatsApp: {c.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${c.correo}`} className="transition-colors hover:text-ink-strong">
                  {c.correo}
                </a>
              </li>
              <li>{c.ubicacion}</li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-accent">Redes</h3>
            <div className="flex items-center gap-3">
              {socials.map(({ label, path }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-colors hover:bg-accent/20"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <p className="text-ink/70">{f.legal}</p>
          <div className="flex items-center gap-4 text-ink/70">
            <a href="#" className="transition-colors hover:text-ink-strong">Política de privacidad</a>
            <span className="text-ink/25">/</span>
            <a href="#" className="transition-colors hover:text-ink-strong">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
