import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PropertyAction } from "@/lib/types";

const ENQUIRY_ANCHOR = "#agent";

export interface ListingActionBarProps {
    price: number;
    address: string;
    saved: boolean;
    savePending: boolean;
    action: PropertyAction;
    onToggleSave: () => void;
}

export function ListingActionBar({
    price,
    address,
    saved,
    savePending,
    action,
    onToggleSave,
}: ListingActionBarProps) {
    const href = action.kind === "track" ? action.href : ENQUIRY_ANCHOR;

    return (
        <div className="desk-hidden border-border-dark bg-background/90 fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-md">
            <div className="min-w-0 flex-1">
                <p className="text-text text-xs font-semibold tabular-nums">
                    ${price.toLocaleString()}
                </p>
                <p className="text-text-muted truncate text-xs">{address}</p>
            </div>

            <button
                type="button"
                onClick={onToggleSave}
                disabled={savePending}
                aria-pressed={saved}
                aria-label={saved ? "Remove from saved" : "Save listing"}
                className="border-border text-text-secondary hover:border-highlight hover:text-highlight focus-visible:ring-accent ease-smooth grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-45"
            >
                <Heart
                    className={cn(
                        "size-3",
                        saved && "fill-highlight text-highlight",
                    )}
                    strokeWidth={1.5}
                />
            </button>

            {href && (
                <Link href={href} className="shrink-0">
                    <Button variant="primary" size="sm">
                        {action.label}
                    </Button>
                </Link>
            )}
        </div>
    );
}

ListingActionBar.displayName = "ListingActionBar";
