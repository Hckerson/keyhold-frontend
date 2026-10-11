import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { sectionEyebrowClass } from "@/components/patterns/section-eyebrow";

export interface FactCellProps {
    label: string;
    value: string;
    icon?: LucideIcon;
    className?: string;
}

export function FactCell({
    label,
    value,
    icon: Icon,
    className,
}: FactCellProps) {
    return (
        <div
            className={cn(
                "bg-background-muted border-border-light flex flex-col gap-1.5 rounded-md border p-2.5 sm:p-3",
                className,
            )}
        >
            <dt
                className={cn(
                    sectionEyebrowClass,
                    "text-text-muted flex min-w-0 items-center gap-1.5 leading-[1.4]",
                )}
            >
                {Icon && <Icon className="size-3 shrink-0" strokeWidth={1.5} />}
                {label}
            </dt>
            <dd className="text-text mt-auto text-xs leading-tight font-semibold tabular-nums">
                {value}
            </dd>
        </div>
    );
}

FactCell.displayName = "FactCell";
