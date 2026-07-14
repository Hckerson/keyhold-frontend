import React from "react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
    name: keyof typeof LucideIcons;
    size?: number | string;
    strokeWidth?: number;
    className?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ name, size = 24, strokeWidth = 2, className }, ref) => {
        const LucideIcon = LucideIcons[name] as React.ComponentType<{
            ref?: React.ForwardedRef<SVGSVGElement>;
            size?: number | string;
            strokeWidth?: number;
            className?: string;
        }>;

        if (!LucideIcon) {
            return null;
        }

        return (
            <LucideIcon
                ref={ref}
                size={size}
                strokeWidth={strokeWidth}
                className={cn("text-current", className)}
            />
        );
    },
);

Icon.displayName = "Icon";

export { Icon };
export type { IconProps };
