import { chartToneText } from "@/lib/config/chart-tones";
import { cn, formatCount } from "@/lib/utils";
import type { UserRecencyBand } from "@/lib/types";

const LIST_LABEL = "Live accounts by how recently they last signed in";

export interface UserRecencyListProps {
    bands: UserRecencyBand[];
}

export function UserRecencyList({ bands }: UserRecencyListProps) {
    return (
        <ul aria-label={LIST_LABEL} className="divide-border-light divide-y">
            {bands.map((band) => (
                <li
                    key={band.id}
                    className="flex h-9 items-center gap-2 text-xs tabular-nums"
                >
                    <span className="text-text-secondary min-w-0 flex-1 truncate">
                        {band.label}
                    </span>
                    <span
                        className={cn(
                            band.count === 0
                                ? "text-text-muted"
                                : chartToneText[band.tone],
                        )}
                    >
                        {formatCount(band.count)}
                    </span>
                    <span className="text-text-muted w-9 text-right">
                        {band.percent}%
                    </span>
                </li>
            ))}
        </ul>
    );
}

UserRecencyList.displayName = "UserRecencyList";
