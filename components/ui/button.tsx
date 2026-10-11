import React from "react";
import type { VariantProps } from "class-variance-authority";
import type { LucideIcon } from "lucide-react";
import {
    buttonVariants,
    CONTENT_GAP,
    GLYPH_SIZE,
} from "@/components/ui/button-variants";
import { Slot } from "@/components/ui/slot";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>;

export type ButtonProps = ButtonBaseProps &
    (
        | { asChild: true; icon?: never; iconRight?: never; isLoading?: never }
        | {
              asChild?: false;
              icon?: LucideIcon;
              iconRight?: LucideIcon;
              isLoading?: boolean;
          }
    );

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            emphasis,
            tone,
            size,
            iconOnly,
            asChild,
            isLoading,
            disabled,
            icon: Icon,
            iconRight: IconRight,
            children,
            ...props
        },
        ref,
    ) => {
        const step = size ?? "sm";
        const classes = cn(
            buttonVariants({ emphasis, tone, size, iconOnly, className }),
        );

        if (asChild) {
            return (
                <Slot ref={ref} className={classes} {...props}>
                    {children}
                </Slot>
            );
        }

        return (
            <button
                ref={ref}
                className={classes}
                disabled={disabled || isLoading}
                aria-busy={isLoading}
                {...props}
            >
                <span
                    className={cn(
                        "inline-flex items-center",
                        CONTENT_GAP[step],
                        isLoading && "opacity-0",
                    )}
                >
                    {Icon && (
                        <Icon
                            className={GLYPH_SIZE[step]}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    )}
                    {children}
                    {IconRight && (
                        <IconRight
                            className={GLYPH_SIZE[step]}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                    )}
                </span>
                {isLoading && (
                    <span className="absolute inset-0 grid place-items-center">
                        <Spinner
                            size="sm"
                            tone="current"
                            aria-hidden="true"
                            className={GLYPH_SIZE[step]}
                        />
                    </span>
                )}
            </button>
        );
    },
);

Button.displayName = "Button";

export { Button, buttonVariants };
