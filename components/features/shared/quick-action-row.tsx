import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { IconChip } from "@/components/ui/icon-chip";
import type { QuickAction } from "@/lib/types";

export interface QuickActionRowProps {
    action: QuickAction;
}

export function QuickActionRow({ action }: QuickActionRowProps) {
    return (
        <li>
            <Link
                href={action.href}
                className="group hover:bg-background-alt ease-smooth -mx-2 flex h-9 items-center gap-2 rounded-md px-2 transition-colors"
            >
                <IconChip icon={action.icon} tone={action.tone} />
                <span className="text-text min-w-0 flex-1 truncate text-xs font-medium">
                    {action.label}
                </span>
                <ChevronRight
                    className="text-text-muted group-hover:text-accent ease-smooth size-3 shrink-0 transition-all duration-200 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            </Link>
        </li>
    );
}

QuickActionRow.displayName = "QuickActionRow";
