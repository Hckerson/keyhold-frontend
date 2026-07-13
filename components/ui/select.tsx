import React from 'react';
import { cn } from '@/lib/utils';

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, options = [], ...props }, ref) => (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={id}
        className={cn(
          'flex w-full rounded-lg border border-border bg-background-alt px-4 py-3 text-base text-text-primary transition-all duration-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-error focus:border-error focus:ring-error',
          className
        )}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  )
);

Select.displayName = 'Select';

export { Select };
export type { SelectProps };
