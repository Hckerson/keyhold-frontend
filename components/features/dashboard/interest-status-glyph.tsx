import { INTEREST_STATUSES } from "@/lib/config/interest-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { InterestStatus } from "@/lib/types";

export interface InterestStatusGlyphProps {
    status: InterestStatus;
    className?: string;
}

export function InterestStatusGlyph({
    status,
    className,
}: InterestStatusGlyphProps) {
    const { icon: Icon, chartTone } = INTEREST_STATUSES[status];

    return (
        <span
            className={cn(
                "grid size-6 shrink-0 place-items-center rounded-md",
                chartToneSoft[chartTone],
                className,
            )}
        >
            <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
        </span>
    );
}

InterestStatusGlyph.displayName = "InterestStatusGlyph";
