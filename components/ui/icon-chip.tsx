import { forwardRef, type HTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { chartToneSoft, type ChartTone } from "@/lib/config/chart-tones";
import { cn } from "@/lib/utils";

export interface IconChipProps extends HTMLAttributes<HTMLSpanElement> {
    icon: LucideIcon;
    tone: ChartTone;
}

const IconChip = forwardRef<HTMLSpanElement, IconChipProps>(
    ({ icon: Icon, tone, className, ...props }, ref) => (
        <span
            ref={ref}
            aria-hidden="true"
            className={cn(
                "grid size-6 shrink-0 place-items-center rounded-md",
                chartToneSoft[tone],
                className,
            )}
            {...props}
        >
            <Icon className="size-3" strokeWidth={1.5} />
        </span>
    ),
);

IconChip.displayName = "IconChip";

export { IconChip };
