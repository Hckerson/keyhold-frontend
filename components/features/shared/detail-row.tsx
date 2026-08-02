import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface DetailRowProps {
    primary: string;
    secondary: string;
    value: ReactNode;
    secondaryClassName?: string;
}

export function DetailRow({
    primary,
    secondary,
    value,
    secondaryClassName,
}: DetailRowProps) {
    return (
        <div className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
            <div className="min-w-0">
                <p className="text-text truncate text-xs font-medium">
                    {primary}
                </p>
                <p
                    className={cn(
                        "text-text-muted mt-0.5 text-xs",
                        secondaryClassName,
                    )}
                >
                    {secondary}
                </p>
            </div>
            {value}
        </div>
    );
}

DetailRow.displayName = "DetailRow";
