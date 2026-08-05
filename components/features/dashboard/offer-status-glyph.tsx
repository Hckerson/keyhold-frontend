import { OFFER_STATUSES } from "@/lib/config/offer-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { OfferStatus } from "@/lib/types";

export interface OfferStatusGlyphProps {
    status: OfferStatus;
    className?: string;
}

export function OfferStatusGlyph({ status, className }: OfferStatusGlyphProps) {
    const { icon: Icon, chartTone } = OFFER_STATUSES[status];

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

OfferStatusGlyph.displayName = "OfferStatusGlyph";
