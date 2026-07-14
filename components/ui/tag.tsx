import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-background-muted text-text border border-border',
        primary: 'bg-accent text-white border border-accent',
        secondary: 'bg-background-alt text-text border border-border',
        outline: 'border border-border text-text hover:border-accent hover:text-accent',
      },
      removable: {
        true: 'pr-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      removable: false,
    },
  }
);

interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {
  onRemove?: () => void;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, variant, removable, onRemove, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(tagVariants({ variant, removable, className }))}
      {...props}
    >
      <span>{children}</span>
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded hover:bg-white/10 transition-colors"
          aria-label="Remove tag"
        >
          ×
        </button>
      )}
    </div>
  )
);

Tag.displayName = 'Tag';

export { Tag, tagVariants };
export type { TagProps };
