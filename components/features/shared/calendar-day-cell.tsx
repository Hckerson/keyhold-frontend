"use client";

import { cn } from "@/lib/utils";

const MAX_LOAD_DOTS = 3;

export interface CalendarDayCellProps {
    day: number;
    monthName: string;
    selected: boolean;
    today: boolean;
    load: number;
    onSelect: (day: number) => void;
}

export function CalendarDayCell({
    day,
    monthName,
    selected,
    today,
    load,
    onSelect,
}: CalendarDayCellProps) {
    const dots = Math.min(load, MAX_LOAD_DOTS);

    return (
        <button
            type="button"
            onClick={() => onSelect(day)}
            aria-pressed={selected}
            aria-label={`${monthName} ${day}${
                load ? `, ${load} appointment${load === 1 ? "" : "s"}` : ""
            }`}
            className={cn(
                "ease-smooth focus-visible:ring-accent relative grid aspect-square place-items-center rounded-md text-xs tabular-nums transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none",
                selected
                    ? "bg-accent text-text-inverse font-medium"
                    : "text-text-secondary hover:bg-background-alt",
                !selected &&
                    today &&
                    "border-border-dark text-text border font-medium",
            )}
        >
            {day}
            {dots > 0 && !selected && (
                <span className="absolute bottom-1 flex gap-0.5">
                    {Array.from({ length: dots }).map((_, index) => (
                        <span
                            key={index}
                            className="bg-accent size-1 rounded-full"
                        />
                    ))}
                </span>
            )}
        </button>
    );
}

CalendarDayCell.displayName = "CalendarDayCell";
