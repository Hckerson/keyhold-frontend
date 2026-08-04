import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { chartToneSoft } from "@/lib/config/chart-tones";
import type { AgentQuickAction } from "@/lib/data/agent-overview";

export interface OverviewActionRowProps {
    action: AgentQuickAction;
}

export function OverviewActionRow({ action }: OverviewActionRowProps) {
    const Icon = action.icon;

    return (
        <li>
            <Link
                href={action.href}
                className="group hover:bg-background-alt ease-smooth -mx-2 flex h-9 items-center gap-2 rounded-md px-2 transition-colors"
            >
                <span
                    className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-md",
                        chartToneSoft[action.tone],
                    )}
                >
                    <Icon
                        className="size-3"
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                </span>
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

OverviewActionRow.displayName = "OverviewActionRow";
