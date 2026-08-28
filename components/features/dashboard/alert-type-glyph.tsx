import { ALERT_TYPES } from "@/lib/config/alert-tones";
import { chartToneSoft } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";
import type { AlertType } from "@/lib/types";

export interface AlertTypeGlyphProps {
    type: AlertType;
    muted?: boolean;
    className?: string;
}

export function AlertTypeGlyph({
    type,
    muted,
    className,
}: AlertTypeGlyphProps) {
    const { icon: Icon, chartTone } = ALERT_TYPES[type];

    return (
        <span
            className={cn(
                "ease-smooth grid size-6 shrink-0 place-items-center rounded-md transition-colors duration-200",
                chartToneSoft[muted ? "neutral" : chartTone],
                className,
            )}
        >
            <Icon className="size-3" strokeWidth={1.5} aria-hidden="true" />
        </span>
    );
}

AlertTypeGlyph.displayName = "AlertTypeGlyph";
