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
  type LucideIcon,
} from "lucide-react";

/** Elige un ícono Lucide según el nombre del beneficio. */
export function iconFor(name: string): LucideIcon {
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
