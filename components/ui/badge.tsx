import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors duration-300',
  {
    variants: {
      variant: {
        default: 'bg-background-muted text-text-primary',
        primary: 'bg-accent text-white',
        success: 'bg-success text-white',
        warning: 'bg-warning text-white',
        error: 'bg-error text-white',
        accent: 'bg-accent-light text-accent-dark',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
export type { BadgeProps };
