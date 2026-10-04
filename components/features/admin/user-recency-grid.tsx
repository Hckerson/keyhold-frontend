import { chartToneFill } from "@/lib/config/chart-tones";
import { cn, formatCount } from "@/lib/utils";
import type { UserRecencyBand } from "@/lib/types";

const GRID_LABEL = "Live accounts by time since last sign-in";

export interface UserRecencyGridProps {
    bands: UserRecencyBand[];
}

export function UserRecencyGrid({ bands }: UserRecencyGridProps) {
    return (
        <dl
            aria-label={GRID_LABEL}
            className="bg-background-muted grid grid-cols-2 gap-px overflow-hidden rounded-lg"
        >
            {bands.map((band) => (
                <div
                    key={band.id}
                    className="bg-background flex min-w-0 flex-col gap-1.5 p-3"
                >
                    <dt className="text-text-secondary flex items-center gap-1.5 text-xs">
                        <span
                            aria-hidden="true"
                            className={cn(
                                "size-1.5 shrink-0 rounded-full",
                                chartToneFill[band.tone],
                            )}
                        />
                        <span className="truncate">{band.label}</span>
                    </dt>
                    <dd className="flex items-baseline justify-between gap-2">
                        <span className="font-display text-h5 text-text leading-none font-light tabular-nums">
                            {formatCount(band.count)}
                        </span>
                        <span className="text-text-muted text-xs tabular-nums">
                            {band.percent}%
                        </span>
                    </dd>
                </div>
            ))}
        </dl>
    );
}

UserRecencyGrid.displayName = "UserRecencyGrid";
