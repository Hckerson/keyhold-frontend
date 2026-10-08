import type { ReactNode } from "react";

export interface ChartBlockProps {
    label: string;
    value?: string;
    caption?: string;
    children: ReactNode;
}

export function ChartBlock({
    label,
    value,
    caption,
    children,
}: ChartBlockProps) {
    return (
        <figure className="flex min-w-0 flex-col gap-2">
            <figcaption className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-xs">
                <span className="text-text-secondary truncate">{label}</span>
                {value && (
                    <span className="text-text shrink-0 font-semibold tabular-nums">
                        {value}
                    </span>
                )}
                {caption && (
                    <span className="text-text-muted basis-full truncate">
                        {caption}
                    </span>
                )}
            </figcaption>
            {children}
        </figure>
    );
}

ChartBlock.displayName = "ChartBlock";
