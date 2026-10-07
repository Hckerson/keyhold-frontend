import { chartToneText } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { ProfileRecordCell } from "@/lib/types";

const BAND_LABEL = "Track record";

export interface UserRecordBandProps {
    cells: ProfileRecordCell[];
}

export function UserRecordBand({ cells }: UserRecordBandProps) {
    return (
        <dl
            aria-label={BAND_LABEL}
            className="console-split console-split--flow console-split--flow-thirds border-border bg-border gap-px overflow-hidden rounded-xl border shadow-sm"
        >
            {cells.map((cell, index) => (
                <div
                    key={cell.id}
                    className={cn(
                        "flex min-w-0 flex-col gap-2 p-4",
                        index === 0 ? "bg-background-muted" : "bg-background",
                    )}
                >
                    <dt className="micro-label">{cell.label}</dt>
                    <dd
                        className={cn(
                            "font-display leading-none font-light tabular-nums",
                            index === 0 ? "text-h4" : "text-h6",
                            cell.tone ? chartToneText[cell.tone] : "text-text",
                        )}
                    >
                        {cell.value}
                    </dd>
                    <dd className="text-text-secondary truncate text-xs">
                        {cell.caption}
                    </dd>
                </div>
            ))}
        </dl>
    );
}

UserRecordBand.displayName = "UserRecordBand";
