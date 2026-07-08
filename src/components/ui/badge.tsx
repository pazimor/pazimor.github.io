import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full font-mono transition-colors",
  {
    variants: {
      variant: {
        // tech tag pills, per the design
        tech: "bg-surface-tag text-[#d4d4d8] px-2.5 py-[3px] text-[11px]",
        period: "bg-surface-tag text-[#a1a1aa] px-2.5 py-[5px] text-[11px]",
      },
    },
    defaultVariants: {
      variant: "tech",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
