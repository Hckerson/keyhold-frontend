"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const stepClass =
    "text-text-secondary hover:text-text hover:bg-background-alt focus-visible:ring-accent ease-smooth grid size-6 place-items-center rounded-md transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none";

export interface CalendarMonthNavProps {
    label?: string;
    onShift: (delta: number) => void;
    className?: string;
}

export function CalendarMonthNav({
    label,
    onShift,
    className,
}: CalendarMonthNavProps) {
    return (
        <div className={cn("flex items-center gap-1 select-none", className)}>
            <button
                type="button"
                onClick={() => onShift(-1)}
                aria-label="Previous month"
                className={stepClass}
            >
                <ChevronLeft className="size-3" strokeWidth={1.5} />
            </button>
            {label && (
                <span className="text-text text-xs font-medium">{label}</span>
            )}
            <button
                type="button"
                onClick={() => onShift(1)}
                aria-label="Next month"
                className={stepClass}
            >
                <ChevronRight className="size-3" strokeWidth={1.5} />
            </button>
        </div>
    );
}

CalendarMonthNav.displayName = "CalendarMonthNav";
