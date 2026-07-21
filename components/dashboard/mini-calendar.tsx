import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export interface MiniCalendarProps {
    days: number;
    selected: number;
    onSelect: (day: number) => void;
    marked?: number[];
    className?: string;
}

export function MiniCalendar({
    days,
    selected,
    onSelect,
    marked = [],
    className,
}: MiniCalendarProps) {
    return (
        <div className={className}>
            <div className="text-text-muted text-caption mb-2 grid grid-cols-7 gap-1 text-center font-medium tracking-wide uppercase">
                {WEEKDAYS.map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: days }).map((_, index) => {
                    const day = index + 1;
                    const isSelected = day === selected;
                    const isMarked = marked.includes(day);
                    return (
                        <button
                            key={day}
                            type="button"
                            onClick={() => onSelect(day)}
                            className={cn(
                                "ease-smooth relative grid aspect-square place-items-center rounded-md text-xs tabular-nums transition-colors",
                                isSelected
                                    ? "bg-accent text-text-inverse font-medium"
                                    : "text-text-secondary hover:bg-background-alt",
                            )}
                        >
                            {day}
                            {isMarked && !isSelected && (
                                <span className="bg-accent absolute bottom-1 size-1 rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

MiniCalendar.displayName = "MiniCalendar";
