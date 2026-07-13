import React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, id, label, ...props }, ref) => (
    <div className="flex items-center gap-2">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        className={cn(
          'h-5 w-5 rounded border border-border bg-background-alt accent-accent transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="text-sm text-text-primary cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
