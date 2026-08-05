import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const SAVED_TITLE = "Saved Properties";
const SAVED_LEDE =
    "Price movement, search match and market state across the book you are watching";
const BROWSE_ACTION = "Continue Browsing";

export interface SavedHeaderProps {
    summary: string;
}

export function SavedHeader({ summary }: SavedHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {SAVED_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {SAVED_LEDE}
                </p>
            </div>
            <div className="flex items-center gap-3">
                <p className="micro-label">{summary}</p>
                <Link
                    href="/search"
                    className={buttonVariants({
                        variant: "primary",
                        size: "sm",
                    })}
                >
                    {BROWSE_ACTION}
                </Link>
            </div>
        </header>
    );
}

SavedHeader.displayName = "SavedHeader";
