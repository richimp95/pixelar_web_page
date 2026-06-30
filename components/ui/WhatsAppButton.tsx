import { Button } from "./Button";
import { waLink } from "@/lib/whatsapp";

type Props = {
  message?: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: React.ReactNode;
};

export function WhatsAppButton({ message, variant = "primary", className, children }: Props) {
  return (
    <Button href={waLink(message)} external variant={variant} className={className}>
      {children}
    </Button>
  );
}
