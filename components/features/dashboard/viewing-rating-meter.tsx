import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_RATING = 5;
const NO_RATING = "—";

export interface ViewingRatingMeterProps {
    rating?: number;
    className?: string;
}

export function ViewingRatingMeter({
    rating,
    className,
}: ViewingRatingMeterProps) {
    if (rating === undefined) {
        return <span className="text-text-muted text-xs">{NO_RATING}</span>;
    }

    return (
        <span
            className={cn("flex items-center gap-0.5", className)}
            aria-label={`${rating} out of ${MAX_RATING}`}
        >
            {Array.from({ length: MAX_RATING }).map((_, index) => (
                <Star
                    key={index}
                    className={cn(
                        "size-3",
                        index < rating
                            ? "fill-accent text-accent"
                            : "text-border-dark",
                    )}
                    strokeWidth={1.5}
                    aria-hidden="true"
                />
            ))}
        </span>
    );
}

ViewingRatingMeter.displayName = "ViewingRatingMeter";
