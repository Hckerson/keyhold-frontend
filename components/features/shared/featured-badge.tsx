import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURED_LABEL = "Featured";

export function FeaturedBadge({
    label = FEATURED_LABEL,
    className,
}: {
    label?: string;
    className?: string;
}) {
    return (
        <span
            className={cn(
                "bg-sidebar/75 text-text-inverse ring-highlight/30 pointer-events-none absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] uppercase shadow-md ring-1 backdrop-blur-md",
                className,
            )}
        >
            <Star size={11} strokeWidth={1.5} className="text-highlight" />
            {label}
        </span>
    );
}

FeaturedBadge.displayName = "FeaturedBadge";
