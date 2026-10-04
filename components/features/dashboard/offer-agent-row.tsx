import { Avatar } from "@/components/ui/avatar";
import { chartToneText, type ChartTone } from "@/lib/config/chart-tones";
import { cn, initialsOf } from "@/lib/utils";

export interface OfferAgentShare {
    id: string;
    name: string;
    portrait: string | null;
    value: string;
    count: number;
    percent: number;
    tone: ChartTone;
}

export interface OfferAgentRowProps {
    share: OfferAgentShare;
}

export function OfferAgentRow({ share }: OfferAgentRowProps) {
    return (
        <li className="flex h-11 items-center gap-2">
            <Avatar
                size="xs"
                src={share.portrait ?? undefined}
                alt={share.name}
                initials={initialsOf(share.name)}
                loading="lazy"
            />
            <span className="text-text min-w-0 flex-1 truncate text-xs">
                {share.name}
            </span>
            <span className="text-text-muted shrink-0 text-xs tabular-nums">
                {share.percent}%
            </span>
            <span
                className={cn(
                    "w-14 shrink-0 text-right text-xs font-semibold tabular-nums",
                    chartToneText[share.tone],
                )}
            >
                {share.value}
            </span>
        </li>
    );
}

OfferAgentRow.displayName = "OfferAgentRow";
