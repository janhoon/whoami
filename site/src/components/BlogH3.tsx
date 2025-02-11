import { cn } from "@/lib/utils";

export default function BlogH3({
  children,
  className,
  ref,
}: {
  children: React.ReactNode;
  className?: string;
  ref?: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <h3 className={cn("text-3xl font-bold pt-4", className)} ref={ref}>
      {children}
    </h3>
  );
}
