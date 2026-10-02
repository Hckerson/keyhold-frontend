"use client";

import type { ReactNode } from "react";
import { Popover as BasePopover } from "@base-ui/react/popover";
import {
    FLOATING_POSITIONER,
    FLOATING_SIDE_OFFSET,
    FLOATING_SURFACE,
} from "@/lib/config/floating";
import { cn } from "@/lib/utils";

interface PopoverContentProps {
    align?: "start" | "center" | "end";
    side?: "top" | "right" | "bottom" | "left";
    className?: string;
    children: ReactNode;
}

const Popover = BasePopover.Root;
const PopoverTrigger = BasePopover.Trigger;
const PopoverTitle = BasePopover.Title;
const PopoverClose = BasePopover.Close;

function PopoverContent({
    align = "center",
    side = "bottom",
    className,
    children,
}: PopoverContentProps) {
    return (
        <BasePopover.Portal>
            <BasePopover.Positioner
                align={align}
                side={side}
                sideOffset={FLOATING_SIDE_OFFSET}
                className={FLOATING_POSITIONER}
            >
                <BasePopover.Popup
                    className={cn(
                        FLOATING_SURFACE,
                        "max-w-(--available-width) p-3 text-xs",
                        className,
                    )}
                >
                    {children}
                </BasePopover.Popup>
            </BasePopover.Positioner>
        </BasePopover.Portal>
    );
}

PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent, PopoverTitle, PopoverClose };
