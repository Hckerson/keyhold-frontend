import type { LucideIcon } from "lucide-react";
import { IconChip } from "@/components/ui/icon-chip";
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
    return (
        <li className="flex h-9 items-center gap-2">
            <IconChip icon={share.icon} tone={share.tone} />
            <span className="text-text min-w-0 flex-1 truncate text-xs">
                {share.label}
            </span>
            <span
                className={cn(
                    "w-10 shrink-0 text-right text-xs font-medium tabular-nums",
                    chartToneText[share.tone],
                )}
            >
                {share.value}
            </span>
        </li>
    );
}

ShareRow.displayName = "ShareRow";
