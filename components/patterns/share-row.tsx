import type { LucideIcon } from "lucide-react";
import { IconChip } from "@/components/ui/icon-chip";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { ChartTone } from "@/lib/config/chart-tones";

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
    return (
        <li className="flex h-9 items-center gap-2">
            <IconChip icon={share.icon} tone={share.tone} />
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
