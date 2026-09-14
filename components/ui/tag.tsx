import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const tagVariants = cva(
    "ease-smooth inline-flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors duration-200",
    {
        variants: {
            variant: {
                default:
                    "bg-background-muted text-text-secondary border border-border-light",
                primary:
                    "bg-accent text-text-inverse border border-accent shadow-sm",
                secondary:
                    "bg-accent-light text-accent-dark border border-transparent",
                outline:
                    "border border-border text-text-secondary hover:border-accent hover:text-accent",
            },
            removable: {
                true: "pr-0.5",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            removable: false,
        },
    },
);

interface TagProps
    extends
        React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof tagVariants> {
    onRemove?: () => void;
    removeLabel?: string;
}

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
    (
        {
            className,
            variant,
            removable,
            onRemove,
            removeLabel = "Remove tag",
            children,
            ...props
        },
        ref,
    ) => (
        <div
            ref={ref}
            className={cn(tagVariants({ variant, removable, className }))}
            {...props}
        >
            <span className="truncate">{children}</span>
            {removable && onRemove && (
                <button
                    type="button"
                    onClick={onRemove}
                    className="focus-visible:ring-accent grid size-4 shrink-0 place-items-center rounded-full transition-colors hover:bg-current/15 focus-visible:ring-2 focus-visible:outline-none"
                    aria-label={removeLabel}
                >
                    <X className="size-3" strokeWidth={1.5} />
                </button>
            )}
        </div>
    ),
);

Tag.displayName = "Tag";

export { Tag, tagVariants };
export type { TagProps };
