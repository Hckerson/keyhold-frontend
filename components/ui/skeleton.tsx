import React from 'react';
import { cn } from '@/lib/utils';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded bg-background-muted animate-pulse',
        className
      )}
      {...props}
    />
  )
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
