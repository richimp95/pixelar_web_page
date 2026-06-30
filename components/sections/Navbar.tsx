"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { content } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled ? "bg-bg/80 backdrop-blur border-b border-white/10" : "bg-transparent"
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link href="#inicio" className="flex items-center" aria-label={content.nav.brand}>
          <Logo markClassName="h-7 w-auto sm:h-8" textClassName="text-xl text-ink-strong sm:text-2xl" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {content.nav.links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <WhatsAppButton className="px-4 py-2 text-sm">{content.nav.cta}</WhatsAppButton>
      </Container>
    </header>
  );
}
