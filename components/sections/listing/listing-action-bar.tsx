import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ListingActionBarProps {
    price: number;
    address: string;
    saved: boolean;
    onToggleSave: () => void;
}

export function ListingActionBar({
    price,
    address,
    saved,
    onToggleSave,
}: ListingActionBarProps) {
    return (
        <div className="border-border-dark bg-background/90 fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t px-4 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
            <div className="min-w-0 flex-1">
                <p className="text-text text-xs font-semibold tabular-nums">
                    ${price.toLocaleString()}
                </p>
                <p className="text-text-muted truncate text-xs">{address}</p>
            </div>

            <button
                type="button"
                onClick={onToggleSave}
                aria-pressed={saved}
                aria-label={saved ? "Remove from saved" : "Save listing"}
                className="border-border text-text-secondary hover:border-highlight hover:text-highlight focus-visible:ring-accent ease-smooth grid size-8 shrink-0 place-items-center rounded-full border transition-colors duration-200 focus-visible:ring-2 focus-visible:outline-none"
            >
                <Heart
                    className={cn(
                        "size-3",
                        saved && "fill-highlight text-highlight",
                    )}
                    strokeWidth={1.5}
                />
            </button>

            <Link href="/dashboard/viewings" className="shrink-0">
                <Button variant="primary" size="sm">
                    Schedule
                </Button>
            </Link>
        </div>
    );
}

ListingActionBar.displayName = "ListingActionBar";
