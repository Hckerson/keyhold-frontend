"use client";

import type { ReactElement, ReactNode } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { FLOATING_ENTRANCE } from "@/lib/config/floating";
import { cn } from "@/lib/utils";

const TOOLTIP_OFFSET = 6;

interface TooltipProps {
    content: ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    children: ReactElement;
    className?: string;
}

function Tooltip({ content, side = "top", children, className }: TooltipProps) {
    return (
        <BaseTooltip.Root>
            <BaseTooltip.Trigger render={children} />
            <BaseTooltip.Portal>
                <BaseTooltip.Positioner
                    side={side}
                    sideOffset={TOOLTIP_OFFSET}
                    className="z-tooltip"
                >
                    <BaseTooltip.Popup
                        className={cn(
                            "bg-text text-background-alt max-w-64 rounded-md px-2 py-1 text-xs font-medium shadow-lg",
                            FLOATING_ENTRANCE,
                            className,
                        )}
                    >
                        {content}
                    </BaseTooltip.Popup>
                </BaseTooltip.Positioner>
            </BaseTooltip.Portal>
        </BaseTooltip.Root>
    );
}

Tooltip.displayName = "Tooltip";

const TooltipProvider = BaseTooltip.Provider;

export { Tooltip, TooltipProvider };
