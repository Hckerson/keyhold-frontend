"use client";

import type { CommandItem } from "@/lib/types";
import { COMMAND_PALETTE } from "@/lib/config/command-palette";
import { TOPBAR_BADGE_CEILING } from "@/lib/config/topbar";
import { cn } from "@/lib/utils";

export interface CommandPaletteRowProps {
    item: CommandItem;
    active: boolean;
    onActivate: () => void;
}

export function CommandPaletteRow({
    item,
    active,
    onActivate,
}: CommandPaletteRowProps) {
    const Icon = item.icon;

    return (
        <button
            type="button"
            id={item.id}
            role="option"
            tabIndex={-1}
            aria-selected={active}
            aria-current={item.here ? "page" : undefined}
            onClick={item.run}
            onMouseMove={onActivate}
            className={cn(
                "ease-smooth flex h-9 w-full items-center gap-2.5 rounded-md px-2 text-left transition-colors duration-200",
                active && "bg-background",
            )}
        >
            <Icon
                size={12}
                strokeWidth={1.5}
                className={cn(
                    "shrink-0",
                    item.here ? "text-accent" : "text-text-muted",
                )}
            />

            <span
                className={cn(
                    "min-w-0 flex-1 truncate text-xs",
                    item.here ? "text-accent font-semibold" : "text-text",
                )}
            >
                {item.label}
            </span>

            {item.here && (
                <span className="micro-label text-accent shrink-0">
                    {COMMAND_PALETTE.here}
                </span>
            )}

            {item.badge !== undefined && item.badge > 0 && (
                <span className="bg-highlight-light text-highlight-dark shrink-0 rounded-xs px-1 py-px font-mono text-[10px] leading-none font-semibold tabular-nums">
                    {item.badge > TOPBAR_BADGE_CEILING
                        ? `${TOPBAR_BADGE_CEILING}+`
                        : item.badge}
                </span>
            )}
        </button>
    );
}

CommandPaletteRow.displayName = "CommandPaletteRow";
