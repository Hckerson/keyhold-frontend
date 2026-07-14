import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'inline-flex items-center justify-center rounded-full bg-background-muted text-center font-medium text-text overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

interface AvatarProps
  extends React.ImgHTMLAttributes<HTMLImageElement>,
    VariantProps<typeof avatarVariants> {
  initials?: string;
  fallback?: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, size, alt, src, initials, fallback, ...props }, ref) => {
    return (
      <div className={cn(avatarVariants({ size, className }))}>
        {src ? (
          <img
            ref={ref}
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            {...props}
          />
        ) : (
          fallback || initials || '?'
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar, avatarVariants };
export type { AvatarProps };
