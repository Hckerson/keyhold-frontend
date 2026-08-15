import type { LucideIcon } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";
import { chartToneText, type ChartTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface ShareDatum {
    id: string;
    icon: LucideIcon;
    label: string;
    value: string;
    percent: number;
    tone: ChartTone;
}

export interface ShareRowProps {
    share: ShareDatum;
}

export function ShareRow({ share }: ShareRowProps) {
    const Icon = share.icon;

    return (
        <li className="flex h-9 items-center gap-2">
            <Icon
                aria-hidden="true"
                strokeWidth={1.5}
                className={cn("size-3 shrink-0", chartToneText[share.tone])}
            />
            <span className="text-text min-w-0 flex-1 truncate text-xs">
                {share.label}
            </span>
            <ProgressBar
                value={share.percent}
                tone={share.tone}
                className="w-10 shrink-0"
            />
            <span className="text-text-secondary w-10 shrink-0 text-right text-xs tabular-nums">
                {share.value}
            </span>
        </li>
    );
}

ShareRow.displayName = "ShareRow";
