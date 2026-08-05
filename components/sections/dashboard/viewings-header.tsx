import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const VIEWINGS_TITLE = "Viewings";
const VIEWINGS_LEDE =
    "Every tour on the book, from the next front door to the last walkthrough";
const BOOK_ACTION = "Book a Viewing";

export interface ViewingsHeaderProps {
    summary: string;
}

export function ViewingsHeader({ summary }: ViewingsHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {VIEWINGS_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {VIEWINGS_LEDE}
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
                    {BOOK_ACTION}
                </Link>
            </div>
        </header>
    );
}

ViewingsHeader.displayName = "ViewingsHeader";
