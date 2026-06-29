import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold " +
  "transition-[transform,background-color,box-shadow] duration-200 ease-out " +
  "active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink-dark hover:bg-accent/90 shadow-lg shadow-accent/20",
  secondary: "border border-white/20 text-ink-strong hover:bg-white/5",
};

export function Button({ href, variant = "primary", external, className, children }: Props) {
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls}>{children}</Link>;
}
