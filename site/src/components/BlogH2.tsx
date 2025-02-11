import { cn } from "@/lib/utils";

export default function BlogH2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2 className={cn("text-4xl font-bold pt-4", className)}>{children}</h2>
  );
}
