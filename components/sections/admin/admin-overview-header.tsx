import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const OVERVIEW_TITLE = "Admin Console";
const OVERVIEW_LEDE =
    "What the marketplace moved, what it owes a decision, and what is holding it up";
const REPORTS_ACTION = "Platform Reports";

export interface AdminOverviewHeaderProps {
    summary: string;
}

export function AdminOverviewHeader({ summary }: AdminOverviewHeaderProps) {
    return (
        <header className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
                <h1 className="text-h4 font-display text-text font-light">
                    {OVERVIEW_TITLE}
                </h1>
                <p className="text-text-secondary mt-0.5 text-xs">
                    {OVERVIEW_LEDE}
                </p>
            </div>
            <div className="flex min-w-0 flex-1 items-center justify-between gap-3 sm:flex-none sm:justify-end">
                <p className="micro-label min-w-0 truncate">{summary}</p>
                <Link
                    href="/admin/reports"
                    className={cn(
                        buttonVariants({ variant: "primary", size: "sm" }),
                        "shrink-0",
                    )}
                >
                    {REPORTS_ACTION}
                </Link>
            </div>
        </header>
    );
}

AdminOverviewHeader.displayName = "AdminOverviewHeader";
