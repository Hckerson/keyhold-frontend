import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { chartToneText, type ChartTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface DeckFigureProps {
    value: string;
    caption: string;
    tone?: ChartTone;
    aside?: ReactNode;
    pending?: boolean;
}

export function DeckFigure({
    value,
    caption,
    tone,
    aside,
    pending,
}: DeckFigureProps) {
    return (
        <div className="flex flex-col gap-1">
            {pending ? (
                <Skeleton className="h-8 w-24" />
            ) : (
                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className={cn(
                            "font-display text-h4 leading-none font-light tabular-nums",
                            tone ? chartToneText[tone] : "text-text",
                        )}
                    >
                        {value}
                    </span>
                    {aside}
                </div>
            )}
            <p className="text-text-secondary text-xs">{caption}</p>
        </div>
    );
}

DeckFigure.displayName = "DeckFigure";
