import { cn } from "@/lib/cn";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/[0.03] p-6 shadow-lg shadow-black/20 ring-1 ring-white/5",
        "transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
