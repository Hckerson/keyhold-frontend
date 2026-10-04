import type { ReactNode } from "react";
import {
    chartToneGlyph,
    chartToneText,
    type ChartTone,
} from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface ToneReadingProps {
    value: ReactNode;
    tone: ChartTone;
    label: string;
    className?: string;
}

export function ToneReading({
    value,
    tone,
    label,
    className,
}: ToneReadingProps) {
    const Glyph = chartToneGlyph[tone];

    return (
        <span
            className={cn(
                "inline-flex shrink-0 items-center justify-end gap-1 text-xs font-medium tabular-nums",
                chartToneText[tone],
                className,
            )}
        >
            {Glyph && (
                <Glyph
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-3 shrink-0"
                />
            )}
            <span aria-hidden="true">{value}</span>
            <span className="sr-only">{label}</span>
        </span>
    );
}

ToneReading.displayName = "ToneReading";
