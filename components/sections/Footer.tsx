import { content } from "@/lib/content";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const f = content.footer;
  return (
    <footer className="border-t border-white/10 bg-bg py-14 text-ink">
      <Container className="grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl font-bold text-ink-strong">{f.brand}</p>
          <p className="mt-3 max-w-[45ch] text-sm text-ink/70">{f.desc}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-strong">Enlaces</p>
          <ul className="mt-3 space-y-2 text-sm">
            {f.links.map((l) => (
              <li key={l.href}><a href={l.href} className="text-ink/70 hover:text-accent transition-colors">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink-strong">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li>WhatsApp: {f.contacto.whatsapp}</li>
            <li>Correo: {f.contacto.correo}</li>
            <li>Ubicación: {f.contacto.ubicacion}</li>
          </ul>
          <ul className="mt-4 flex gap-4 text-sm">
            {f.redes.map((r) => (
              <li key={r}><a href="#" className="text-ink/70 hover:text-accent transition-colors">{r}</a></li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="mt-10 border-t border-white/10 pt-6">
        <p className="text-xs text-muted">{f.legal}</p>
      </Container>
    </footer>
  );
}
